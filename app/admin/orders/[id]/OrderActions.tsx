"use client";

import { useTransition } from "react";
import { Mail, RefreshCw } from "lucide-react";
import { resendOrderEmail, regenerateOrderPdf } from "../../actions";
import { toast } from "sonner"; // Assuming sonner is used for toasts, if not available standard alert

export function OrderActions({ orderId, status, pdfUrl }: { orderId: string, status: string, pdfUrl: string | null }) {
  const [isPendingEmail, startTransitionEmail] = useTransition();
  const [isPendingPdf, startTransitionPdf] = useTransition();

  const handleResendEmail = () => {
    startTransitionEmail(async () => {
      const res = await resendOrderEmail(orderId);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleRegeneratePdf = () => {
    startTransitionPdf(async () => {
      const res = await regenerateOrderPdf(orderId);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
      <h2 className="text-lg font-medium text-stone-100 mb-4 border-b border-stone-800 pb-2">Akcje Administracyjne</h2>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleResendEmail}
          disabled={isPendingEmail || !pdfUrl}
          className="flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Mail className="w-4 h-4" />
          {isPendingEmail ? 'Wysyłanie...' : 'Wyślij ponownie maila'}
        </button>
        
        <button
          onClick={handleRegeneratePdf}
          disabled={isPendingPdf}
          className="flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-4 h-4 ${isPendingPdf ? 'animate-spin' : ''}`} />
          {isPendingPdf ? 'Generowanie...' : 'Wygeneruj PDF ponownie'}
        </button>
      </div>
      {!pdfUrl && <p className="text-xs text-stone-500 mt-2">Wysyłka maila jest zablokowana, dopóki PDF nie zostanie wygenerowany.</p>}
    </div>
  );
}
