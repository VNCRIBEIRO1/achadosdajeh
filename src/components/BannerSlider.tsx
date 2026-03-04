"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";
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
    title: "Ofertas selecionadas com até 70% off",
    subtitle: "Produtos incríveis das melhores lojas do Brasil",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1400&h=600&fit=crop&q=80",
    gradient: "from-black/60 via-black/40 to-transparent",
    link: "/ofertas",
    cta: "Explorar ofertas",
  },
  {
    id: "promo-2",
    title: "Moda com os melhores preços",
    subtitle: "Roupas, calçados e acessórios com curadoria especial",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400&h=600&fit=crop&q=80",
    gradient: "from-black/60 via-black/40 to-transparent",
    link: "/categoria/moda",
    cta: "Ver coleção",
  },
  {
    id: "promo-3",
    title: "Eletrônicos e gadgets",
    subtitle: "Smartphones, fones e acessórios com preço baixo",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1400&h=600&fit=crop&q=80",
    gradient: "from-black/60 via-black/40 to-transparent",
    link: "/categoria/eletronicos",
    cta: "Conferir",
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
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [totalSlides, nextSlide]);

  if (!hasRealBanners) {
    return (
      <div className="relative w-full overflow-hidden rounded-2xl">
        <div className="relative h-[200px] sm:h-[300px] md:h-[380px] lg:h-[420px]">
          {defaultSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === current ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="w-full h-full relative flex items-center">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
                  priority={index === 0}
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
                <div className="relative z-10 site-container">
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-[0.15em] mb-3">
                    Achados da Jeh
                  </p>
                  <h2 className="font-heading text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 leading-tight max-w-lg drop-shadow-md">
                    {slide.title}
                  </h2>
                  <p className="text-white/80 text-sm sm:text-base mb-6 max-w-md font-light drop-shadow-sm">
                    {slide.subtitle}
                  </p>
                  <Link
                    href={slide.link}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#212529] rounded-lg font-heading font-semibold text-sm hover:bg-gray-100 transition-colors shadow-lg"
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
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 rounded-full text-white transition-all z-20"
              aria-label="Anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 rounded-full text-white transition-all z-20"
              aria-label="Próximo"
            >
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {defaultSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? "bg-white w-6" : "bg-white/40 w-2"
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
    <div className="relative w-full h-[200px] sm:h-[300px] md:h-[380px] lg:h-[420px] overflow-hidden rounded-2xl">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="w-full h-full relative flex items-center">
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <div className="relative z-10 site-container">
              <h2 className="font-heading text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 max-w-lg drop-shadow-md">
                {banner.title}
              </h2>
              {banner.subtitle && (
                <p className="text-white/80 text-sm sm:text-base max-w-md font-light drop-shadow-sm">
                  {banner.subtitle}
                </p>
              )}
              {banner.link && (
                <a
                  href={banner.link}
                  className="inline-flex items-center gap-2 mt-5 px-6 py-3 bg-[#FF5733] text-white rounded-lg font-heading font-semibold text-sm hover:bg-[#E64D2E] transition-colors shadow-lg"
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
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 rounded-full text-white transition-all z-20"
            aria-label="Anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 rounded-full text-white transition-all z-20"
            aria-label="Próximo"
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "bg-white w-6" : "bg-white/40 w-2"
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
