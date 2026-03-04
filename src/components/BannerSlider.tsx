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
    gradient: "from-orange-600 via-orange-500 to-amber-500",
    link: "/ofertas",
    cta: "Ver ofertas",
  },
  {
    id: "promo-2",
    title: "Moda com os melhores preços",
    subtitle: "Roupas, calçados e acessórios das marcas que você ama",
    gradient: "from-gray-900 via-gray-800 to-gray-700",
    link: "/categoria/moda",
    cta: "Explorar moda",
  },
  {
    id: "promo-3",
    title: "Eletrônicos e gadgets",
    subtitle: "Smartphones, fones, smartwatches e muito mais com preço baixo",
    gradient: "from-blue-900 via-blue-800 to-indigo-800",
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
      <div className="relative w-full overflow-hidden">
        <div className="relative h-[180px] sm:h-[280px] md:h-[360px] lg:h-[400px]">
          {defaultSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className={`w-full h-full bg-gradient-to-br ${slide.gradient} flex items-center`}>
                <div className="absolute inset-0 opacity-[0.07]">
                  <div className="absolute top-8 right-16 w-64 h-64 bg-white rounded-full blur-3xl" />
                  <div className="absolute bottom-4 left-12 w-40 h-40 bg-white rounded-full blur-2xl" />
                </div>
                <div className="relative z-10 site-container">
                  <p className="text-white/60 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-2">
                    Achados da Jeh
                  </p>
                  <h2 className="text-white text-xl sm:text-3xl lg:text-4xl font-black mb-2 leading-tight max-w-lg">
                    {slide.title}
                  </h2>
                  <p className="text-white/70 text-xs sm:text-sm mb-5 max-w-md">
                    {slide.subtitle}
                  </p>
                  <Link
                    href={slide.link}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 font-bold text-sm hover:bg-gray-100 transition-colors"
                  >
                    {slide.cta}
                    <ArrowRight size={14} />
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
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 p-1.5 text-white transition-colors z-20"
              aria-label="Anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 p-1.5 text-white transition-colors z-20"
              aria-label="Próximo"
            >
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
              {defaultSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1 transition-all ${
                    i === current ? "bg-white w-6" : "bg-white/40 w-1.5"
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
    <div className="relative w-full h-[180px] sm:h-[280px] md:h-[360px] lg:h-[400px] overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center flex items-center"
            style={{ backgroundImage: `url(${banner.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="relative z-10 site-container">
              <h2 className="text-white text-xl sm:text-3xl lg:text-4xl font-black mb-2 max-w-lg">
                {banner.title}
              </h2>
              {banner.subtitle && (
                <p className="text-white/80 text-sm sm:text-base max-w-md">
                  {banner.subtitle}
                </p>
              )}
              {banner.link && (
                <a
                  href={banner.link}
                  className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition-colors"
                >
                  Ver ofertas
                  <ArrowRight size={14} />
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
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 p-1.5 text-white transition-colors z-20"
            aria-label="Anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 p-1.5 text-white transition-colors z-20"
            aria-label="Próximo"
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 transition-all ${
                  i === current ? "bg-white w-6" : "bg-white/40 w-1.5"
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
