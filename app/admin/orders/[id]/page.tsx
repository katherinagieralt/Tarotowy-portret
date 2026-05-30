import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, Mail, FileText, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";
import { OrderActions } from "./OrderActions";

export const dynamic = 'force-dynamic';

export default async function AdminOrderDetailsPage({
  params
}: {
  params: { id: string }
}) {
  const order = await prisma.order.findUnique({
    where: { id: params.id }
  });

  if (!order) {
    notFound();
  }

  const logs = await prisma.systemLog.findMany({
    where: { orderId: order.id },
    orderBy: { createdAt: 'desc' }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PAID':
      case 'DELIVERED': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'FAILED': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-amber-500" />;
    }
  };

  const formatPrice = (priceInGrosze: number | null) => {
    if (!priceInGrosze) return "0.00 PLN";
    return `${(priceInGrosze / 100).toFixed(2)} PLN`;
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <Link href="/admin/orders" className="text-sm text-stone-500 hover:text-stone-300 flex items-center gap-2 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Powrót do listy
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-light text-stone-100 flex items-center gap-3">
              Zamówienie <span className="font-mono text-stone-400">#{order.id.slice(0, 8)}</span>
            </h1>
            <p className="text-stone-400 mt-1">Utworzono: {format(order.createdAt, 'dd.MM.yyyy HH:mm:ss')}</p>
          </div>
          <div className="flex gap-3 bg-stone-900 border border-stone-800 p-2 rounded-lg">
            <span className="px-3 py-1 bg-stone-950 text-stone-300 rounded text-sm border border-stone-800">
              {order.reportType === 'INDIVIDUAL' ? 'Indywidualny' : 'Partnerski'}
            </span>
            <span className="px-3 py-1 bg-stone-950 text-stone-300 rounded text-sm border border-stone-800 flex items-center gap-2">
              {getStatusIcon(order.status)} {order.status}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Customer Details */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-medium text-stone-100 mb-2 border-b border-stone-800 pb-2">Dane Klienta i Płatność</h2>
          <div>
            <p className="text-sm text-stone-500">Email</p>
            <p className="text-stone-200 font-medium">{order.email || 'Brak'}</p>
          </div>
          <div>
            <p className="text-sm text-stone-500">Kwota</p>
            <p className="text-stone-200 font-medium">{formatPrice(order.price)}</p>
          </div>
          <div>
            <p className="text-sm text-stone-500">Stripe Payment Intent</p>
            <p className="text-stone-400 font-mono text-sm break-all">{order.paymentIntentId || 'Brak'}</p>
          </div>
        </div>

        {/* Report Input Details */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-medium text-stone-100 mb-2 border-b border-stone-800 pb-2">Dane do Raportu</h2>
          <div>
            <p className="text-sm text-stone-500">Data Urodzenia {order.reportType === 'PARTNERSHIP' ? 'Osoby 1' : ''}</p>
            <p className="text-stone-200 font-medium">{format(order.date1, 'dd.MM.yyyy')}</p>
          </div>
          {order.reportType === 'PARTNERSHIP' && order.date2 && (
            <div>
              <p className="text-sm text-stone-500">Data Urodzenia Osoby 2</p>
              <p className="text-stone-200 font-medium">{format(order.date2, 'dd.MM.yyyy')}</p>
            </div>
          )}
          <div className="pt-2">
            <p className="text-sm text-stone-500 mb-1">Wygenerowany Plik</p>
            {order.pdfUrl ? (
              <a href={order.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-stone-900 bg-stone-100 px-4 py-2 rounded-lg hover:bg-white text-sm font-medium transition-colors">
                <FileText className="w-4 h-4" /> Zobacz PDF
              </a>
            ) : (
              <p className="text-amber-500 text-sm flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> PDF nie został jeszcze wygenerowany</p>
            )}
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      <OrderActions orderId={order.id} status={order.status} pdfUrl={order.pdfUrl} />

      {/* Logs for this order */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
        <h2 className="text-lg font-medium text-stone-100 mb-4 border-b border-stone-800 pb-2">Historia Zdarzeń (Logi)</h2>
        {logs.length === 0 ? (
          <p className="text-stone-500 text-sm">Brak zarejestrowanych zdarzeń w logach dla tego zamówienia.</p>
        ) : (
          <div className="space-y-4">
            {logs.map(log => (
              <div key={log.id} className={`p-4 rounded-lg border ${log.level === 'ERROR' || log.level === 'CRITICAL' ? 'bg-red-950/20 border-red-900/30' : 'bg-stone-950 border-stone-800'}`}>
                <div className="flex justify-between mb-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${log.level === 'ERROR' || log.level === 'CRITICAL' ? 'bg-red-900/50 text-red-300' : 'bg-stone-800 text-stone-300'}`}>
                    {log.type}
                  </span>
                  <span className="text-xs text-stone-500">{format(log.createdAt, 'dd.MM.yyyy HH:mm:ss')}</span>
                </div>
                <p className="text-sm text-stone-300">{log.message}</p>
                {log.stack && (
                  <pre className="mt-2 p-2 bg-stone-900 rounded text-xs text-stone-500 overflow-x-auto border border-stone-800">
                    {log.stack}
                  </pre>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
