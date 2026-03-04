"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Heart, ChevronRight, ArrowRight } from "lucide-react";

export default function FavoritesPage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-orange-500 transition-colors">Início</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700 font-medium">Favoritos</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6">
          Meus Favoritos
        </h1>

        <div className="bg-white rounded-3xl p-10 sm:p-16 text-center shadow-sm border border-gray-100">
          <div className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-pink-50 to-red-50 flex items-center justify-center">
            <Heart className="text-pink-400" size={32} />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">
            Nenhum favorito ainda
          </h2>
          <p className="text-sm text-gray-400 max-w-sm mx-auto">
            Navegue pelos produtos e toque no coração para salvar os seus preferidos!
          </p>
          <Link
            href="/ofertas"
            className="inline-flex items-center gap-2 mt-6 px-7 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all hover:scale-105"
          >
            Explorar Ofertas
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
