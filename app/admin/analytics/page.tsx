import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Activity, MousePointerClick, CreditCard, Download, TrendingUp, PieChart } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminAnalyticsPage() {
  const [
    calculatorUsedCount,
    checkoutStartedCount,
    paymentSucceededCount,
    pdfGeneratedCount,
    reportTypeCounts
  ] = await Promise.all([
    prisma.analyticsEvent.count({ where: { type: 'CALCULATOR_USED' } }),
    prisma.analyticsEvent.count({ where: { type: 'CHECKOUT_STARTED' } }),
    prisma.order.count({ where: { status: 'PAID' } }), // We can just use orders table
    prisma.order.count({ where: { pdfUrl: { not: null } } }),
    prisma.order.groupBy({
      by: ['reportType'],
      _count: { id: true }
    })
  ]);

  const calcToCheckoutRate = calculatorUsedCount > 0 
    ? ((checkoutStartedCount / calculatorUsedCount) * 100).toFixed(1) 
    : "0.0";
    
  const checkoutToPaymentRate = checkoutStartedCount > 0
    ? ((paymentSucceededCount / checkoutStartedCount) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-light text-stone-100">Analityka Produktowa</h1>
        <p className="text-stone-400 mt-1">Śledź konwersję i zaangażowanie użytkowników w kalkulatorze.</p>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
        <h2 className="text-lg font-medium text-stone-100 mb-6 flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-amber-500" />
          Lejek Konwersji (Funnel)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-stone-950 p-6 rounded-lg border border-stone-800 relative">
            <div className="flex items-center gap-3 text-stone-400 mb-3">
              <MousePointerClick className="w-5 h-5 text-blue-500" />
              <h3 className="text-sm font-medium uppercase tracking-wider">Użycia Kalkulatora</h3>
            </div>
            <p className="text-3xl font-light text-stone-100">{calculatorUsedCount}</p>
          </div>

          <div className="bg-stone-950 p-6 rounded-lg border border-stone-800 relative">
            <div className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-px bg-stone-700"></div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3 text-stone-400">
                <Activity className="w-5 h-5 text-amber-500" />
                <h3 className="text-sm font-medium uppercase tracking-wider">Checkouty</h3>
              </div>
              <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded">
                {calcToCheckoutRate}% konwersji
              </span>
            </div>
            <p className="text-3xl font-light text-stone-100">{checkoutStartedCount}</p>
          </div>

          <div className="bg-stone-950 p-6 rounded-lg border border-stone-800 relative">
            <div className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-px bg-stone-700"></div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3 text-stone-400">
                <CreditCard className="w-5 h-5 text-emerald-500" />
                <h3 className="text-sm font-medium uppercase tracking-wider">Opłacone</h3>
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
                {checkoutToPaymentRate}% konwersji
              </span>
            </div>
            <p className="text-3xl font-light text-stone-100">{paymentSucceededCount}</p>
          </div>
        </div>
      </div>

      {/* Reports Generated & breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
          <h2 className="text-lg font-medium text-stone-100 mb-6 flex items-center gap-3">
            <Download className="w-5 h-5 text-stone-400" />
            Wygenerowane PDF
          </h2>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full border-4 border-emerald-500/20 flex items-center justify-center">
              <span className="text-2xl font-light text-emerald-400">{pdfGeneratedCount}</span>
            </div>
            <div className="space-y-2 flex-1">
              <p className="text-sm text-stone-400">Całkowita liczba udanych generacji raportów PDF od początku działania systemu.</p>
            </div>
          </div>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
          <h2 className="text-lg font-medium text-stone-100 mb-6 flex items-center gap-3">
            <PieChart className="w-5 h-5 text-stone-400" />
            Rozkład Typów Raportów
          </h2>
          <div className="space-y-4">
            {reportTypeCounts.length === 0 ? (
              <p className="text-sm text-stone-500">Brak danych o raportach.</p>
            ) : (
              reportTypeCounts.map(type => (
                <div key={type.reportType} className="flex justify-between items-center bg-stone-950 p-4 rounded-lg border border-stone-800">
                  <span className="text-stone-300 font-medium">
                    {type.reportType === 'INDIVIDUAL' ? 'Portret Indywidualny' : 'Portret Partnerski'}
                  </span>
                  <span className="text-stone-400 text-sm">
                    {type._count.id} zamówień
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
