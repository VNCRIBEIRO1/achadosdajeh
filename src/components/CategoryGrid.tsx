"use client";

import Link from "next/link";
import {
  Smartphone, ShirtIcon, Home, Sparkles, Dumbbell, ToyBrick,
  BookOpen, Gamepad2, Car, PawPrint, Pill, Apple, Package,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { useRef } from "react";

interface CategoryGridProps {
  categories: {
    id: string;
    name: string;
    slug: string;
    icon?: string | null;
    _count?: { products: number };
  }[];
}

const categoryIcons: Record<string, React.ElementType> = {
  eletronicos: Smartphone,
  moda: ShirtIcon,
  casa: Home,
  beleza: Sparkles,
  esportes: Dumbbell,
  brinquedos: ToyBrick,
  livros: BookOpen,
  games: Gamepad2,
  automotivo: Car,
  pets: PawPrint,
  saude: Pill,
  alimentos: Apple,
};

const categoryColors: Record<string, string> = {
  eletronicos: "#3B82F6",
  moda: "#EC4899",
  casa: "#F59E0B",
  beleza: "#A855F7",
  esportes: "#22C55E",
  brinquedos: "#EF4444",
  livros: "#6366F1",
  games: "#06B6D4",
  automotivo: "#64748B",
  pets: "#14B8A6",
};

export default function CategoryGrid({ categories }: CategoryGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const displayCategories = categories.length
    ? categories
    : [
        { id: "1", name: "Eletrônicos", slug: "eletronicos", icon: null },
        { id: "2", name: "Moda", slug: "moda", icon: null },
        { id: "3", name: "Casa", slug: "casa", icon: null },
        { id: "4", name: "Beleza", slug: "beleza", icon: null },
        { id: "5", name: "Esportes", slug: "esportes", icon: null },
        { id: "6", name: "Brinquedos", slug: "brinquedos", icon: null },
      ];

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <div className="relative group/cat">
      <button
        onClick={() => scroll("left")}
        className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md border border-gray-100 p-1.5 rounded-full opacity-0 group-hover/cat:opacity-100 transition-opacity hidden sm:flex"
      >
        <ChevronLeft size={14} className="text-gray-500" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md border border-gray-100 p-1.5 rounded-full opacity-0 group-hover/cat:opacity-100 transition-opacity hidden sm:flex"
      >
        <ChevronRight size={14} className="text-gray-500" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar py-1 sm:justify-center"
      >
        {displayCategories.map((cat) => {
          const IconComponent = categoryIcons[cat.slug] || Package;
          const color = categoryColors[cat.slug] || "#6C757D";
          return (
            <Link
              key={cat.id}
              href={`/categoria/${cat.slug}`}
              className="group shrink-0 flex flex-col items-center gap-2 w-[68px] sm:w-[76px]"
            >
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-md"
                style={{ backgroundColor: `${color}1A`, color }}
              >
                <IconComponent size={22} />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-gray-600 group-hover:text-[#212529] text-center leading-tight transition-colors">
                {cat.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
