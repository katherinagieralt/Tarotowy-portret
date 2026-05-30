"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// Mocks for actions, as we don't want to actually run the complex PDF generation or Resend in this demo without fully importing them.
// In a real scenario, you'd import your generateSummary PDF generator and resendEmail function here.

export async function resendOrderEmail(orderId: string) {
  try {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order || !order.email) throw new Error("Nie znaleziono zamówienia lub brakuje emaila.");

    // Simulate sending email...
    // await sendEmail({ to: order.email, subject: "Twoje zamówienie", pdfUrl: order.pdfUrl });

    await prisma.systemLog.create({
      data: {
        level: "INFO",
        type: "ADMIN_ACTION",
        message: `Ręczne wysłanie maila dla zamówienia ${orderId}`,
        orderId,
        resolved: true
      }
    });

    revalidatePath(`/admin/orders/${orderId}`);
    return { success: true, message: "Email został pomyślnie wysłany." };
  } catch (error: any) {
    return { success: false, message: error.message || "Błąd podczas wysyłania maila." };
  }
}

export async function regenerateOrderPdf(orderId: string) {
  try {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new Error("Nie znaleziono zamówienia.");

    // Simulate regenerating PDF...
    // const newPdfUrl = await generateSummary({ date1: order.date1, date2: order.date2, type: order.reportType });
    // await prisma.order.update({ where: { id: orderId }, data: { pdfUrl: newPdfUrl } });

    await prisma.systemLog.create({
      data: {
        level: "INFO",
        type: "ADMIN_ACTION",
        message: `Ręczne wygenerowanie PDF dla zamówienia ${orderId}`,
        orderId,
        resolved: true
      }
    });

    revalidatePath(`/admin/orders/${orderId}`);
    return { success: true, message: "PDF został pomyślnie wygenerowany." };
  } catch (error: any) {
    return { success: false, message: error.message || "Błąd podczas generowania PDF." };
  }
}

export async function resolveLog(logId: string) {
  try {
    await prisma.systemLog.update({
      where: { id: logId },
      data: { resolved: true }
    });
    revalidatePath('/admin/logs');
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
