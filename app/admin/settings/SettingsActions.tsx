"use client";

import { useTransition } from "react";
import { saveSettings } from "./actions";
import { toast } from "sonner";
import { Save, AlertTriangle } from "lucide-react";

export function SettingsActions({ defaultSettings }: { defaultSettings: Record<string, string> }) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await saveSettings(formData);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Pricing Config */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
        <h2 className="text-lg font-medium text-stone-100 mb-6 border-b border-stone-800 pb-2">Cennik (w PLN)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-400 mb-2">Raport Indywidualny</label>
            <div className="relative">
              <input 
                type="number" 
                name="price_individual" 
                defaultValue={defaultSettings.price_individual}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg py-2 pl-4 pr-10 text-stone-300 focus:outline-none focus:border-stone-600 transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 text-sm">PLN</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-400 mb-2">Raport Partnerski</label>
            <div className="relative">
              <input 
                type="number" 
                name="price_partnership" 
                defaultValue={defaultSettings.price_partnership}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg py-2 pl-4 pr-10 text-stone-300 focus:outline-none focus:border-stone-600 transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 text-sm">PLN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Global Flags */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
        <h2 className="text-lg font-medium text-stone-100 mb-6 border-b border-stone-800 pb-2">Zarządzanie Platformą</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-stone-950 rounded-lg border border-stone-800">
            <div>
              <p className="text-stone-300 font-medium">Tryb Przerwy Technicznej (Maintenance)</p>
              <p className="text-sm text-stone-500 mt-1">Gdy włączony, zablokuje możliwość kupowania nowych raportów i wyświetli odpowiedni komunikat.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" name="maintenance_mode" value="true" defaultChecked={defaultSettings.maintenance_mode === "true"} className="sr-only peer" />
              <div className="w-11 h-6 bg-stone-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-stone-300 after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-stone-950 rounded-lg border border-stone-800">
            <div>
              <p className="text-stone-300 font-medium flex items-center gap-2">Tryb Testowy Płatności (Stripe) <AlertTriangle className="w-4 h-4 text-amber-500" /></p>
              <p className="text-sm text-stone-500 mt-1">Używaj testowych kluczy API, aby nie obciążać prawdziwych kart kredytowych.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" name="test_mode" value="true" defaultChecked={defaultSettings.test_mode === "true"} className="sr-only peer" />
              <div className="w-11 h-6 bg-stone-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-stone-300 after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 border-t border-stone-800 pt-6">
        <button type="submit" disabled={isPending} className="flex items-center gap-2 bg-stone-100 hover:bg-white text-stone-900 px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50">
          <Save className="w-5 h-5" />
          {isPending ? "Zapisywanie..." : "Zapisz Ustawienia"}
        </button>
      </div>
    </form>
  );
}
