import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BannerSlider from "@/components/BannerSlider";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCarousel from "@/components/ProductCarousel";
import ProductGrid from "@/components/ProductGrid";
import { prisma } from "@/lib/db";
import { ShieldCheck, BadgeDollarSign, Store, RefreshCw, ArrowRight, Sparkles, Flame, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

async function getData() {
  try {
    const [banners, categories, featuredProducts, recentProducts] =
      await Promise.all([
        prisma.banner.findMany({
          where: { active: true },
          orderBy: { order: "asc" },
        }),
        prisma.category.findMany({
          orderBy: { order: "asc" },
          include: { _count: { select: { products: true } } },
        }),
        prisma.product.findMany({
          where: { active: true, featured: true },
          orderBy: { createdAt: "desc" },
          take: 12,
        }),
        prisma.product.findMany({
          where: { active: true },
          orderBy: { createdAt: "desc" },
          take: 12,
        }),
      ]);
    return { banners, categories, featuredProducts, recentProducts };
  } catch {
    return {
      banners: [],
      categories: [],
      featuredProducts: [],
      recentProducts: [],
    };
  }
}

export default async function Home() {
  const { banners, categories, featuredProducts, recentProducts } =
    await getData();

  return (
    <>
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="site-container pt-5 sm:pt-6">
          <BannerSlider banners={banners} />
        </section>

        {/* Categories */}
        <section className="site-container py-6 sm:py-8">
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <div className="w-8 h-8 rounded-lg bg-[#FF5733]/10 flex items-center justify-center">
              <Package size={16} className="text-[#FF5733]" />
            </div>
            <h2 className="font-heading text-base sm:text-lg font-bold text-[#212529]">
              Categorias
            </h2>
          </div>
          <CategoryGrid categories={categories} />
        </section>

        {/* Divider */}
        <div className="site-container"><hr className="separator" /></div>

        {/* Featured Products Carousel */}
        <section className="site-container py-6 sm:py-8">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Sparkles size={16} className="text-amber-500" />
              </div>
              <span className="font-heading text-base sm:text-lg font-bold text-[#212529]">
                Destaques da Jeh
              </span>
            </div>
            <Link href="/ofertas" className="text-xs font-semibold text-[#FF5733] hover:text-[#E64D2E] transition-colors flex items-center gap-1">
              Ver todos <ArrowRight size={12} />
            </Link>
          </div>
          <ProductCarousel
            products={featuredProducts}
            title=""
            viewAllLink="/ofertas"
          />
        </section>

        {/* Trust badges */}
        <section className="bg-white py-8 sm:py-10">
          <div className="site-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  Icon: ShieldCheck,
                  title: "Links verificados",
                  desc: "Redirecionamos para lojas oficiais",
                  color: "#198754",
                },
                {
                  Icon: BadgeDollarSign,
                  title: "Menores preços",
                  desc: "Curadoria dos melhores valores",
                  color: "#FF5733",
                },
                {
                  Icon: Store,
                  title: "Lojas confiáveis",
                  desc: "Shopee, Magalu e Mercado Livre",
                  color: "#3B82F6",
                },
                {
                  Icon: RefreshCw,
                  title: "Atualização diária",
                  desc: "Novos achados todos os dias",
                  color: "#A855F7",
                },
              ].map((badge) => (
                <div key={badge.title} className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${badge.color}1A`, color: badge.color }}
                  >
                    <badge.Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-[#212529] text-sm">
                      {badge.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {badge.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Products Carousel */}
        <section className="site-container py-6 sm:py-8">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
                <Flame size={16} className="text-rose-500" />
              </div>
              <span className="font-heading text-base sm:text-lg font-bold text-[#212529]">
                Ofertas recentes
              </span>
            </div>
            <Link href="/ofertas" className="text-xs font-semibold text-[#FF5733] hover:text-[#E64D2E] transition-colors flex items-center gap-1">
              Ver todos <ArrowRight size={12} />
            </Link>
          </div>
          <ProductCarousel
            products={recentProducts}
            title=""
            viewAllLink="/ofertas"
          />
        </section>

        {/* CTA Section */}
        <section className="site-container py-4 sm:py-6">
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=500&fit=crop&q=80"
              alt="Ofertas exclusivas"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#212529]/90 via-[#212529]/70 to-[#212529]/40" />
            <div className="relative p-8 sm:p-12 text-center sm:text-left">
              <div className="max-w-xl mx-auto sm:mx-0">
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2 drop-shadow-md">
                  Não perca nenhuma oferta
                </h2>
                <p className="text-gray-300 text-sm mb-6">
                  Siga nosso Instagram e fique por dentro de todas as promoções e achados exclusivos.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5733] text-white rounded-lg font-heading font-semibold text-sm hover:bg-[#E64D2E] transition-colors shadow-lg"
                >
                  Seguir no Instagram
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* All Products Grid */}
        <section className="site-container py-6 sm:py-8">
          <ProductGrid
            products={recentProducts}
            title="Todos os achados"
            subtitle="Explore todos os produtos disponíveis"
            showViewAll
            viewAllLink="/ofertas"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
