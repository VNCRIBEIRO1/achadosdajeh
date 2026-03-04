import Link from "next/link";

interface CategoryGridProps {
  categories: {
    id: string;
    name: string;
    slug: string;
    icon?: string | null;
    _count?: { products: number };
  }[];
}

const defaultIcons: Record<string, string> = {
  eletronicos: "📱",
  moda: "👗",
  casa: "🏠",
  beleza: "💄",
  esportes: "⚽",
  brinquedos: "🧸",
  livros: "📚",
  games: "🎮",
  automotivo: "🚗",
  pets: "🐾",
  saude: "💊",
  alimentos: "🍎",
};

export default function CategoryGrid({ categories }: CategoryGridProps) {
  const displayCategories = categories.length
    ? categories
    : [
        { id: "1", name: "Eletrônicos", slug: "eletronicos", icon: "📱" },
        { id: "2", name: "Moda", slug: "moda", icon: "👗" },
        { id: "3", name: "Casa", slug: "casa", icon: "🏠" },
        { id: "4", name: "Beleza", slug: "beleza", icon: "💄" },
        { id: "5", name: "Esportes", slug: "esportes", icon: "⚽" },
        { id: "6", name: "Brinquedos", slug: "brinquedos", icon: "🧸" },
      ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {displayCategories.map((cat) => (
        <Link
          key={cat.id}
          href={`/categoria/${cat.slug}`}
          className="group flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 hover:border-orange-200 transition-all hover:-translate-y-1"
        >
          <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">
            {cat.icon || defaultIcons[cat.slug] || "📦"}
          </span>
          <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">
            {cat.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
