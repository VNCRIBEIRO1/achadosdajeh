import { prisma } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category
    .findFirst({ where: { slug } })
    .catch(() => null);
  return {
    title: category?.name || "Categoria",
    description: `Produtos da categoria ${category?.name || slug}.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const category = await prisma.category
    .findFirst({ where: { slug } })
    .catch(() => null);

  if (!category) notFound();

  const products = await prisma.product
    .findMany({
      where: { active: true, categoryId: category.id },
      orderBy: { createdAt: "desc" },
    })
    .catch(() => []);

  return (
    <>
      <Header />
      <main>
        <div className="bg-white border-b border-gray-100">
          <div className="site-container py-8 sm:py-10">
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
              <Link href="/" className="hover:text-[#FF5733] transition-colors">
                Início
              </Link>
              <ChevronRight size={12} />
              <span className="text-[#212529] font-medium">
                {category.name}
              </span>
            </nav>

            <h1 className="font-heading text-xl sm:text-2xl font-bold text-[#212529] mb-1">
              {category.name}
            </h1>
            <p className="text-gray-500 text-sm">
              {products.length} produto(s) encontrado(s)
            </p>
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
