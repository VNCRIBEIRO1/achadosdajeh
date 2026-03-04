import { prisma } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category
    .findUnique({ where: { slug } })
    .catch(() => null);
  if (!category) return { title: "Categoria não encontrada" };
  return {
    title: `${category.name} - Melhores Ofertas`,
    description: `Encontre as melhores ofertas de ${category.name} com preços incríveis.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const category = await prisma.category
    .findUnique({
      where: { slug },
      include: {
        products: {
          where: { active: true },
          orderBy: { createdAt: "desc" },
        },
      },
    })
    .catch(() => null);

  if (!category) notFound();

  return (
    <>
      <Header />
      <main>
        <div className="bg-gray-900">
          <div className="site-container py-6 sm:py-8">
            <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
              <Link href="/" className="hover:text-orange-400 transition-colors">
                Início
              </Link>
              <ChevronRight size={12} />
              <span className="text-gray-300 font-medium">{category.name}</span>
            </nav>

            <h1 className="text-lg sm:text-2xl font-black text-white">
              {category.name}
            </h1>
            <p className="text-gray-500 text-xs mt-1">
              {category.products.length} produto(s) disponível(is)
            </p>
          </div>
        </div>

        <div className="site-container py-6 sm:py-8">
          <ProductGrid products={category.products} />
        </div>
      </main>
      <Footer />
    </>
  );
}
