"use server";

import { prisma } from "@/lib/prisma";

export type EventType = 
  | 'CALCULATOR_USED'
  | 'CHECKOUT_STARTED'
  | 'PAYMENT_SUCCEEDED'
  | 'PDF_GENERATED'
  | 'EMAIL_SENT'
  | 'REPORT_DOWNLOADED';

export async function trackEvent(type: EventType, metadata?: any) {
  try {
    await prisma.analyticsEvent.create({
      data: {
        type,
        metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : null
      }
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to track event", error);
    // Zawsze zwracamy true, żeby nie blokować UI w razie błędu analityki
    return { success: true }; 
  }
}
