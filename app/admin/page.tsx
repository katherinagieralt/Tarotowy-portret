import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { ArrowRight, DollarSign, FileText, Activity, AlertTriangle } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    totalOrders,
    recentOrders,
    revenueToday,
    revenue7d,
    revenue30d,
    statusCounts,
    typeCounts,
    systemErrors
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.order.aggregate({
      where: { status: 'PAID', createdAt: { gte: todayStart } },
      _sum: { price: true }
    }),
    prisma.order.aggregate({
      where: { status: 'PAID', createdAt: { gte: sevenDaysAgo } },
      _sum: { price: true }
    }),
    prisma.order.aggregate({
      where: { status: 'PAID', createdAt: { gte: thirtyDaysAgo } },
      _sum: { price: true }
    }),
    prisma.order.groupBy({
      by: ['status'],
      _count: { id: true }
    }),
    prisma.order.groupBy({
      by: ['reportType'],
      _count: { id: true }
    }),
    prisma.systemLog.findMany({
      where: { level: { in: ['ERROR', 'CRITICAL'] }, resolved: false },
      take: 5,
      orderBy: { createdAt: 'desc' }
    })
  ]);

  const formatPrice = (priceInGrosze: number | null) => {
    if (!priceInGrosze) return "0.00 PLN";
    return `${(priceInGrosze / 100).toFixed(2)} PLN`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'PENDING': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'DELIVERED': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'FAILED': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-stone-400 bg-stone-800 border-stone-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-xl">
          <div className="flex items-center gap-4 text-stone-400 mb-4">
            <DollarSign className="w-5 h-5 text-emerald-500" />
            <h3 className="text-sm font-medium uppercase tracking-wider">Przychód (Dziś)</h3>
          </div>
          <p className="text-3xl font-light text-stone-100">{formatPrice(revenueToday._sum.price)}</p>
        </div>
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-xl">
          <div className="flex items-center gap-4 text-stone-400 mb-4">
            <DollarSign className="w-5 h-5 text-emerald-500/70" />
            <h3 className="text-sm font-medium uppercase tracking-wider">Przychód (7 dni)</h3>
          </div>
          <p className="text-3xl font-light text-stone-100">{formatPrice(revenue7d._sum.price)}</p>
        </div>
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-xl">
          <div className="flex items-center gap-4 text-stone-400 mb-4">
            <DollarSign className="w-5 h-5 text-stone-500" />
            <h3 className="text-sm font-medium uppercase tracking-wider">Przychód (30 dni)</h3>
          </div>
          <p className="text-3xl font-light text-stone-100">{formatPrice(revenue30d._sum.price)}</p>
        </div>
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-xl">
          <div className="flex items-center gap-4 text-stone-400 mb-4">
            <FileText className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-medium uppercase tracking-wider">Wszystkie Zamówienia</h3>
          </div>
          <p className="text-3xl font-light text-stone-100">{totalOrders}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col - Orders List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-stone-800 flex justify-between items-center">
              <h2 className="text-lg font-medium text-stone-100">Ostatnie zamówienia</h2>
              <Link href="/admin/orders" className="text-sm text-stone-400 hover:text-stone-200 flex items-center gap-2 transition-colors">
                Zobacz wszystkie <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-800 text-xs uppercase tracking-wider text-stone-500 bg-stone-950/50">
                    <th className="p-4 font-medium">Data</th>
                    <th className="p-4 font-medium">Email</th>
                    <th className="p-4 font-medium">Typ</th>
                    <th className="p-4 font-medium">Kwota</th>
                    <th className="p-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800">
                  {recentOrders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-stone-500">Brak zamówień.</td>
                    </tr>
                  ) : recentOrders.map(order => (
                    <tr key={order.id} className="hover:bg-stone-800/50 transition-colors">
                      <td className="p-4 text-sm text-stone-300">
                        {format(order.createdAt, 'dd.MM.yyyy HH:mm')}
                      </td>
                      <td className="p-4 text-sm text-stone-300">{order.email || 'Brak'}</td>
                      <td className="p-4 text-sm">
                        <span className="px-2 py-1 bg-stone-800 text-stone-300 rounded text-xs border border-stone-700">
                          {order.reportType === 'INDIVIDUAL' ? 'Indywidualny' : 'Partnerski'}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-stone-300">{formatPrice(order.price)}</td>
                      <td className="p-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Col - System Health & Summary */}
        <div className="space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
            <h2 className="text-lg font-medium text-stone-100 mb-6 flex items-center gap-3">
              <Activity className="w-5 h-5 text-stone-400" />
              Podsumowanie Statusów
            </h2>
            <div className="space-y-4">
              {statusCounts.map(stat => (
                <div key={stat.status} className="flex justify-between items-center">
                  <span className="text-stone-400 text-sm">{stat.status}</span>
                  <span className="text-stone-100 font-medium">{stat._count.id}</span>
                </div>
              ))}
            </div>
            <div className="h-px bg-stone-800 my-6"></div>
            <div className="space-y-4">
              {typeCounts.map(type => (
                <div key={type.reportType} className="flex justify-between items-center">
                  <span className="text-stone-400 text-sm">
                    {type.reportType === 'INDIVIDUAL' ? 'Indywidualne' : 'Partnerskie'}
                  </span>
                  <span className="text-stone-100 font-medium">{type._count.id}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Errors */}
          <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-6">
            <h2 className="text-lg font-medium text-red-400 mb-4 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5" />
              Wymaga uwagi
            </h2>
            {systemErrors.length === 0 ? (
              <p className="text-stone-500 text-sm">Brak nierozwiązanych błędów systemowych.</p>
            ) : (
              <div className="space-y-4">
                {systemErrors.map(error => (
                  <div key={error.id} className="bg-stone-900/50 p-3 rounded-lg border border-red-900/20">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-semibold text-red-400">{error.type}</span>
                      <span className="text-xs text-stone-500">{format(error.createdAt, 'dd.MM HH:mm')}</span>
                    </div>
                    <p className="text-sm text-stone-300 line-clamp-2">{error.message}</p>
                  </div>
                ))}
                <Link href="/admin/logs" className="text-sm text-red-400 hover:text-red-300 flex items-center gap-2 mt-4 transition-colors">
                  Przejdź do logów <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
