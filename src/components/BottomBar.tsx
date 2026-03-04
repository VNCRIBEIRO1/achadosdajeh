"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Zap, Heart, Grid3X3 } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Início" },
  { href: "/busca", icon: Search, label: "Buscar" },
  { href: "/ofertas", icon: Zap, label: "Ofertas" },
  { href: "/favoritos", icon: Heart, label: "Favoritos" },
  { href: "/categorias", icon: Grid3X3, label: "Mais" },
];

export default function BottomBar() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="bg-white border-t border-gray-200">
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
                className={`relative flex flex-col items-center gap-0.5 py-2 px-3 min-w-[52px] transition-colors ${
                  isActive ? "text-orange-500" : "text-gray-400"
                }`}
              >
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-orange-500" />
                )}
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                <span className={`text-[10px] ${isActive ? "font-semibold" : "font-medium"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
