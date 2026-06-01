import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();
    if (!orderId) {
      return NextResponse.json({ success: false, error: "Brak orderId" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return NextResponse.json({ success: false, error: "Nie znaleziono zamówienia" }, { status: 404 });
    }

    const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "whsec_e01325189596cf46d9d06743221f84c5120ba3266f8295e4a5dade98fd533361";
    const targetEmail = process.env.TEST_EMAIL || 'grafikkgieralt@gmail.com';
    
    const payload = {
      id: "evt_test_webhook_" + Date.now(),
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_test_" + Date.now(),
          object: "checkout.session",
          customer_details: {
            email: targetEmail,
            name: "Osoba Testowa (Skrypt)"
          },
          metadata: {
            orderId: order.id
          }
        }
      }
    };

    const payloadString = JSON.stringify(payload);
    const timestamp = Math.floor(Date.now() / 1000);
    const payloadToSign = `${timestamp}.${payloadString}`;
    const signature = crypto.createHmac('sha256', WEBHOOK_SECRET).update(payloadToSign).digest('hex');
    const stripeSignatureHeader = `t=${timestamp},v1=${signature}`;

    const host = request.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const webhookUrl = `${protocol}://${host}/api/webhooks/stripe`;

    // Wywołaj własny webhook asynchronicznie (bez czekania na koniec, żeby uniknąć timeoutu Vercela/Next.js dla lokalnego fetch)
    fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Stripe-Signature": stripeSignatureHeader
      },
      body: payloadString
    }).catch(err => console.error("Błąd wywoływania webhooka:", err));

    // Zwróć od razu success dla frontendu
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Błąd w simulate-webhook:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
