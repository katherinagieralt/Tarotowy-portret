"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveSettings(formData: FormData) {
  try {
    const settings = Array.from(formData.entries());
    
    // We update each setting in the DB
    for (const [key, value] of settings) {
      if (typeof value === 'string' && !key.startsWith('$ACTION')) {
        await prisma.systemSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value }
        });
      }
    }
    
    await prisma.systemLog.create({
      data: {
        level: "INFO",
        type: "ADMIN_ACTION",
        message: "Zaktualizowano ustawienia systemu.",
        resolved: true
      }
    });

    revalidatePath("/admin/settings");
    return { success: true, message: "Ustawienia zostały zapisane." };
  } catch (error: any) {
    return { success: false, message: error.message || "Błąd podczas zapisywania." };
  }
}
