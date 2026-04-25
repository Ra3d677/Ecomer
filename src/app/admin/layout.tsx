import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Tags, Users, Settings, LogOut, LayoutTemplate, ImageIcon } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-primary text-primary-foreground flex-shrink-0 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-primary-foreground/10">
          <span className="text-xl font-bold tracking-tight">LUXE Admin</span>
        </div>
        
        <nav className="flex-grow py-6 px-4 space-y-2">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-foreground/10 text-white font-medium">
            <LayoutDashboard className="h-5 w-5" /> Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-white transition-colors">
            <ShoppingBag className="h-5 w-5" /> Products
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-white transition-colors">
            <Tags className="h-5 w-5" /> Categories
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-white transition-colors">
            <Users className="h-5 w-5" /> Orders
          </Link>
          <Link href="/admin/templates" className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-white transition-colors">
            <LayoutTemplate className="h-5 w-5" /> Templates
          </Link>
          <Link href="/admin/banners" className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-white transition-colors">
            <ImageIcon className="h-5 w-5" /> Banners
          </Link>
          <Link href="/admin/marquee" className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M7 12h10"/></svg> Marquee
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-white transition-colors">
            <Settings className="h-5 w-5" /> Settings
          </Link>
        </nav>
        
        <div className="p-4 border-t border-primary-foreground/10">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-primary-foreground/70 hover:bg-red-500/20 hover:text-red-400 transition-colors">
            <LogOut className="h-5 w-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
