"use client";

import Link from "next/link";
import { Smartphone, ShirtIcon, Home, Sparkles, Dumbbell, ToyBrick, BookOpen, Gamepad2, Car, PawPrint, Pill, Apple, Package } from "lucide-react";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const categoryColors: Record<string, { bg: string; ring: string; icon: string }> = {
  eletronicos: { bg: "bg-blue-50", ring: "ring-blue-200 group-hover:ring-blue-400", icon: "text-blue-600" },
  moda: { bg: "bg-pink-50", ring: "ring-pink-200 group-hover:ring-pink-400", icon: "text-pink-600" },
  casa: { bg: "bg-amber-50", ring: "ring-amber-200 group-hover:ring-amber-400", icon: "text-amber-600" },
  beleza: { bg: "bg-purple-50", ring: "ring-purple-200 group-hover:ring-purple-400", icon: "text-purple-600" },
  esportes: { bg: "bg-green-50", ring: "ring-green-200 group-hover:ring-green-400", icon: "text-green-600" },
  brinquedos: { bg: "bg-red-50", ring: "ring-red-200 group-hover:ring-red-400", icon: "text-red-600" },
  livros: { bg: "bg-indigo-50", ring: "ring-indigo-200 group-hover:ring-indigo-400", icon: "text-indigo-600" },
  games: { bg: "bg-cyan-50", ring: "ring-cyan-200 group-hover:ring-cyan-400", icon: "text-cyan-600" },
  automotivo: { bg: "bg-slate-50", ring: "ring-slate-200 group-hover:ring-slate-400", icon: "text-slate-600" },
  pets: { bg: "bg-teal-50", ring: "ring-teal-200 group-hover:ring-teal-400", icon: "text-teal-600" },
};

const defaultColor = { bg: "bg-gray-50", ring: "ring-gray-200 group-hover:ring-gray-400", icon: "text-gray-600" };

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
      {/* Arrows */}
      <button
        onClick={() => scroll("left")}
        className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-gray-200 p-1.5 rounded-full opacity-0 group-hover/cat:opacity-100 transition-opacity hidden sm:flex"
      >
        <ChevronLeft size={16} className="text-gray-500" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-gray-200 p-1.5 rounded-full opacity-0 group-hover/cat:opacity-100 transition-opacity hidden sm:flex"
      >
        <ChevronRight size={16} className="text-gray-500" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-5 sm:gap-6 lg:gap-8 overflow-x-auto no-scrollbar py-2 px-1 sm:justify-center"
      >
        {displayCategories.map((cat) => {
          const IconComponent = categoryIcons[cat.slug] || Package;
          const colors = categoryColors[cat.slug] || defaultColor;
          return (
            <Link
              key={cat.id}
              href={`/categoria/${cat.slug}`}
              className="group shrink-0 flex flex-col items-center gap-2 w-[72px] sm:w-[80px]"
            >
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${colors.bg} ring-2 ${colors.ring} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}
              >
                <IconComponent className={colors.icon} size={22} />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-gray-600 group-hover:text-gray-900 text-center leading-tight transition-colors">
                {cat.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
