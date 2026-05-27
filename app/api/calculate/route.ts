import { NextRequest, NextResponse } from "next/server";
import { CalculateRequestSchema } from "@/lib/validationSchemas";
import {
  calculateIndividualPortrait,
  calculatePartnershipPortrait,
  getBasicCardsIndividual,
  getBasicCardsPartnership,
} from "@/lib/tarotCalculations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validData = CalculateRequestSchema.parse(body);

    if (validData.reportType === "INDIVIDUAL") {
      const portrait = calculateIndividualPortrait(validData.date1);
      const allCards = Object.values(portrait.detailedCards);

      return NextResponse.json(
        {
          success: true,
          data: {
            arcana: portrait,
            allCards: allCards,
          },
        },
        { status: 200 }
      );
    }

    if (validData.reportType === "PARTNERSHIP") {
      if (!validData.date2) {
        return NextResponse.json(
          {
            success: false,
            error: "Raport partnerski wymaga dwóch dat",
          },
          { status: 400 }
        );
      }

      const portrait = calculatePartnershipPortrait(validData.date1, validData.date2);
      const allCards = Object.values(portrait.detailedCards);

      return NextResponse.json(
        {
          success: true,
          data: {
            person1: portrait.person1,
            person2: portrait.person2,
            combined: portrait.combined,
            allCards: allCards,
          },
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("[/api/calculate] Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Nie udało się obliczyć portretu",
      },
      { status: 400 }
    );
  }
}
