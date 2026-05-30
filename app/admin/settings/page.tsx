import { prisma } from "@/lib/prisma";
import { SettingsActions } from "./SettingsActions";
import { Settings, Sliders, Mail, Shield, Zap } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const settingsRecords = await prisma.systemSetting.findMany();
  
  // Transform do prostego obiektu klucz-wartość
  const settings = settingsRecords.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  const defaultSettings = {
    price_individual: settings.price_individual || "149",
    price_partnership: settings.price_partnership || "199",
    maintenance_mode: settings.maintenance_mode || "false",
    sender_email: settings.sender_email || "no-reply@archeya.pl",
    test_mode: settings.test_mode || "false",
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-light text-stone-100">Ustawienia Systemu</h1>
        <p className="text-stone-400 mt-1">Zarządzaj cenami, trybami działania i podstawową konfiguracją platformy.</p>
      </div>

      <SettingsActions defaultSettings={defaultSettings} />
      
    </div>
  );
}
