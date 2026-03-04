"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FavoritesPage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Meus Favoritos
        </h1>
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-pink-50 flex items-center justify-center">
            <svg className="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </div>
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
