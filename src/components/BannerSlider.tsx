"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BannerSliderProps {
  banners: {
    id: string;
    title: string;
    subtitle?: string | null;
    image: string;
    link?: string | null;
  }[];
}

export default function BannerSlider({ banners }: BannerSliderProps) {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [banners.length, nextSlide]);

  if (!banners.length) {
    return (
      <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 flex items-center justify-center rounded-2xl overflow-hidden">
        <div className="text-center text-white p-8">
          <h2 className="text-3xl sm:text-5xl font-bold mb-3">✨ Achados da Jeh</h2>
          <p className="text-lg sm:text-xl text-orange-100">Os melhores achados da internet com os melhores preços!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
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
            <div className="relative z-10 p-6 sm:p-10 max-w-lg">
              <h2 className="text-white text-2xl sm:text-4xl font-bold mb-2">
                {banner.title}
              </h2>
              {banner.subtitle && (
                <p className="text-orange-100 text-sm sm:text-lg">
                  {banner.subtitle}
                </p>
              )}
              {banner.link && (
                <a
                  href={banner.link}
                  className="inline-block mt-4 px-6 py-2.5 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors"
                >
                  Ver Ofertas →
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

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === current
                    ? "bg-orange-500 w-6"
                    : "bg-white/50 hover:bg-white/80"
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
