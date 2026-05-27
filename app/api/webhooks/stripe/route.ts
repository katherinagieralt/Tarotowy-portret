import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { renderToBuffer } from "@react-pdf/renderer";
import { TarotReportTemplate } from "@/components/TarotReportTemplate";
import React from "react";
import { utapi } from "@/server/uploadthing";
import { resend } from "@/lib/email";
import { PurchaseReceiptEmail } from "@/components/PurchaseReceiptEmail";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature") || "";

    // Weryfikuj podpis webhooka
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("[webhook] Signature verification failed:", err);
      return NextResponse.json({ received: false }, { status: 400 });
    }

    // Obsłuż event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;

      if (!orderId) {
        console.error("[webhook] No orderId in metadata");
        return NextResponse.json({ received: true }, { status: 200 });
      }

      // Pobierz Order z bazy
      const order = await prisma.order.findUnique({
        where: { id: orderId },
      });

      if (!order) {
        console.error(`[webhook] Order not found: ${orderId}`);
        return NextResponse.json({ received: true }, { status: 200 });
      }

      const customerEmail = session.customer_details?.email || "";
      let customerName = session.customer_details?.name || "";

      if (order.reportType === "PARTNERSHIP" && session.metadata?.name1 && session.metadata?.name2) {
        customerName = `${session.metadata.name1} & ${session.metadata.name2}`;
      } else if (session.metadata?.name1) {
        customerName = session.metadata.name1;
      }

      // Aktualizuj status na PAID i zapisz email
      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: { 
          status: "PAID",
          email: customerEmail
        },
      });

      try {
        // Obliczamy portret, żeby móc przekazać karty do AI
        const { calculateIndividualPortrait, calculatePartnershipPortrait } = await import("@/lib/tarotCalculations");
        const portrait: any = order.reportType === "INDIVIDUAL" 
          ? calculateIndividualPortrait(order.date1)
          : calculatePartnershipPortrait(order.date1, order.date2!);
          
        const cardsArray = Object.values(portrait.detailedCards);
        
        // Import i generowanie AI
        const { generatePersonalizedSummary } = await import("@/lib/generateSummary");
        const aiSummary = await generatePersonalizedSummary(cardsArray, order.reportType as "INDIVIDUAL" | "PARTNERSHIP");

        // Pierwszy przebieg (zbieranie numerów stron)
        const pageNumbers: Record<string, number> = {};
        const templateProps = {
          email: customerEmail,
          name: customerName,
          reportType: order.reportType as "INDIVIDUAL" | "PARTNERSHIP",
          date1: order.date1,
          date2: order.date2 || undefined,
          aiSummary: aiSummary,
          pageNumbers,
        };

        await renderToBuffer(React.createElement(TarotReportTemplate, templateProps) as any);

        // Drugi przebieg (renderowanie z prawidłowymi numerami stron)
        const pdfBuffer = await renderToBuffer(
          React.createElement(TarotReportTemplate, templateProps) as any
        );

        // Wrzuć na UploadThing
        const fileName = `tarot-portret-${order.id}-${Date.now()}.pdf`;
        const uploadResponse = await utapi.uploadFiles(
          new File([new Uint8Array(pdfBuffer)], fileName, { type: "application/pdf" })
        );

        if (!uploadResponse.data) {
          console.error("UploadThing Error:", uploadResponse.error);
          throw new Error(`Upload failed: ${uploadResponse.error?.message}`);
        }

        const pdfUrl = uploadResponse.data.url;

        // Aktualizuj Order z pdfUrl i zmień status na DELIVERED
        await prisma.order.update({
          where: { id: orderId },
          data: {
            pdfUrl,
            pdfPath: fileName,
            status: "DELIVERED",
          },
        });

        // Wyślij email z linkiem do pobrania
        const downloadLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/download?orderId=${order.id}`;
        const emailContent = PurchaseReceiptEmail({
          email: customerEmail,
          downloadLink: downloadLink,
          reportType: order.reportType,
        });

        await resend.emails.send({
          // Tymczasowy adres do testów lokalnych (wymaga podania Twojego własnego maila w Stripe!)
          from: "Archeya <onboarding@resend.dev>",
          to: customerEmail,
          subject: "Twój Tarotowy Portret – Raport gotowy!",
          html: emailContent.html,
          text: emailContent.text,
        });

        console.log(`[webhook] Order ${orderId} processed successfully`);
      } catch (pdfError) {
        console.error(`[webhook] PDF generation failed for order ${orderId}:`, pdfError);

        // Jeśli generowanie PDF się nie powiodło, zmień status na FAILED
        await prisma.order.update({
          where: { id: orderId },
          data: { status: "FAILED" },
        });

        // Wyślij email z informacją o błędzie
        if (customerEmail) {
          await resend.emails.send({
            from: "Archeya <onboarding@resend.dev>",
            to: customerEmail,
            subject: "Błąd przy generowaniu Twojego raportu",
            text: "Przepraszamy, ale nie udało nam się wygenerować Twojego raportu. Prosimy spróbować ponownie lub skontaktuj się z nami.",
          });
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("[webhook] Error:", error);
    return NextResponse.json({ received: false }, { status: 500 });
  }
}
