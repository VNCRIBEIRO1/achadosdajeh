"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice, getPlatformInfo } from "@/lib/utils";
import { ExternalLink, TrendingDown } from "lucide-react";

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' fill='%23f8f9fa'%3E%3Crect width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23adb5bd'%3ESem imagem%3C/text%3E%3C/svg%3E";

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
  const discount =
    product.discount ||
    (product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0);

  return (
    <div
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden card-hover flex flex-col animate-fade-in-up"
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      {/* Image */}
      <Link
        href={`/produto/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-gray-50"
      >
        <Image
          src={product.image || PLACEHOLDER}
          alt={product.title}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-[#DC3545] text-white text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5">
            <TrendingDown size={10} />
            -{discount}%
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1">
        {/* Platform tag */}
        <span
          className="self-start text-[11px] font-semibold px-2 py-0.5 rounded mb-2"
          style={{ backgroundColor: platformInfo.color, color: platformInfo.textColor }}
        >
          {platformInfo.shortName}
        </span>

        <Link href={`/produto/${product.slug}`}>
          <h3 className="font-heading text-[13px] sm:text-sm font-semibold text-[#212529] line-clamp-2 hover:text-[#FF5733] transition-colors leading-snug mb-3">
            {product.title}
          </h3>
        </Link>

        <div className="mt-auto">
          {/* Prices */}
          {product.originalPrice && product.originalPrice > product.price && (
            <p className="text-[11px] text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
          <p className="font-heading text-lg sm:text-xl font-bold text-[#212529] leading-none">
            {formatPrice(product.price)}
          </p>
          {discount > 0 && product.originalPrice && (
            <p className="text-[11px] font-semibold text-[#198754] mt-1">
              Economize{" "}
              {formatPrice(product.originalPrice - product.price)}
            </p>
          )}

          {/* CTA */}
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() => {
              fetch(`/api/products/${product.id}/click`, { method: "POST" });
            }}
            className="mt-3 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: platformInfo.color, color: platformInfo.textColor }}
          >
            <ExternalLink size={12} />
            Ver na {platformInfo.name}
          </a>
        </div>
      </div>
    </div>
  );
}
