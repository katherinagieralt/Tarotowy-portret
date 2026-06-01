import { NextRequest, NextResponse } from "next/server";
import { CheckoutRequestSchema } from "@/lib/validationSchemas";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

const REPORT_PRICES: Record<string, number> = {
  INDIVIDUAL: 14900, // 149 PLN w groszach
  PARTNERSHIP: 17900, // 179 PLN w groszach
};

const REPORT_PRICES_EN: Record<string, number> = {
  INDIVIDUAL: 3900, // 39 USD/EUR in cents
  PARTNERSHIP: 4900, // 49 USD/EUR in cents
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validData = CheckoutRequestSchema.parse(body);

    const isEnglish = validData.locale === "en";
    const priceToUse = isEnglish ? REPORT_PRICES_EN[validData.reportType] : REPORT_PRICES[validData.reportType];

    // Utwórz Order w bazie
    const order = await prisma.order.create({
      data: {
        email: validData.email,
        reportType: validData.reportType,
        date1: new Date(validData.date1),
        date2: validData.date2 ? new Date(validData.date2) : null,
        price: priceToUse,
        status: "PENDING",
      },
    });

    // Określamy walutę
    const reqCurrency = validData.currency || (isEnglish ? "usd" : "pln");
    
    // Utwórz sesję Stripe
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: reqCurrency === "pln" ? ["card", "blik", "p24", "link"] : ["card", "paypal", "link"],
      billing_address_collection: "required",
      allow_promotion_codes: true,
      line_items: [
        {
          price_data: {
            currency: reqCurrency,
            product_data: {
              name: isEnglish
                  ? (validData.reportType === "INDIVIDUAL" ? "Individual Portrait" : "Partnership Portrait")
                  : (validData.reportType === "INDIVIDUAL" ? "Portret Indywidualny" : "Portret Partnerski"),
              description: isEnglish
                  ? `Tarot ${validData.reportType === "INDIVIDUAL" ? "Individual Portrait" : "Partnership Portrait"}`
                  : `Tarotowy ${validData.reportType === "INDIVIDUAL" ? "Portret Indywidualny" : "Portret Partnerski"}`,
            },
            unit_amount: priceToUse,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: validData.locale === "en" ? `${baseUrl}/success?orderId=${order.id}` : `${baseUrl}/pl/success?orderId=${order.id}`,
      cancel_url: validData.locale === "en" ? `${baseUrl}/?cancelled=true` : `${baseUrl}/pl?cancelled=true`,
      customer_email: validData.email,
      metadata: {
        orderId: order.id,
        reportType: validData.reportType,
        name1: validData.name1 || "",
        name2: validData.name2 || "",
        locale: validData.locale || "pl",
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
        error: error instanceof Error ? error.message : "Failed to create checkout session",
      },
      { status: 400 }
    );
  }
}
