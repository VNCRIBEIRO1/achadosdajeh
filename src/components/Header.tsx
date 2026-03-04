"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Menu, X, Heart, ChevronRight, Flame, Tag } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/busca?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const categories = [
    { name: "Eletrônicos", slug: "eletronicos" },
    { name: "Moda", slug: "moda" },
    { name: "Casa", slug: "casa" },
    { name: "Beleza", slug: "beleza" },
    { name: "Esportes", slug: "esportes" },
    { name: "Brinquedos", slug: "brinquedos" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "shadow-lg" : "shadow-sm"
        }`}
      >
        {/* Announcement bar */}
        <div className="bg-gray-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-center gap-2 text-xs sm:text-sm">
            <Flame size={14} className="text-orange-400 shrink-0" />
            <span className="font-medium truncate">
              Frete grátis acima de R$79 em produtos selecionados
            </span>
            <span className="hidden sm:inline text-gray-400">|</span>
            <span className="hidden sm:inline text-gray-300">
              Ofertas atualizadas diariamente
            </span>
          </div>
        </div>

        {/* Main header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 sm:gap-5">
            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-white/90 hover:text-white transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-gradient font-black text-lg sm:text-xl">A</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-white leading-tight">
                  Achados da Jeh
                </h1>
                <p className="text-[10px] text-orange-100 -mt-0.5 tracking-wide">
                  OS MELHORES ACHADOS DA INTERNET
                </p>
              </div>
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar produtos, marcas, categorias..."
                  className="w-full pl-4 pr-12 py-2.5 sm:py-3 rounded-xl bg-white text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-inner"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition-colors"
                >
                  <Search size={16} />
                </button>
              </div>
            </form>

            {/* Desktop actions */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/favoritos"
                className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors text-sm font-medium"
              >
                <Heart size={20} />
                <span className="hidden xl:inline">Favoritos</span>
              </Link>
              <Link
                href="/ofertas"
                className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
              >
                <Tag size={16} />
                Ofertas
              </Link>
            </div>
          </div>
        </div>

        {/* Category navigation — desktop */}
        <nav className="hidden lg:block bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <ul className="flex items-center gap-0.5 -mb-px">
              <li>
                <Link
                  href="/"
                  className={`inline-flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    pathname === "/"
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-600 hover:text-orange-600 hover:border-orange-200"
                  }`}
                >
                  Início
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categoria/${cat.slug}`}
                    className={`inline-flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      pathname === `/categoria/${cat.slug}`
                        ? "border-orange-500 text-orange-600"
                        : "border-transparent text-gray-600 hover:text-orange-600 hover:border-orange-200"
                    }`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li className="ml-auto">
                <Link
                  href="/ofertas"
                  className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-semibold text-red-500 hover:text-red-600 border-b-2 border-transparent hover:border-red-500 transition-colors"
                >
                  <Flame size={15} />
                  Ofertas do Dia
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Mobile menu overlay */}
        {menuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMenuOpen(false)}>
            <div className="absolute inset-0 bg-black/50 animate-fade-in" />
            <div
              className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl animate-slide-down overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Menu header */}
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Menu</h2>
                  <button onClick={() => setMenuOpen(false)} aria-label="Fechar">
                    <X size={22} />
                  </button>
                </div>
                <p className="text-orange-100 text-sm">
                  Encontre os melhores achados
                </p>
              </div>

              {/* Menu links */}
              <div className="py-2">
                <Link
                  href="/"
                  className="flex items-center justify-between px-6 py-3.5 text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium transition-colors"
                >
                  Início
                  <ChevronRight size={16} className="text-gray-300" />
                </Link>

                <div className="px-6 py-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Categorias
                  </p>
                </div>

                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categoria/${cat.slug}`}
                    className="flex items-center justify-between px-6 py-3 text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    {cat.name}
                    <ChevronRight size={16} className="text-gray-300" />
                  </Link>
                ))}

                <div className="border-t border-gray-100 mt-2 pt-2">
                  <Link
                    href="/ofertas"
                    className="flex items-center gap-2 px-6 py-3.5 text-red-500 font-semibold hover:bg-red-50 transition-colors"
                  >
                    <Flame size={18} />
                    Ofertas do Dia
                  </Link>
                  <Link
                    href="/favoritos"
                    className="flex items-center gap-2 px-6 py-3.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    <Heart size={18} />
                    Meus Favoritos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
