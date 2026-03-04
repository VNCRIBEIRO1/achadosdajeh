import { prisma } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { formatPrice, getPlatformInfo } from "@/lib/utils";
import { notFound } from "next/navigation";
import { ExternalLink, ArrowLeft, Share2, Tag, ChevronRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } }).catch(() => null);
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

  // Related products
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

  // Schema.org structured data
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-orange-500 transition-colors">
            Início
          </Link>
          <ChevronRight size={14} />
          <Link
            href={`/categoria/${product.category.slug}`}
            className="hover:text-orange-500 transition-colors"
          >
            {product.category.name}
          </Link>
          <ChevronRight size={14} />
          <span className="text-gray-700 font-medium line-clamp-1">
            {product.title}
          </span>
        </nav>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-orange-500 transition-colors mb-6"
        >
          <ArrowLeft size={16} /> Voltar
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
          {/* Image */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
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
                <div className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-4 py-1.5 rounded-xl">
                  -{discount}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-5">
            <div
              className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-1.5 rounded-xl text-white"
              style={{ backgroundColor: platformInfo.color }}
            >
              {platformInfo.shortName} | {platformInfo.name}
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-2">
              <Tag size={14} className="text-gray-300" />
              <Link
                href={`/categoria/${product.category.slug}`}
                className="text-sm text-orange-500 hover:text-orange-600 font-semibold transition-colors"
              >
                {product.category.name}
              </Link>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5 sm:p-7 border border-orange-100">
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <p className="text-gray-400 line-through text-sm">
                    De: {formatPrice(product.originalPrice)}
                  </p>
                )}
              <p className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                {formatPrice(product.price)}
              </p>
              {discount > 0 && (
                <p className="text-green-600 text-sm font-bold mt-1.5 flex items-center gap-1.5">
                  <ShieldCheck size={14} />
                  Você economiza{" "}
                  {formatPrice(
                    (product.originalPrice || product.price) - product.price
                  )}
                </p>
              )}
            </div>

            {/* CTA */}
            <a
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center justify-center gap-2.5 w-full py-4 px-6 rounded-xl text-white text-lg font-bold transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95"
              style={{ backgroundColor: platformInfo.color }}
            >
              <ExternalLink size={20} />
              Comprar na {platformInfo.name}
            </a>

            <button className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl border-2 border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-500 transition-all font-semibold">
              <Share2 size={18} />
              Compartilhar
            </button>

            {/* Description */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-2">Descrição</h2>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-700 leading-relaxed">
              Preço e disponibilidade sujeitos a alteração. Confira o valor
              atualizado diretamente na plataforma antes de comprar.
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <section className="mt-14">
            <h2 className="section-title text-xl sm:text-2xl font-extrabold text-gray-900 mb-6">
              Você também pode gostar
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 card-hover"
                >
                  <Link
                    href={`/produto/${p.slug}`}
                    className="block relative aspect-[4/3] bg-gray-50"
                  >
                    <Image
                      src={p.image || "/placeholder.jpg"}
                      alt={p.title}
                      fill
                      className="object-contain p-3 hover:scale-105 transition-transform duration-300"
                      sizes="25vw"
                    />
                  </Link>
                  <div className="p-3.5">
                    <Link href={`/produto/${p.slug}`}>
                      <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-orange-600 transition-colors">
                        {p.title}
                      </h3>
                    </Link>
                    <p className="text-orange-600 font-extrabold mt-1.5">
                      {formatPrice(p.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
