import { prisma } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
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
      <main className="max-w-7xl mx-auto px-4 py-6">
        <nav className="text-sm text-gray-500 mb-4">
          <a href="/" className="hover:text-orange-500">Início</a>{" "}
          / <span className="text-gray-800 font-medium">Ofertas</span>
        </nav>

        <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-6 sm:p-8 mb-6 text-white text-center">
          <h1 className="text-2xl sm:text-4xl font-bold mb-2">Ofertas do Dia</h1>
          <p className="text-orange-100">Produtos selecionados com os melhores preços da internet</p>
        </div>

        <ProductGrid products={products} />
      </main>
      <Footer />
    </>
  );
}
