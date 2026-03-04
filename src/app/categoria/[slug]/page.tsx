import { prisma } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
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
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4">
          <a href="/" className="hover:text-orange-500">
            Início
          </a>{" "}
          /{" "}
          <span className="text-gray-800 font-medium">{category.name}</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {category.name}
          </h1>
          <p className="text-gray-500 mt-1">
            {category.products.length} produto(s) encontrado(s)
          </p>
        </div>

        <ProductGrid products={category.products} />
      </main>
      <Footer />
    </>
  );
}
