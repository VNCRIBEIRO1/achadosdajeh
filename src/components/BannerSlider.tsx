"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

interface BannerSliderProps {
  banners: {
    id: string;
    title: string;
    subtitle?: string | null;
    image: string;
    link?: string | null;
  }[];
}

const defaultSlides = [
  {
    id: "promo-1",
    title: "Ofertas imperdíveis toda semana",
    subtitle: "Produtos selecionados com até 70% de desconto nas melhores lojas",
    gradient: "from-orange-600 via-orange-500 to-amber-400",
    link: "/ofertas",
    cta: "Ver ofertas",
  },
  {
    id: "promo-2",
    title: "Moda com os melhores preços",
    subtitle: "Roupas, calçados e acessórios das marcas que você ama",
    gradient: "from-pink-600 via-rose-500 to-pink-400",
    link: "/categoria/moda",
    cta: "Explorar moda",
  },
  {
    id: "promo-3",
    title: "Eletrônicos e gadgets",
    subtitle: "Smartphones, fones, smartwatches e muito mais com preço baixo",
    gradient: "from-violet-700 via-purple-600 to-indigo-500",
    link: "/categoria/eletronicos",
    cta: "Ver eletrônicos",
  },
];

export default function BannerSlider({ banners }: BannerSliderProps) {
  const [current, setCurrent] = useState(0);
  const hasRealBanners = banners.length > 0;
  const totalSlides = hasRealBanners ? banners.length : defaultSlides.length;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (totalSlides <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [totalSlides, nextSlide]);

  if (!hasRealBanners) {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden">
        <div className="relative h-[180px] sm:h-[280px] md:h-[380px]">
          {defaultSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === current
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            >
              <div className={`w-full h-full bg-gradient-to-br ${slide.gradient} flex items-center`}>
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
                  <div className="absolute bottom-5 left-20 w-40 h-40 bg-white rounded-full blur-2xl" />
                </div>
                <div className="relative z-10 px-8 sm:px-14 max-w-2xl">
                  <h2 className="text-white text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-white/80 text-sm sm:text-lg mb-6 max-w-md">
                    {slide.subtitle}
                  </p>
                  <Link
                    href={slide.link}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-semibold text-sm sm:text-base hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    {slide.cta}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {defaultSlides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 p-2 rounded-full transition-colors z-20"
              aria-label="Anterior"
            >
              <ChevronLeft className="text-white" size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 p-2 rounded-full transition-colors z-20"
              aria-label="Próximo"
            >
              <ChevronRight className="text-white" size={20} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {defaultSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current
                      ? "bg-white w-8"
                      : "bg-white/40 w-2 hover:bg-white/60"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full h-[180px] sm:h-[280px] md:h-[380px] rounded-2xl overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === current
              ? "opacity-100 translate-x-0"
              : index < current
              ? "opacity-0 -translate-x-full"
              : "opacity-0 translate-x-full"
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center flex items-center"
            style={{ backgroundImage: `url(${banner.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="relative z-10 px-8 sm:px-14 max-w-lg">
              <h2 className="text-white text-2xl sm:text-4xl font-bold mb-2">
                {banner.title}
              </h2>
              {banner.subtitle && (
                <p className="text-white/80 text-sm sm:text-lg">
                  {banner.subtitle}
                </p>
              )}
              {banner.link && (
                <a
                  href={banner.link}
                  className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors"
                >
                  Ver ofertas
                  <ArrowRight size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}

      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 p-2 rounded-full transition-colors z-20"
            aria-label="Anterior"
          >
            <ChevronLeft className="text-white" size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 p-2 rounded-full transition-colors z-20"
            aria-label="Próximo"
          >
            <ChevronRight className="text-white" size={20} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current
                    ? "bg-white w-8"
                    : "bg-white/40 w-2 hover:bg-white/60"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
