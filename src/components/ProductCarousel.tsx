"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, getPlatformInfo } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ExternalLink, Heart, Star } from "lucide-react";

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' fill='%23f3f4f6'%3E%3Crect width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%239ca3af'%3ESem imagem%3C/text%3E%3C/svg%3E";

interface Product {
  id: string;
  title: string;
  slug: string;
  image: string;
  price: number;
  originalPrice?: number | null;
  discount?: number | null;
  platform: string;
  affiliateLink: string;
}

interface ProductCarouselProps {
  products: Product[];
  title: string;
  titleColor?: string;
  borderColor?: string;
  viewAllLink?: string;
}

function CarouselCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);
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
    <div className="shrink-0 w-[160px] sm:w-[190px] lg:w-[210px] bg-white rounded-2xl border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Image */}
      <Link
        href={`/produto/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-gray-50"
      >
        <Image
          src={product.image || PLACEHOLDER}
          alt={product.title}
          fill
          className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
          sizes="210px"
        />
        {/* Platform badge */}
        <div
          className="absolute top-2 right-2 text-[8px] font-bold px-2 py-0.5 rounded-md text-white uppercase tracking-wider"
          style={{ backgroundColor: platformInfo.color }}
        >
          {platformInfo.shortName}
        </div>
        {/* Favorite */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setLiked(!liked);
          }}
          className={`absolute top-2 left-2 p-1.5 rounded-full transition-all ${
            liked
              ? "bg-red-50 text-red-500"
              : "bg-white/70 text-gray-300 opacity-0 group-hover:opacity-100"
          } hover:scale-110`}
        >
          <Heart size={12} fill={liked ? "currentColor" : "none"} />
        </button>
      </Link>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <Link href={`/produto/${product.slug}`}>
          <h3 className="text-xs sm:text-[13px] font-medium text-gray-700 line-clamp-2 hover:text-orange-600 transition-colors leading-snug mb-2">
            {product.title}
          </h3>
        </Link>

        <div className="mt-auto">
          {/* Rating (decorative) */}
          <div className="flex items-center gap-0.5 mb-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={10}
                className={s <= 4 ? "text-amber-400" : "text-gray-200"}
                fill={s <= 4 ? "currentColor" : "none"}
              />
            ))}
          </div>

          {/* Price */}
          {product.originalPrice && product.originalPrice > product.price && (
            <p className="text-[10px] text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
          <div className="flex items-baseline gap-1.5">
            <p className="text-base sm:text-lg font-extrabold text-gray-900">
              {formatPrice(product.price)}
            </p>
            {discount > 0 && (
              <span className="text-[10px] font-bold text-red-500">
                -{discount}%
              </span>
            )}
          </div>

          {/* CTA */}
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() => {
              fetch(`/api/products/${product.id}/click`, { method: "POST" });
            }}
            className="mt-2 w-full flex items-center justify-center gap-1 py-2 px-2 rounded-lg text-white text-[11px] sm:text-xs font-semibold transition-all hover:brightness-110 hover:shadow-md"
            style={{ backgroundColor: platformInfo.color }}
          >
            <ExternalLink size={11} />
            Ver na {platformInfo.name}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProductCarousel({
  products,
  title,
  titleColor = "bg-gradient-to-r from-orange-500 to-orange-600",
  borderColor = "border-orange-200",
  viewAllLink = "/ofertas",
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = direction === "left" ? -300 : 300;
    el.scrollBy({ left: amount, behavior: "smooth" });
    setTimeout(checkScroll, 400);
  };

  if (products.length === 0) return null;

  return (
    <div
      className={`bg-white rounded-2xl border ${borderColor} overflow-hidden shadow-sm`}
    >
      {/* Header with colored title */}
      <div
        className={`${titleColor} px-5 py-3 flex items-center justify-between`}
      >
        <h2 className="text-white font-bold text-sm sm:text-base">{title}</h2>
        <Link
          href={viewAllLink}
          className="text-white/80 hover:text-white text-xs font-medium transition-colors"
        >
          Ver todos &rsaquo;
        </Link>
      </div>

      {/* Carousel */}
      <div className="relative group/carousel">
        {/* Left arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white/95 shadow-lg border border-gray-200 p-2 rounded-full hover:bg-white transition-all opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronLeft size={18} className="text-gray-600" />
          </button>
        )}

        {/* Right arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white/95 shadow-lg border border-gray-200 p-2 rounded-full hover:bg-white transition-all opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronRight size={18} className="text-gray-600" />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-3 overflow-x-auto no-scrollbar px-4 py-4"
        >
          {products.map((product) => (
            <CarouselCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
