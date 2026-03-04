import { prisma } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { Zap, ChevronRight, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ofertas do Dia",
  description:
    "Confira as melhores ofertas selecionadas com preços incríveis!",
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
      <main>
        {/* Hero */}
        <div className="bg-orange-500">
          <div className="site-container py-8 sm:py-10">
            <nav className="flex items-center gap-1.5 text-xs text-orange-200 mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                Início
              </Link>
              <ChevronRight size={12} />
              <span className="text-white font-medium">Ofertas</span>
            </nav>

            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white/15 p-2">
                <Zap size={22} className="text-white" />
              </div>
              <h1 className="text-xl sm:text-3xl font-black text-white">
                Ofertas do Dia
              </h1>
            </div>
            <p className="text-orange-200 text-sm max-w-md">
              Produtos selecionados com os melhores preços da internet.
              Atualizado diariamente!
            </p>

            <div className="flex items-center gap-4 mt-4 text-[10px] text-orange-200">
              <span className="flex items-center gap-1">
                <Clock size={10} />
                Preços podem mudar
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={10} />
                {products.length} ofertas ativas
              </span>
            </div>
          </div>
        </div>

        <div className="site-container py-6 sm:py-8">
          <ProductGrid products={products} />
        </div>
      </main>
      <Footer />
    </>
  );
}
