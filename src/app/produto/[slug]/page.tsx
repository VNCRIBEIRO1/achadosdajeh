import { prisma } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ExternalLink, ShieldCheck } from "lucide-react";
import { formatPrice, getPlatformInfo } from "@/lib/utils";
import type { Metadata } from "next";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&q=80";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product
    .findFirst({ where: { slug } })
    .catch(() => null);
  return {
    title: product?.title || "Produto",
    description:
      product?.description || "Confira este produto com preço incrível.",
    openGraph: {
      title: product?.title || "Produto",
      description: product?.description || "",
      images: product?.image ? [product.image] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await prisma.product
    .findFirst({
      where: { slug },
      include: { category: true },
    })
    .catch(() => null);

  if (!product) notFound();

  const platformInfo = getPlatformInfo(product.platform);
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const relatedProducts = await prisma.product
    .findMany({
      where: {
        active: true,
        categoryId: product.categoryId,
        NOT: { id: product.id },
      },
      take: 8,
      orderBy: { createdAt: "desc" },
    })
    .catch(() => []);

  // Track click
  await prisma.product
    .update({
      where: { id: product.id },
      data: { clicks: { increment: 1 } },
    })
    .catch(() => {});

  return (
    <>
      <Header />
      <main>
        <div className="bg-white border-b border-gray-100">
          <div className="site-container py-3">
            <nav className="flex items-center gap-1.5 text-xs text-gray-400">
              <Link href="/" className="hover:text-[#FF5733] transition-colors">
                Início
              </Link>
              <ChevronRight size={12} />
              {product.category && (
                <>
                  <Link
                    href={`/categoria/${product.category.slug}`}
                    className="hover:text-[#FF5733] transition-colors"
                  >
                    {product.category.name}
                  </Link>
                  <ChevronRight size={12} />
                </>
              )}
              <span className="text-[#212529] font-medium truncate max-w-[200px]">
                {product.title}
              </span>
            </nav>
          </div>
        </div>

        <div className="site-container py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 sm:p-8">
              <div className="relative aspect-square">
                <Image
                  src={product.image || PLACEHOLDER}
                  alt={product.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {discount > 0 && (
                  <div className="absolute top-3 left-3 bg-[#DC3545] text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                    -{discount}%
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div>
              {/* Platform */}
              <span
                className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-md mb-3"
                style={{ backgroundColor: platformInfo.color, color: platformInfo.textColor }}
              >
                {platformInfo.name}
              </span>

              <h1 className="font-heading text-lg sm:text-xl lg:text-2xl font-bold text-[#212529] mb-4 leading-snug">
                {product.title}
              </h1>

              {/* Price */}
              <div className="bg-white rounded-xl border border-gray-100 p-5 mb-5">
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <p className="text-sm text-gray-400 line-through mb-1">
                      {formatPrice(product.originalPrice)}
                    </p>
                  )}
                <p className="font-heading text-3xl sm:text-4xl font-bold text-[#212529]">
                  {formatPrice(product.price)}
                </p>
                {discount > 0 && product.originalPrice && (
                  <p className="text-sm font-semibold text-[#198754] mt-1.5">
                    Economize {formatPrice(product.originalPrice - product.price)}
                  </p>
                )}
              </div>

              {/* CTA */}
              <a
                href={product.affiliateLink}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-heading font-semibold text-base transition-all hover:opacity-90 active:scale-[0.99] mb-4"
                style={{ backgroundColor: platformInfo.color, color: platformInfo.textColor }}
              >
                <ExternalLink size={16} />
                Ver na {platformInfo.name}
              </a>

              {/* Trust */}
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-[#198754]" />
                  Link verificado
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-[#198754]" />
                  Loja oficial
                </span>
              </div>

              {/* Description */}
              {product.description && (
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                  <h2 className="font-heading font-semibold text-[#212529] text-sm mb-2">
                    Sobre o produto
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Disclaimer */}
              <p className="text-[11px] text-gray-400 mt-4 leading-relaxed">
                * Preço e disponibilidade sujeitos a alteração. Verifique no site da loja.
                Este site contém links de afiliados.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="site-container py-6 sm:py-8">
            <hr className="separator mb-6 sm:mb-8" />
            <ProductGrid
              products={relatedProducts}
              title="Produtos relacionados"
              showViewAll
              viewAllLink={`/categoria/${product.category?.slug || ""}`}
            />
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
