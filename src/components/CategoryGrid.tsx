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

const categoryColors: Record<string, string> = {
  eletronicos: "from-blue-500 to-blue-600",
  moda: "from-pink-500 to-rose-500",
  casa: "from-amber-500 to-orange-500",
  beleza: "from-purple-500 to-violet-500",
  esportes: "from-green-500 to-emerald-500",
  brinquedos: "from-red-500 to-pink-500",
};

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
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {displayCategories.map((cat) => {
        const IconComponent = categoryIcons[cat.slug] || Package;
        const gradientClass = categoryColors[cat.slug] || "from-gray-500 to-gray-600";
        return (
          <Link
            key={cat.id}
            href={`/categoria/${cat.slug}`}
            className="group flex flex-col items-center gap-2.5 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 hover:border-orange-200 transition-all hover:-translate-y-1"
          >
            <div className={`bg-gradient-to-br ${gradientClass} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
              <IconComponent className="text-white" size={22} />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">
              {cat.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
