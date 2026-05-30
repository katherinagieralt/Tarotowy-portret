import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { LogOut, LayoutDashboard, ShoppingCart, FileText, AlertTriangle, Settings, BarChart2 } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-300 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-stone-900 border-r border-stone-800 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-stone-800">
          <h2 className="text-xl font-light text-stone-100 tracking-widest uppercase">Archeya <span className="font-bold">Admin</span></h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-stone-800 transition-colors text-stone-400 hover:text-stone-100">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-stone-800 transition-colors text-stone-400 hover:text-stone-100">
            <ShoppingCart className="w-5 h-5" />
            <span>Zamówienia</span>
          </Link>
          <Link href="/admin/logs" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-stone-800 transition-colors text-stone-400 hover:text-stone-100">
            <AlertTriangle className="w-5 h-5" />
            <span>Błędy i Logi</span>
          </Link>
          <div className="pt-8 pb-2">
            <p className="px-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">Późniejsze (MVP+)</p>
          </div>
          <Link href="/admin/content" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-stone-800 transition-colors text-stone-600">
            <FileText className="w-4 h-4" />
            <span className="text-sm">Treści (CMS)</span>
          </Link>
          <Link href="/admin/seo" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-stone-800 transition-colors text-stone-600">
            <BarChart2 className="w-4 h-4" />
            <span className="text-sm">SEO Panel</span>
          </Link>
          <Link href="/admin/analytics" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-stone-800 transition-colors text-stone-600">
            <BarChart2 className="w-4 h-4" />
            <span className="text-sm">Analityka</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-stone-800 transition-colors text-stone-600">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Ustawienia</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-stone-800">
          <a href="/api/auth/signout" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-900/20 text-red-400 hover:text-red-300 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Wyloguj</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-stone-800 bg-stone-900/50 backdrop-blur-sm flex items-center px-8 justify-between sticky top-0 z-10">
          <h1 className="text-lg font-medium text-stone-100">Panel Administracyjny</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-stone-400">Witaj, Admin</span>
            <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-300 font-bold">A</div>
          </div>
        </header>
        <div className="flex-1 p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
