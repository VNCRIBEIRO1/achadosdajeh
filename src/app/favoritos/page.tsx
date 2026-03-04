"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Heart, ChevronRight, ArrowRight } from "lucide-react";

export default function FavoritesPage() {
  return (
    <>
      <Header />
      <main>
        <div className="bg-white border-b border-gray-100">
          <div className="site-container py-6 sm:py-8">
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
              <Link href="/" className="hover:text-[#FF5733] transition-colors">
                Início
              </Link>
              <ChevronRight size={12} />
              <span className="text-[#212529] font-medium">Favoritos</span>
            </nav>

            <h1 className="font-heading text-xl sm:text-2xl font-bold text-[#212529]">
              Meus Favoritos
            </h1>
          </div>
        </div>

        <div className="site-container py-8 sm:py-12">
          <div className="bg-white rounded-xl border border-gray-100 p-12 sm:p-16 text-center max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-5 bg-gray-50 rounded-full flex items-center justify-center">
              <Heart className="text-gray-300" size={28} />
            </div>
            <h2 className="font-heading text-base font-semibold text-[#212529] mb-2">
              Nenhum favorito ainda
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Navegue pelos produtos e salve os seus preferidos para acessar depois.
            </p>
            <Link
              href="/ofertas"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF5733] text-white rounded-lg font-heading font-semibold text-sm hover:bg-[#E64D2E] transition-colors"
            >
              Explorar ofertas
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
