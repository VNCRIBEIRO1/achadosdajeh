"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice, getPlatformInfo } from "@/lib/utils";
import { ExternalLink, TrendingDown } from "lucide-react";

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' fill='%23f3f4f6'%3E%3Crect width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%239ca3af'%3ESem imagem%3C/text%3E%3C/svg%3E";

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    slug: string;
    image: string;
    price: number;
    originalPrice?: number | null;
    discount?: number | null;
    platform: string;
    affiliateLink: string;
  };
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const platformInfo = getPlatformInfo(product.platform);
  const discount = product.discount || 
    (product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0);

  return (
    <div
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 animate-fade-in-up flex flex-col"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Image */}
      <Link href={`/produto/${product.slug}`} className="relative block aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.image || PLACEHOLDER}
          alt={product.title}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <TrendingDown size={12} />
            -{discount}%
          </div>
        )}
        <div
          className="absolute top-2 right-2 text-[10px] font-bold px-2 py-1 rounded-full text-white uppercase tracking-wide"
          style={{ backgroundColor: platformInfo.color }}
        >
          {platformInfo.shortName}
        </div>
      </Link>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <Link href={`/produto/${product.slug}`}>
          <h3 className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2 hover:text-orange-600 transition-colors mb-2">
            {product.title}
          </h3>
        </Link>

        <div className="mt-auto">
          {product.originalPrice && product.originalPrice > product.price && (
            <p className="text-xs text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
          <p className="text-lg sm:text-xl font-bold text-orange-600">
            {formatPrice(product.price)}
          </p>

          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() => {
              fetch(`/api/products/${product.id}/click`, { method: "POST" });
            }}
            className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-white text-sm font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-95"
            style={{ backgroundColor: platformInfo.color }}
          >
            <ExternalLink size={14} />
            Ver na {platformInfo.name}
          </a>
        </div>
      </div>
    </div>
  );
}
