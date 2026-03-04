import { prisma } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Resultados para "${q}"` : "Buscar Produtos",
    description: `Busque e encontre os melhores produtos e ofertas.`,
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;

  let products: Array<{
    id: string;
    title: string;
    slug: string;
    image: string;
    price: number;
    originalPrice: number | null;
    discount: number | null;
    platform: string;
    affiliateLink: string;
  }> = [];

  if (q) {
    products = await prisma.product
      .findMany({
        where: {
          active: true,
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
          ],
        },
        orderBy: { createdAt: "desc" },
      })
      .catch(() => []);
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-6">
          <a href="/" className="hover:text-orange-500 transition-colors">Início</a>
          <ChevronRight size={14} />
          <span className="text-gray-700 font-medium">Busca</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
            {q ? `Resultados para "${q}"` : "Buscar Produtos"}
          </h1>
          {q && (
            <p className="text-gray-400 text-sm">
              {products.length} resultado(s) encontrado(s)
            </p>
          )}
        </div>

        <ProductGrid products={products} />
      </main>
      <Footer />
    </>
  );
}
