"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Menu, X, Heart, ChevronRight, Zap, Tag, ShieldCheck } from "lucide-react";
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
        className={`sticky top-0 z-50 transition-shadow duration-200 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        {/* Urgency strip */}
        <div className="bg-gray-900 text-white overflow-hidden">
          <div className="flex items-center justify-center gap-2 py-1.5 text-[11px] sm:text-xs font-semibold tracking-wide">
            <Zap size={12} className="text-orange-400 animate-pulse-urgent" />
            <span className="uppercase">
              Ofertas com até 70% OFF
            </span>
            <span className="text-gray-500 hidden sm:inline">|</span>
            <span className="hidden sm:inline text-gray-400 font-normal">
              Atualizado diariamente
            </span>
            <ShieldCheck size={11} className="text-green-400 hidden sm:inline" />
          </div>
        </div>

        {/* Main header */}
        <div className="bg-orange-500">
          <div className="site-container py-2.5 flex items-center gap-3 sm:gap-4">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-white/90 hover:text-white"
              aria-label="Menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white flex items-center justify-center">
                <span className="text-gradient font-black text-base sm:text-lg">A</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm font-bold text-white leading-none">
                  Achados da Jeh
                </h1>
                <p className="text-[9px] text-orange-200 tracking-widest uppercase mt-0.5">
                  Melhores ofertas
                </p>
              </div>
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar produtos, marcas..."
                  className="w-full pl-3 pr-10 py-2 sm:py-2.5 bg-white text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-3 bg-orange-600 hover:bg-orange-700 text-white transition-colors"
                >
                  <Search size={16} />
                </button>
              </div>
            </form>

            {/* Desktop actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/favoritos"
                className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors text-sm"
              >
                <Heart size={18} />
                <span>Favoritos</span>
              </Link>
              <Link
                href="/ofertas"
                className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white px-3.5 py-1.5 text-sm font-semibold transition-colors"
              >
                <Tag size={14} />
                Ofertas
              </Link>
            </div>
          </div>
        </div>

        {/* Category nav — desktop */}
        <nav className="hidden lg:block bg-white border-b border-gray-200">
          <div className="site-container">
            <ul className="flex items-center">
              <li>
                <Link
                  href="/"
                  className={`inline-flex items-center px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                    pathname === "/"
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-600 hover:text-orange-600 hover:border-orange-300"
                  }`}
                >
                  Início
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categoria/${cat.slug}`}
                    className={`inline-flex items-center px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                      pathname === `/categoria/${cat.slug}`
                        ? "border-orange-500 text-orange-600"
                        : "border-transparent text-gray-600 hover:text-orange-600 hover:border-orange-300"
                    }`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li className="ml-auto">
                <Link
                  href="/ofertas"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-red-600 hover:text-red-700 border-b-2 border-transparent hover:border-red-500 transition-colors"
                >
                  <Zap size={13} />
                  Ofertas do Dia
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMenuOpen(false)}>
            <div className="absolute inset-0 bg-black/50 animate-fade-in" />
            <div
              className="absolute left-0 top-0 bottom-0 w-72 max-w-[80vw] bg-white shadow-2xl animate-slide-down overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-orange-500 p-5 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-base font-bold">Menu</h2>
                  <button onClick={() => setMenuOpen(false)} aria-label="Fechar">
                    <X size={20} />
                  </button>
                </div>
                <p className="text-orange-200 text-xs">Os melhores achados</p>
              </div>

              <div className="py-1">
                <Link
                  href="/"
                  className="flex items-center justify-between px-5 py-3 text-gray-700 hover:bg-gray-50 font-medium text-sm"
                >
                  Início
                  <ChevronRight size={14} className="text-gray-300" />
                </Link>

                <div className="px-5 py-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Categorias
                  </p>
                </div>

                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categoria/${cat.slug}`}
                    className="flex items-center justify-between px-5 py-2.5 text-gray-600 hover:bg-gray-50 text-sm"
                  >
                    {cat.name}
                    <ChevronRight size={14} className="text-gray-300" />
                  </Link>
                ))}

                <div className="border-t border-gray-100 mt-2 pt-1">
                  <Link
                    href="/ofertas"
                    className="flex items-center gap-2 px-5 py-3 text-red-600 font-semibold text-sm hover:bg-red-50"
                  >
                    <Zap size={16} />
                    Ofertas do Dia
                  </Link>
                  <Link
                    href="/favoritos"
                    className="flex items-center gap-2 px-5 py-3 text-gray-600 hover:bg-gray-50 text-sm"
                  >
                    <Heart size={16} />
                    Favoritos
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
