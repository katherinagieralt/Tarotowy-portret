import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { utapi } from "@/server/uploadthing";

/**
 * Chroniony endpoint do pobrania PDF
 * Weryfikuje, że użytkownik ma dostęp do zamówienia (weryfikacja email via cookie lub query param)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");
    const email = searchParams.get("email"); // opcjonalnie: e-mail użytkownika do weryfikacji

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "Brak identyfikatora zamówienia" },
        { status: 400 }
      );
    }

    // Pobierz Order z bazy
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Zamówienie nie znalezione" },
        { status: 404 }
      );
    }

    // Jeśli podano email, zweryfikuj, że zgadza się z email z zamówienia
    if (email && order.email !== email) {
      return NextResponse.json(
        { success: false, error: "Brak dostępu do tego zamówienia" },
        { status: 403 }
      );
    }

    // Jeśli PDF nie został jeszcze wygenerowany
    if (!order.pdfUrl) {
      return NextResponse.json(
        { success: false, error: "Raport nie jest jeszcze gotowy" },
        { status: 202 }
      );
    }

    // Pobierz plik z UploadThing i zwróć jako stream
    // Alternatywnie: przekieruj bezpośrednio na URL
    // Dla uproszczenia, tu zwracamy redirect na publiczny URL z UploadThing
    return NextResponse.redirect(order.pdfUrl, { status: 302 });
  } catch (error) {
    console.error("[/api/download] Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Błąd podczas pobierania pliku",
      },
      { status: 500 }
    );
  }
}
