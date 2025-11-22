"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FileText,
  Settings,
  Image,
  MessageSquare,
  Users,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Ürünler", icon: Package },
  { href: "/admin/inquiries", label: "Teklifler", icon: MessageSquare },
  { href: "/admin/content", label: "İçerik Yönetimi", icon: FileText },
  { href: "/admin/settings", label: "Ayarlar", icon: Settings },
  { href: "/admin/logo", label: "Logo", icon: Image },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen sticky top-0">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-primary-blue">GarantiCo Admin</h2>
      </div>
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-primary-ocean text-white"
                  : "text-text-dark hover:bg-primary-light/10"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-0 w-64 p-4 border-t bg-white">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-dark hover:bg-red-50 hover:text-red-600 w-full transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Çıkış Yap</span>
        </button>
      </div>
    </aside>
  );
}

