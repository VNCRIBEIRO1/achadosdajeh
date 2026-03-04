"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Tag, Heart, LayoutGrid } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Início" },
  { href: "/busca", icon: Search, label: "Buscar" },
  { href: "/ofertas", icon: Tag, label: "Ofertas" },
  { href: "/favoritos", icon: Heart, label: "Favoritos" },
  { href: "/categorias", icon: LayoutGrid, label: "Mais" },
];

export default function BottomBar() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-200 shadow-[0_-1px_6px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-around max-w-lg mx-auto pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 py-2.5 px-4 transition-colors ${
                isActive ? "text-[#FF5733]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.6} />
              <span className={`text-[11px] ${isActive ? "font-bold" : "font-medium"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
