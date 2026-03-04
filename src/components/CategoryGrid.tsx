"use client";

import Link from "next/link";
import Image from "next/image";
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

const categoryImages: Record<string, string> = {
  eletronicos: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=300&fit=crop&q=80",
  moda: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop&q=80",
  casa: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=300&h=300&fit=crop&q=80",
  beleza: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop&q=80",
  esportes: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=300&fit=crop&q=80",
  brinquedos: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=300&h=300&fit=crop&q=80",
  livros: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=300&fit=crop&q=80",
  games: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=300&h=300&fit=crop&q=80",
  automotivo: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=300&h=300&fit=crop&q=80",
  pets: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop&q=80",
  saude: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=300&h=300&fit=crop&q=80",
  alimentos: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=300&h=300&fit=crop&q=80",
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
        className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-1"
      >
        {displayCategories.map((cat) => {
          const IconComponent = categoryIcons[cat.slug] || Package;
          const imageUrl = categoryImages[cat.slug];
          return (
            <Link
              key={cat.id}
              href={`/categoria/${cat.slug}`}
              className="group shrink-0 relative w-[110px] sm:w-[130px] h-[130px] sm:h-[150px] rounded-xl overflow-hidden"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="130px"
                />
              ) : (
                <div className="absolute inset-0 bg-gray-200" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-3 sm:pb-4">
                <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2">
                  <IconComponent size={18} className="text-white" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-white text-center leading-tight drop-shadow-md px-2">
                  {cat.name}
                </span>
                {cat._count && cat._count.products > 0 && (
                  <span className="text-[10px] text-white/70 mt-0.5">
                    {cat._count.products} produtos
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
