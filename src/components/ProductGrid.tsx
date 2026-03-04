import ProductCard from "./ProductCard";

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
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          {showViewAll && (
            <a
              href={viewAllLink}
              className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors whitespace-nowrap"
            >
              Ver todos →
            </a>
          )}
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <p className="text-gray-500 font-medium">
            Nenhum produto encontrado
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Em breve teremos novidades!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
