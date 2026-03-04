import { prisma } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import Image from "next/image";
import { formatPrice, getPlatformInfo } from "@/lib/utils";
import { notFound } from "next/navigation";
import {
  ExternalLink,
  ArrowLeft,
  Share2,
  Tag,
  ChevronRight,
  ShieldCheck,
  Clock,
  ShoppingBag,
  TrendingDown,
  Lock,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product
    .findUnique({ where: { slug } })
    .catch(() => null);
  if (!product) return { title: "Produto não encontrado" };

  return {
    title: product.title,
    description: product.description.substring(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.substring(0, 160),
      images: [product.image],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await prisma.product
    .findUnique({
      where: { slug },
      include: { category: true },
    })
    .catch(() => null);

  if (!product) notFound();

  const platformInfo = getPlatformInfo(product.platform);
  const discount =
    product.discount ||
    (product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0);

  const hash = product.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const soldCount = (hash % 400) + 100;

  const relatedProducts = await prisma.product
    .findMany({
      where: {
        active: true,
        categoryId: product.categoryId,
        id: { not: product.id },
      },
      take: 4,
      orderBy: { createdAt: "desc" },
    })
    .catch(() => []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.image,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      url: product.affiliateLink,
    },
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="site-container py-5 sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-5">
          <Link href="/" className="hover:text-orange-500 transition-colors">
            Início
          </Link>
          <ChevronRight size={12} />
          <Link
            href={`/categoria/${product.category.slug}`}
            className="hover:text-orange-500 transition-colors"
          >
            {product.category.name}
          </Link>
          <ChevronRight size={12} />
          <span className="text-gray-600 font-medium line-clamp-1">
            {product.title}
          </span>
        </nav>

        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-orange-500 transition-colors mb-5"
        >
          <ArrowLeft size={14} /> Voltar
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10">
          {/* Image */}
          <div className="bg-white border border-gray-200 p-5 sm:p-8">
            <div className="relative aspect-square">
              <Image
                src={product.image || "/placeholder.jpg"}
                alt={product.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {discount > 0 && (
                <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-black px-3 py-1.5 flex items-center gap-1">
                  <TrendingDown size={12} />
                  -{discount}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 text-white"
              style={{ backgroundColor: platformInfo.color }}
            >
              {platformInfo.shortName} | {platformInfo.name}
            </div>

            <h1 className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Tag size={12} />
                <Link
                  href={`/categoria/${product.category.slug}`}
                  className="text-orange-500 hover:text-orange-600 font-semibold"
                >
                  {product.category.name}
                </Link>
              </span>
              <span className="flex items-center gap-1">
                <ShoppingBag size={12} />
                {soldCount}+ vendidos
              </span>
            </div>

            {/* Price */}
            <div className="bg-gray-50 border border-gray-200 p-4 sm:p-6">
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <p className="text-gray-400 line-through text-sm">
                    De: {formatPrice(product.originalPrice)}
                  </p>
                )}
              <p className="text-2xl sm:text-3xl font-black text-gray-900">
                {formatPrice(product.price)}
              </p>
              {discount > 0 && (
                <p className="text-green-700 text-xs font-bold mt-1 flex items-center gap-1">
                  <ShieldCheck size={12} />
                  Você economiza{" "}
                  {formatPrice(
                    (product.originalPrice || product.price) - product.price
                  )}
                </p>
              )}
              <div className="flex items-center gap-1.5 mt-2 text-[10px] text-orange-600 font-semibold">
                <Clock size={10} className="animate-pulse-urgent" />
                Preço sujeito a alteração - aproveite agora
              </div>
            </div>

            {/* CTA */}
            <a
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center justify-center gap-2 w-full py-3.5 px-6 text-white text-base font-black uppercase tracking-wider transition-all hover:brightness-110 active:scale-[0.98]"
              style={{ backgroundColor: platformInfo.color }}
            >
              <ExternalLink size={18} />
              Comprar na {platformInfo.name}
            </a>

            {/* Trust */}
            <div className="flex items-center justify-center gap-4 py-2 text-[10px] text-gray-400">
              <span className="flex items-center gap-0.5">
                <Lock size={10} className="text-green-500" />
                Compra segura
              </span>
              <span className="flex items-center gap-0.5">
                <ShieldCheck size={10} className="text-green-500" />
                Link verificado
              </span>
            </div>

            <button className="flex items-center justify-center gap-2 w-full py-3 px-6 border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-all font-semibold text-sm">
              <Share2 size={16} />
              Compartilhar
            </button>

            {/* Description */}
            <div className="bg-white border border-gray-200 p-4 sm:p-6">
              <h2 className="font-bold text-gray-900 text-sm mb-2">Descrição</h2>
              <p className="text-gray-600 text-xs leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-3 text-[10px] text-amber-700 leading-relaxed">
              Preço e disponibilidade sujeitos a alteração. Confira o valor
              atualizado diretamente na plataforma antes de comprar.
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <section className="mt-10 sm:mt-14">
            <ProductGrid
              products={relatedProducts}
              title="Você também pode gostar"
            />
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
