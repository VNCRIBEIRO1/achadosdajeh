"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice, getPlatformInfo } from "@/lib/utils";
import { ExternalLink, TrendingDown, Heart } from "lucide-react";
import { useState } from "react";

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
  const [liked, setLiked] = useState(false);
  const discount = product.discount || 
    (product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0);

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden card-hover border border-gray-100/80 flex flex-col animate-fade-in-up"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {/* Image container */}
      <Link href={`/produto/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <Image
          src={product.image || PLACEHOLDER}
          alt={product.title}
          fill
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-500 ease-out"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
            <TrendingDown size={11} />
            -{discount}%
          </div>
        )}

        {/* Platform tag */}
        <div
          className="absolute top-2.5 right-2.5 text-[9px] font-bold px-2 py-1 rounded-lg text-white uppercase tracking-wider shadow-sm"
          style={{ backgroundColor: platformInfo.color }}
        >
          {platformInfo.shortName}
        </div>

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setLiked(!liked);
          }}
          className={`absolute bottom-2.5 right-2.5 p-2 rounded-full transition-all duration-200 ${
            liked
              ? "bg-red-50 text-red-500 scale-110"
              : "bg-white/80 text-gray-400 opacity-0 group-hover:opacity-100"
          } shadow-sm hover:scale-110`}
        >
          <Heart size={14} fill={liked ? "currentColor" : "none"} />
        </button>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Content */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1">
        <Link href={`/produto/${product.slug}`}>
          <h3 className="text-[13px] sm:text-sm font-medium text-gray-800 line-clamp-2 hover:text-orange-600 transition-colors leading-snug mb-3">
            {product.title}
          </h3>
        </Link>

        <div className="mt-auto space-y-2.5">
          {/* Price section */}
          <div>
            {product.originalPrice && product.originalPrice > product.price && (
              <p className="text-[11px] text-gray-400 line-through leading-none">
                {formatPrice(product.originalPrice)}
              </p>
            )}
            <div className="flex items-baseline gap-1.5">
              <p className="text-lg sm:text-xl font-extrabold text-gray-900">
                {formatPrice(product.price)}
              </p>
              {discount > 0 && (
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-md">
                  -{discount}%
                </span>
              )}
            </div>
          </div>

          {/* CTA */}
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() => {
              fetch(`/api/products/${product.id}/click`, { method: "POST" });
            }}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-white text-xs sm:text-sm font-semibold transition-all duration-200 hover:brightness-110 hover:shadow-md active:scale-[0.97]"
            style={{ backgroundColor: platformInfo.color }}
          >
            <ExternalLink size={13} />
            Ver na {platformInfo.name}
          </a>
        </div>
      </div>
    </div>
  );
}
