import { NextRequest, NextResponse } from "next/server";
import { CheckoutRequestSchema } from "@/lib/validationSchemas";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

const REPORT_PRICES: Record<string, number> = {
  INDIVIDUAL: 9900, // 99 PLN w groszach
  PARTNERSHIP: 12900, // 129 PLN w groszach
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validData = CheckoutRequestSchema.parse(body);

    // Utwórz Order w bazie
    const order = await prisma.order.create({
      data: {
        email: validData.email,
        reportType: validData.reportType,
        date1: new Date(validData.date1),
        date2: validData.date2 ? new Date(validData.date2) : null,
        price: REPORT_PRICES[validData.reportType],
        status: "PENDING",
      },
    });

    // Utwórz sesję Stripe
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "blik", "p24"],
      line_items: [
        {
          price_data: {
            currency: "pln",
            product_data: {
              name:
                validData.reportType === "INDIVIDUAL"
                  ? "Portret Indywidualny"
                  : "Portret Partnerski",
              description: `Tarotowy ${
                validData.reportType === "INDIVIDUAL"
                  ? "Portret Indywidualny"
                  : "Portret Partnerski"
              }`,
            },
            unit_amount: REPORT_PRICES[validData.reportType],
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/success?orderId=${order.id}`,
      cancel_url: `${baseUrl}/kalkulator?cancelled=true`,
      customer_email: validData.email,
      metadata: {
        orderId: order.id,
        reportType: validData.reportType,
        name1: validData.name1 || "",
        name2: validData.name2 || "",
      },
    });

    // Zapisz paymentIntentId
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentIntentId: session.id },
    });

    return NextResponse.json(
      {
        success: true,
        sessionUrl: session.url,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[/api/checkout] Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Nie udało się stworzyć sesji płatności",
      },
      { status: 400 }
    );
  }
}
