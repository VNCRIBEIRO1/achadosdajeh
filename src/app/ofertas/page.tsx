import { prisma } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { Tag, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ofertas",
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
        <div className="bg-white border-b border-gray-100">
          <div className="site-container py-8 sm:py-10">
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
              <Link href="/" className="hover:text-[#FF5733] transition-colors">
                Início
              </Link>
              <ChevronRight size={12} />
              <span className="text-[#212529] font-medium">Ofertas</span>
            </nav>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#FFF4F1] rounded-lg flex items-center justify-center">
                <Tag size={20} className="text-[#FF5733]" />
              </div>
              <div>
                <h1 className="font-heading text-xl sm:text-2xl font-bold text-[#212529]">
                  Ofertas
                </h1>
                <p className="text-gray-500 text-sm">
                  {products.length} produto(s) disponível(is)
                </p>
              </div>
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
