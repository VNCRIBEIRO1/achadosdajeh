"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, getPlatformInfo } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ExternalLink, TrendingDown, ArrowRight } from "lucide-react";

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' fill='%23f8f9fa'%3E%3Crect width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23adb5bd'%3ESem imagem%3C/text%3E%3C/svg%3E";

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

  return (
    <div className="shrink-0 w-[160px] sm:w-[185px] lg:w-[200px] bg-white rounded-xl border border-gray-100 overflow-hidden group card-hover flex flex-col">
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
          sizes="200px"
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-[#DC3545] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
            <TrendingDown size={9} />
            -{discount}%
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <span
          className="self-start text-[10px] font-semibold px-1.5 py-0.5 rounded mb-1.5"
          style={{ backgroundColor: platformInfo.color, color: platformInfo.textColor }}
        >
          {platformInfo.shortName}
        </span>

        <Link href={`/produto/${product.slug}`}>
          <h3 className="font-heading text-xs font-semibold text-[#212529] line-clamp-2 hover:text-[#FF5733] transition-colors leading-snug mb-2">
            {product.title}
          </h3>
        </Link>

        <div className="mt-auto">
          {product.originalPrice && product.originalPrice > product.price && (
            <p className="text-[10px] text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
          <p className="font-heading text-sm sm:text-base font-bold text-[#212529] leading-none">
            {formatPrice(product.price)}
          </p>

          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() => {
              fetch(`/api/products/${product.id}/click`, { method: "POST" });
            }}
            className="mt-2 w-full flex items-center justify-center gap-1 py-2 rounded-lg text-[11px] font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: platformInfo.color, color: platformInfo.textColor }}
          >
            <ExternalLink size={10} />
            Ver oferta
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProductCarousel({
  products,
  title,
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
    <section>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-base sm:text-lg font-bold text-[#212529]">
          {title}
        </h2>
        <Link
          href={viewAllLink}
          className="text-xs font-semibold text-[#FF5733] hover:text-[#E64D2E] transition-colors flex items-center gap-1"
        >
          Ver todos <ArrowRight size={12} />
        </Link>
      </div>

      {/* Carousel */}
      <div className="relative group/carousel">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md border border-gray-100 p-2 rounded-full hover:bg-gray-50 transition-all opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronLeft size={16} className="text-gray-600" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md border border-gray-100 p-2 rounded-full hover:bg-gray-50 transition-all opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronRight size={16} className="text-gray-600" />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar"
        >
          {products.map((product) => (
            <CarouselCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
