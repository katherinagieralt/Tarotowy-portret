import crypto from 'crypto';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const WEBHOOK_SECRET = "whsec_e01325189596cf46d9d06743221f84c5120ba3266f8295e4a5dade98fd533361";
const WEBHOOK_URL = 'http://localhost:3000/api/webhooks/stripe';

async function main() {
  console.log("Szukam zamówienia do przetestowania...");
  
  // Zdobądź najnowsze zamówienie
  const order = await prisma.order.findFirst({
    orderBy: { createdAt: 'desc' }
  });

  if (!order) {
    console.error("Brak zamówień w bazie! Stwórz zamówienie najpierw przez stronę.");
    process.exit(1);
  }

  console.log(`Znalazłem zamówienie: ${order.id}`);

  // Możesz podać tutaj swój email z Resend, aby testować maile!
  const targetEmail = process.env.TEST_EMAIL || 'grafikkgieralt@gmail.com';

  const payload = {
    id: "evt_test_webhook",
    type: "checkout.session.completed",
    data: {
      object: {
        id: "cs_test_123",
        object: "checkout.session",
        customer_details: {
          email: targetEmail,
          name: "Anna Nowak"
        },
        metadata: {
          orderId: order.id
        }
      }
    }
  };

  const payloadString = JSON.stringify(payload);
  
  // Generowanie sygnatury Stripe
  const timestamp = Math.floor(Date.now() / 1000);
  const payloadToSign = `${timestamp}.${payloadString}`;
  const signature = crypto.createHmac('sha256', WEBHOOK_SECRET).update(payloadToSign).digest('hex');
  const stripeSignatureHeader = `t=${timestamp},v1=${signature}`;

  console.log("Wysyłam webhook...");

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Stripe-Signature': stripeSignatureHeader
      },
      body: payloadString
    });

    if (response.ok) {
      console.log("✅ Webhook przyjęty pomyślnie! Zobacz logi w konsoli deweloperskiej Next.js (npm run dev)");
    } else {
      const text = await response.text();
      console.error(`❌ Webhook odrzucony. Status: ${response.status}`, text);
    }
  } catch (err) {
    console.error("❌ Błąd podczas wysyłania webhooka:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
