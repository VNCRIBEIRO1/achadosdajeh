import ProductCard from "./ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProductGridProps {
  products: {
    id: string;
    title: string;
    slug: string;
    image: string;
    price: number;
    originalPrice?: number | null;
    discount?: number | null;
    platform: string;
    affiliateLink: string;
  }[];
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
}

export default function ProductGrid({
  products,
  title,
  subtitle,
  showViewAll = false,
  viewAllLink = "/ofertas",
}: ProductGridProps) {
  return (
    <section>
      {title && (
        <div className="flex items-end justify-between mb-5 sm:mb-6">
          <div>
            <h2 className="font-heading text-base sm:text-lg font-bold text-[#212529]">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          {showViewAll && (
            <Link
              href={viewAllLink}
              className="text-xs font-semibold text-[#FF5733] hover:text-[#E64D2E] transition-colors flex items-center gap-1 shrink-0"
            >
              Ver todos <ArrowRight size={12} />
            </Link>
          )}
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
            <svg
              className="w-7 h-7 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <p className="font-heading font-semibold text-gray-700 text-sm">
            Nenhum produto encontrado
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Em breve teremos novidades!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
