"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, getPlatformInfo } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ExternalLink, ShoppingBag, TrendingDown, Clock } from "lucide-react";

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' fill='%23f5f5f5'%3E%3Crect width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%239ca3af'%3ESem imagem%3C/text%3E%3C/svg%3E";

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
  const platformInfo = getPlatformInfo(product.platform);
  const discount =
    product.discount ||
    (product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0);

  const hash = product.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const soldCount = (hash % 300) + 50;

  return (
    <div className="shrink-0 w-[150px] sm:w-[175px] lg:w-[195px] bg-white border border-gray-100 overflow-hidden group hover:border-gray-300 transition-colors flex flex-col">
      {/* Image */}
      <Link
        href={`/produto/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-white"
      >
        <Image
          src={product.image || PLACEHOLDER}
          alt={product.title}
          fill
          className="object-contain p-2.5 group-hover:scale-105 transition-transform duration-300"
          sizes="195px"
        />
        {discount > 0 && (
          <div className="absolute top-0 left-0 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 flex items-center gap-0.5">
            <TrendingDown size={8} />
            -{discount}%
          </div>
        )}
        <div
          className="absolute top-0 right-0 text-[7px] font-bold px-1.5 py-0.5 text-white uppercase tracking-wider"
          style={{ backgroundColor: platformInfo.color }}
        >
          {platformInfo.shortName}
        </div>
      </Link>

      {/* Info */}
      <div className="p-2.5 flex flex-col flex-1 border-t border-gray-50">
        <Link href={`/produto/${product.slug}`}>
          <h3 className="text-[10px] sm:text-[11px] font-medium text-gray-700 line-clamp-2 hover:text-orange-600 transition-colors leading-snug mb-1.5">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1 text-[8px] text-gray-400 mb-1.5">
          <ShoppingBag size={7} />
          <span>{soldCount}+ vendidos</span>
        </div>

        <div className="mt-auto">
          {product.originalPrice && product.originalPrice > product.price && (
            <p className="text-[9px] text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
          <p className="text-sm sm:text-base font-black text-gray-900 leading-none">
            {formatPrice(product.price)}
          </p>
          {discount > 0 && (
            <p className="text-[8px] font-bold text-green-700 mt-0.5">
              Economize {formatPrice((product.originalPrice || product.price) - product.price)}
            </p>
          )}

          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() => {
              fetch(`/api/products/${product.id}/click`, { method: "POST" });
            }}
            className="mt-1.5 w-full flex items-center justify-center gap-1 py-1.5 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-all hover:brightness-110"
            style={{ backgroundColor: platformInfo.color }}
          >
            <ExternalLink size={9} />
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
  titleColor = "bg-orange-500",
  borderColor = "border-gray-200",
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
    el.scrollBy({ left: direction === "left" ? -280 : 280, behavior: "smooth" });
    setTimeout(checkScroll, 400);
  };

  if (products.length === 0) return null;

  return (
    <div className={`bg-white border ${borderColor} overflow-hidden`}>
      {/* Header */}
      <div className={`${titleColor} px-4 py-2.5 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <h2 className="text-white font-bold text-sm">{title}</h2>
          <span className="text-white/60 text-[10px] flex items-center gap-0.5">
            <Clock size={9} />
            Oferta limitada
          </span>
        </div>
        <Link
          href={viewAllLink}
          className="text-white/70 hover:text-white text-[11px] font-medium transition-colors"
        >
          Ver todos &rsaquo;
        </Link>
      </div>

      {/* Carousel */}
      <div className="relative group/carousel">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white shadow border border-gray-200 p-1.5 hover:bg-gray-50 transition-all opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronLeft size={16} className="text-gray-600" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white shadow border border-gray-200 p-1.5 hover:bg-gray-50 transition-all opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronRight size={16} className="text-gray-600" />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-0 overflow-x-auto no-scrollbar"
        >
          {products.map((product) => (
            <CarouselCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
