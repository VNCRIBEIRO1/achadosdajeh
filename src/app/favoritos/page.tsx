"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FavoritesPage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          ❤️ Meus Favoritos
        </h1>
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
          <p className="text-4xl mb-3">💝</p>
          <p className="text-gray-500 font-medium">
            Você ainda não tem favoritos
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Navegue pelos produtos e salve os seus preferidos!
          </p>
          <a
            href="/"
            className="inline-block mt-4 px-6 py-2.5 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors"
          >
            Explorar Produtos
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
