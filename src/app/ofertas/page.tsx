import { prisma } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { Flame, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ofertas do Dia",
  description: "Confira as melhores ofertas selecionadas com preços incríveis!",
};

export const revalidate = 60;

export default async function OffersPage() {
  const products = await prisma.product
    .findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    })
    .catch(() => []);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-orange-500 transition-colors">Início</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700 font-medium">Ofertas</span>
        </nav>

        {/* Hero banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-orange-500 to-pink-500 rounded-3xl p-8 sm:p-12 mb-8 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-white rounded-full" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-white rounded-full" />
          </div>
          <div className="relative flex items-center gap-3 mb-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
              <Flame size={24} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold">Ofertas do Dia</h1>
            </div>
          </div>
          <p className="text-orange-100 text-sm sm:text-base max-w-lg">
            Produtos selecionados com os melhores preços da internet. Atualizado diariamente!
          </p>
          <p className="mt-3 text-xs text-white/60 font-medium">{products.length} ofertas disponíveis</p>
        </div>

        <ProductGrid products={products} />
      </main>
      <Footer />
    </>
  );
}
