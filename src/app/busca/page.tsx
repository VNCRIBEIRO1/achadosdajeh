import { prisma } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Resultados para "${q}"` : "Buscar Produtos",
    description: "Busque e encontre os melhores produtos e ofertas.",
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
      <main>
        <div className="bg-white border-b border-gray-100">
          <div className="site-container py-6 sm:py-8">
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
              <a href="/" className="hover:text-[#FF5733] transition-colors">
                Início
              </a>
              <ChevronRight size={12} />
              <span className="text-[#212529] font-medium">Busca</span>
            </nav>

            <h1 className="font-heading text-xl sm:text-2xl font-bold text-[#212529] mb-1">
              {q ? `Resultados para "${q}"` : "Buscar Produtos"}
            </h1>
            {q && (
              <p className="text-gray-500 text-sm">
                {products.length} resultado(s) encontrado(s)
              </p>
            )}
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
