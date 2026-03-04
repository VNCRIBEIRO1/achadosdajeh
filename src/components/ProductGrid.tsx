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
        <div className="flex items-end justify-between mb-4 sm:mb-5">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 section-line">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-2">{subtitle}</p>
            )}
          </div>
          {showViewAll && (
            <Link
              href={viewAllLink}
              className="text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors flex items-center gap-1 shrink-0"
            >
              Ver todos <ArrowRight size={12} />
            </Link>
          )}
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-14 bg-white border border-gray-200">
          <div className="w-14 h-14 mx-auto mb-3 bg-gray-100 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <p className="text-gray-600 font-semibold text-sm">
            Nenhum produto encontrado
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Em breve teremos novidades!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[1px] sm:gap-0.5 bg-gray-100">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
