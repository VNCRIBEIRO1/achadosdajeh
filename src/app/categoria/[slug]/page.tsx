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
  const category = await prisma.category.findUnique({ where: { slug } }).catch(() => null);
  if (!category) return { title: "Categoria não encontrada" };
  return {
    title: `${category.name} - Melhores Ofertas`,
    description: `Encontre as melhores ofertas de ${category.name} com preços incríveis na Shopee, Magalu e Mercado Livre.`,
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
      <main className="site-container py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-orange-500 transition-colors">Início</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700 font-medium">{category.name}</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {category.name}
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {category.products.length} produto(s) encontrado(s)
          </p>
        </div>

        <ProductGrid products={category.products} />
      </main>
      <Footer />
    </>
  );
}
