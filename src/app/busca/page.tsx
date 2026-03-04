import { prisma } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
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
      <main className="max-w-7xl mx-auto px-4 py-6">
        <nav className="text-sm text-gray-500 mb-4">
          <a href="/" className="hover:text-orange-500">
            Início
          </a>{" "}
          / <span className="text-gray-800 font-medium">Busca</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          🔍 {q ? `Resultados para "${q}"` : "Buscar Produtos"}
        </h1>
        {q && (
          <p className="text-gray-500 mb-6">
            {products.length} resultado(s) encontrado(s)
          </p>
        )}

        <ProductGrid products={products} />
      </main>
      <Footer />
    </>
  );
}
