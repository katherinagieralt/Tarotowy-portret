import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import { Search, Filter, ChevronRight } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string; type?: string; page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const take = 20;
  const skip = (page - 1) * take;

  const where: any = {};
  if (searchParams.q) {
    where.OR = [
      { email: { contains: searchParams.q, mode: 'insensitive' } },
      { id: { contains: searchParams.q } }
    ];
  }
  if (searchParams.status && searchParams.status !== 'ALL') {
    where.status = searchParams.status;
  }
  if (searchParams.type && searchParams.type !== 'ALL') {
    where.reportType = searchParams.type;
  }

  const [orders, totalOrders] = await Promise.all([
    prisma.order.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take,
      skip,
    }),
    prisma.order.count({ where }),
  ]);

  const totalPages = Math.ceil(totalOrders / take);

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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-light text-stone-100">Zamówienia</h1>
          <p className="text-stone-400 mt-1">Zarządzaj wszystkimi transakcjami i raportami.</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-4">
        <form className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              type="text"
              name="q"
              defaultValue={searchParams.q}
              placeholder="Szukaj po emailu lub ID..."
              className="w-full bg-stone-950 border border-stone-800 rounded-lg py-2 pl-10 pr-4 text-stone-300 focus:outline-none focus:border-stone-600 transition-colors"
            />
          </div>
          <div className="flex gap-4">
            <select
              name="status"
              defaultValue={searchParams.status || 'ALL'}
              className="bg-stone-950 border border-stone-800 rounded-lg py-2 px-4 text-stone-300 focus:outline-none focus:border-stone-600 appearance-none min-w-[150px]"
            >
              <option value="ALL">Wszystkie Statusy</option>
              <option value="PAID">PAID</option>
              <option value="PENDING">PENDING</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="FAILED">FAILED</option>
            </select>
            <select
              name="type"
              defaultValue={searchParams.type || 'ALL'}
              className="bg-stone-950 border border-stone-800 rounded-lg py-2 px-4 text-stone-300 focus:outline-none focus:border-stone-600 appearance-none min-w-[150px]"
            >
              <option value="ALL">Wszystkie Typy</option>
              <option value="INDIVIDUAL">Indywidualny</option>
              <option value="PARTNERSHIP">Partnerski</option>
            </select>
            <button type="submit" className="bg-stone-100 text-stone-900 px-6 py-2 rounded-lg font-medium hover:bg-white transition-colors">
              Filtruj
            </button>
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-800 text-xs uppercase tracking-wider text-stone-500 bg-stone-950/50">
                <th className="p-4 font-medium">ID / Data</th>
                <th className="p-4 font-medium">Klient</th>
                <th className="p-4 font-medium">Typ Raportu</th>
                <th className="p-4 font-medium">Kwota</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Akcje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-stone-500">Brak zamówień spełniających kryteria.</td>
                </tr>
              ) : orders.map(order => (
                <tr key={order.id} className="hover:bg-stone-800/50 transition-colors group">
                  <td className="p-4">
                    <div className="text-sm font-medium text-stone-300 font-mono">{order.id.slice(0, 8)}...</div>
                    <div className="text-xs text-stone-500">{format(order.createdAt, 'dd.MM.yyyy HH:mm')}</div>
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
                  <td className="p-4 text-right">
                    <Link href={`/admin/orders/${order.id}`} className="inline-flex items-center justify-center p-2 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-700 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-stone-800 flex items-center justify-between">
            <span className="text-sm text-stone-500">
              Strona {page} z {totalPages} ({totalOrders} wyników)
            </span>
            <div className="flex gap-2">
              {page > 1 && (
                <Link href={`?page=${page - 1}${searchParams.q ? '&q='+searchParams.q : ''}`} className="px-4 py-2 bg-stone-800 text-stone-300 rounded-lg hover:bg-stone-700 text-sm">Poprzednia</Link>
              )}
              {page < totalPages && (
                <Link href={`?page=${page + 1}${searchParams.q ? '&q='+searchParams.q : ''}`} className="px-4 py-2 bg-stone-800 text-stone-300 rounded-lg hover:bg-stone-700 text-sm">Następna</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
