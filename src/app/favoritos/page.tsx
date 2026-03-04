"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Heart, ChevronRight, ArrowRight } from "lucide-react";

export default function FavoritesPage() {
  return (
    <>
      <Header />
      <main className="site-container py-6 sm:py-8">
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-5">
          <Link href="/" className="hover:text-orange-500 transition-colors">
            Início
          </Link>
          <ChevronRight size={12} />
          <span className="text-gray-700 font-medium">Favoritos</span>
        </nav>

        <h1 className="text-lg sm:text-2xl font-black text-gray-900 mb-5">
          Meus Favoritos
        </h1>

        <div className="bg-white border border-gray-200 p-10 sm:p-14 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 flex items-center justify-center">
            <Heart className="text-gray-400" size={28} />
          </div>
          <h2 className="text-base font-bold text-gray-900 mb-1">
            Nenhum favorito ainda
          </h2>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Navegue pelos produtos e salve os seus preferidos
          </p>
          <Link
            href="/ofertas"
            className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition-colors"
          >
            Explorar Ofertas
            <ArrowRight size={14} />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
