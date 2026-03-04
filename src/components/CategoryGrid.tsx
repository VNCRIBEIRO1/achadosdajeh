import Link from "next/link";
import { Smartphone, ShirtIcon, Home, Sparkles, Dumbbell, ToyBrick, BookOpen, Gamepad2, Car, PawPrint, Pill, Apple, Package } from "lucide-react";

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

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  eletronicos: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100 hover:border-blue-300" },
  moda: { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-100 hover:border-pink-300" },
  casa: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100 hover:border-amber-300" },
  beleza: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100 hover:border-purple-300" },
  esportes: { bg: "bg-green-50", text: "text-green-600", border: "border-green-100 hover:border-green-300" },
  brinquedos: { bg: "bg-red-50", text: "text-red-600", border: "border-red-100 hover:border-red-300" },
};

const defaultColors = { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-100 hover:border-gray-300" };

export default function CategoryGrid({ categories }: CategoryGridProps) {
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

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
      {displayCategories.map((cat, i) => {
        const IconComponent = categoryIcons[cat.slug] || Package;
        const colors = categoryColors[cat.slug] || defaultColors;
        return (
          <Link
            key={cat.id}
            href={`/categoria/${cat.slug}`}
            className={`group flex flex-col items-center gap-3 p-4 sm:p-5 bg-white rounded-2xl border ${colors.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg card-hover animate-fade-in-up`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className={`${colors.bg} p-3.5 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
              <IconComponent className={colors.text} size={24} />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-gray-700 text-center leading-tight">
              {cat.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
