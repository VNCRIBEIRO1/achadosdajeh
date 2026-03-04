"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X, ShoppingBag, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/busca?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const categories = [
    { name: "Eletrônicos", slug: "eletronicos", icon: "📱" },
    { name: "Moda", slug: "moda", icon: "👗" },
    { name: "Casa", slug: "casa", icon: "🏠" },
    { name: "Beleza", slug: "beleza", icon: "💄" },
    { name: "Esportes", slug: "esportes", icon: "⚽" },
    { name: "Brinquedos", slug: "brinquedos", icon: "🧸" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-center text-xs sm:text-sm py-1.5 px-4 font-medium">
        ✨ Ofertas selecionadas com carinho para você! Acesse e economize ✨
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-gray-600 hover:text-orange-500 transition-colors"
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-full p-2">
            <ShoppingBag className="text-white" size={24} />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Achados da Jeh
            </h1>
            <p className="text-[10px] text-gray-400 -mt-1">Os melhores achados da internet</p>
          </div>
        </Link>

        {/* Desktop Search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar produtos, marcas..."
              className="w-full pl-4 pr-12 py-2.5 rounded-full border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors text-sm"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition-colors"
            >
              <Search size={16} />
            </button>
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden text-gray-600 hover:text-orange-500 transition-colors"
            aria-label="Buscar"
          >
            <Search size={22} />
          </button>
          <Link
            href="/favoritos"
            className="text-gray-600 hover:text-orange-500 transition-colors relative"
            aria-label="Favoritos"
          >
            <Heart size={22} />
          </Link>
        </div>
      </div>

      {/* Mobile Search */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3 animate-slide-down">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="O que você está procurando?"
                className="w-full pl-4 pr-12 py-2.5 rounded-full border-2 border-gray-200 focus:border-orange-400 focus:outline-none text-sm"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full"
              >
                <Search size={16} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="hidden lg:block border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-1 py-2">
            <li>
              <Link
                href="/"
                className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-all"
              >
                🏠 Início
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/categoria/${cat.slug}`}
                  className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-all"
                >
                  {cat.icon} {cat.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/ofertas"
                className="px-3 py-1.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:shadow-md transition-all"
              >
                🔥 Ofertas
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white animate-slide-down">
          <ul className="py-2 px-4 space-y-1">
            <li>
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium"
              >
                🏠 Início
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/categoria/${cat.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium"
                >
                  {cat.icon} {cat.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/ofertas"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-white bg-gradient-to-r from-orange-500 to-pink-500 font-semibold text-center"
              >
                🔥 Ofertas do Dia
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
