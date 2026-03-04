import { prisma } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { formatPrice, getPlatformInfo } from "@/lib/utils";
import { notFound } from "next/navigation";
import { ExternalLink, ArrowLeft, Share2, Tag } from "lucide-react";
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
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
          <Link href="/" className="hover:text-orange-500">
            Início
          </Link>
          <span>/</span>
          <Link
            href={`/categoria/${product.category.slug}`}
            className="hover:text-orange-500"
          >
            {product.category.name}
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium line-clamp-1">
            {product.title}
          </span>
        </nav>

        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-orange-500 mb-4"
        >
          <ArrowLeft size={16} /> Voltar
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {/* Image */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
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
                <div className="absolute top-2 left-2 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  -{discount}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div
              className="inline-flex items-center gap-1 text-sm font-semibold px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: platformInfo.color }}
            >
              {platformInfo.shortName} | Disponível na {platformInfo.name}
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
              {product.title}
            </h1>

            <div className="flex items-center gap-2">
              <Tag size={16} className="text-gray-400" />
              <Link
                href={`/categoria/${product.category.slug}`}
                className="text-sm text-orange-500 hover:text-orange-600 font-medium"
              >
                {product.category.name}
              </Link>
            </div>

            {/* Price */}
            <div className="bg-orange-50 rounded-2xl p-4 sm:p-6">
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <p className="text-gray-400 line-through text-sm">
                    De: {formatPrice(product.originalPrice)}
                  </p>
                )}
              <p className="text-3xl sm:text-4xl font-bold text-orange-600">
                {formatPrice(product.price)}
              </p>
              {discount > 0 && (
                <p className="text-green-600 text-sm font-semibold mt-1">
                  Você economiza{" "}
                  {formatPrice(
                    (product.originalPrice || product.price) - product.price
                  )}
                  !
                </p>
              )}
            </div>

            {/* CTA */}
            <a
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-full text-white text-lg font-bold transition-all hover:scale-[1.02] hover:shadow-lg active:scale-95 animate-pulse-glow"
              style={{ backgroundColor: platformInfo.color }}
            >
              <ExternalLink size={20} />
              Comprar na {platformInfo.name}
            </a>

            <button className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-full border-2 border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-500 transition-all font-medium">
              <Share2 size={18} />
              Compartilhar
            </button>

            {/* Description */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-800 mb-2">Descrição</h2>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs text-yellow-700">
              Preço e disponibilidade sujeitos a alteração. Confira o valor
              atualizado diretamente na plataforma antes de comprar.
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
              Você também pode gostar
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {relatedProducts.map((p, i) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all"
                >
                  <Link
                    href={`/produto/${p.slug}`}
                    className="block relative aspect-square bg-gray-50"
                  >
                    <Image
                      src={p.image || "/placeholder.jpg"}
                      alt={p.title}
                      fill
                      className="object-contain p-3"
                      sizes="25vw"
                    />
                  </Link>
                  <div className="p-3">
                    <Link href={`/produto/${p.slug}`}>
                      <h3 className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-orange-600">
                        {p.title}
                      </h3>
                    </Link>
                    <p className="text-orange-600 font-bold mt-1">
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
