"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Flame, Heart, Grid3X3 } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Início" },
  { href: "/busca", icon: Search, label: "Buscar" },
  { href: "/ofertas", icon: Flame, label: "Ofertas" },
  { href: "/favoritos", icon: Heart, label: "Favoritos" },
  { href: "/categorias", icon: Grid3X3, label: "Categorias" },
];

export default function BottomBar() {
  const pathname = usePathname();

  // Don't show on admin pages
  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500" />
      <div className="bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-around max-w-lg mx-auto px-2 pb-[env(safe-area-inset-bottom)]">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href === "/busca" ? "/busca" : item.href}
                className={`relative flex flex-col items-center gap-0.5 py-2.5 px-3 min-w-[56px] transition-colors ${
                  isActive ? "text-orange-500" : "text-gray-400"
                }`}
              >
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-orange-500 rounded-full" />
                )}
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className={isActive ? "text-orange-500" : "text-gray-400"}
                />
                <span
                  className={`text-[10px] font-medium ${
                    isActive ? "text-orange-500" : "text-gray-400"
                  }`}
                >
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
