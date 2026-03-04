"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Menu, X, Heart, ChevronDown } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const categories = [
  { name: "Eletrônicos", slug: "eletronicos" },
  { name: "Moda", slug: "moda" },
  { name: "Casa", slug: "casa" },
  { name: "Beleza", slug: "beleza" },
  { name: "Esportes", slug: "esportes" },
  { name: "Brinquedos", slug: "brinquedos" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
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

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      {/* Top bar */}
      <div className="border-b border-gray-100 hidden sm:block">
        <div className="site-container flex items-center justify-between py-1.5 text-xs text-gray-500">
          <span>Curadoria dos melhores produtos da internet</span>
          <div className="flex items-center gap-4">
            <Link href="/sobre" className="hover:text-[#FF5733] transition-colors">
              Sobre
            </Link>
            <Link href="/politica-privacidade" className="hover:text-[#FF5733] transition-colors">
              Privacidade
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-gray-100">
        <div className="site-container flex items-center gap-4 py-3 sm:py-4">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-gray-600 hover:text-[#FF5733] transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 bg-[#FF5733] rounded-lg flex items-center justify-center">
              <span className="text-white font-heading font-black text-lg">A</span>
            </div>
            <div>
              <h1 className="font-heading text-sm sm:text-base font-bold text-[#212529] leading-none">
                Achados da Jeh
              </h1>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5 hidden sm:block">
                Curadoria de ofertas
              </p>
            </div>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-lg mx-auto">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#FF5733] focus:bg-white focus:ring-1 focus:ring-[#FF5733]/20 transition-all"
              />
            </div>
          </form>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/favoritos"
              className="flex items-center gap-1.5 text-gray-600 hover:text-[#FF5733] transition-colors text-sm px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              <Heart size={18} />
              <span>Favoritos</span>
            </Link>
            <Link
              href="/ofertas"
              className="flex items-center gap-1.5 bg-[#FF5733] hover:bg-[#E64D2E] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Ofertas
            </Link>
          </div>
        </div>
      </div>

      {/* Category nav — desktop */}
      <nav className="hidden lg:block border-b border-gray-100">
        <div className="site-container">
          <ul className="flex items-center gap-1">
            <li>
              <Link
                href="/"
                className={`inline-flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  pathname === "/"
                    ? "text-[#FF5733] bg-[#FFF4F1]"
                    : "text-gray-600 hover:text-[#FF5733] hover:bg-gray-50"
                }`}
              >
                Início
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/categoria/${cat.slug}`}
                  className={`inline-flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    pathname === `/categoria/${cat.slug}`
                      ? "text-[#FF5733] bg-[#FFF4F1]"
                      : "text-gray-600 hover:text-[#FF5733] hover:bg-gray-50"
                  }`}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/40 animate-fade-in" />
          <div
            className="absolute left-0 top-0 bottom-0 w-72 max-w-[80vw] bg-white shadow-xl animate-slide-down overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-[#FF5733] rounded-lg flex items-center justify-center">
                    <span className="text-white font-heading font-bold text-sm">A</span>
                  </div>
                  <span className="font-heading font-bold text-sm text-[#212529]">Achados da Jeh</span>
                </div>
                <button onClick={() => setMenuOpen(false)} aria-label="Fechar" className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
            </div>

            <nav className="py-2">
              <Link
                href="/"
                className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-50 font-medium text-sm transition-colors"
              >
                Início
              </Link>
              <Link
                href="/ofertas"
                className="flex items-center px-5 py-3 text-[#FF5733] font-semibold text-sm hover:bg-[#FFF4F1] transition-colors"
              >
                Ofertas
              </Link>

              <div className="px-5 pt-4 pb-2">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  Categorias
                </p>
              </div>

              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categoria/${cat.slug}`}
                  className="flex items-center px-5 py-2.5 text-gray-600 hover:bg-gray-50 text-sm transition-colors"
                >
                  {cat.name}
                </Link>
              ))}

              <div className="border-t border-gray-100 mt-3 pt-2">
                <Link
                  href="/favoritos"
                  className="flex items-center gap-2 px-5 py-3 text-gray-600 hover:bg-gray-50 text-sm transition-colors"
                >
                  <Heart size={16} />
                  Favoritos
                </Link>
                <Link
                  href="/sobre"
                  className="flex items-center px-5 py-3 text-gray-600 hover:bg-gray-50 text-sm transition-colors"
                >
                  Sobre nós
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
