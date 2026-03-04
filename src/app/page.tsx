import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BannerSlider from "@/components/BannerSlider";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCarousel from "@/components/ProductCarousel";
import ProductGrid from "@/components/ProductGrid";
import { prisma } from "@/lib/db";
import { ShieldCheck, BadgeDollarSign, Store, RefreshCw, ArrowRight, Zap, Users, Lock } from "lucide-react";
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
        {/* Hero Banner — full width, edge-to-edge */}
        <BannerSlider banners={banners} />

        {/* Categories */}
        <section className="site-container py-5 sm:py-6">
          <CategoryGrid categories={categories} />
        </section>

        {/* Destaques — full-width carousel card */}
        <section className="site-container mb-3 sm:mb-4">
          <ProductCarousel
            products={featuredProducts}
            title="Destaques da Jeh"
            titleColor="bg-orange-500"
            borderColor="border-orange-200"
            viewAllLink="/ofertas"
          />
        </section>

        {/* Urgency strip */}
        <div className="bg-red-600 py-2">
          <div className="site-container flex items-center justify-center gap-2 text-white text-[11px] sm:text-xs font-bold">
            <Zap size={13} className="animate-pulse-urgent" />
            <span className="uppercase tracking-wide">
              Preços podem mudar a qualquer momento
            </span>
            <span className="text-red-300 hidden sm:inline">|</span>
            <span className="hidden sm:inline text-red-200 font-normal">
              Aproveite enquanto dura
            </span>
          </div>
        </div>

        {/* Ofertas — full-width carousel card */}
        <section className="site-container mt-3 sm:mt-4 mb-3 sm:mb-4">
          <ProductCarousel
            products={recentProducts}
            title="Ofertas que você vai amar"
            titleColor="bg-gray-900"
            borderColor="border-gray-300"
            viewAllLink="/ofertas"
          />
        </section>

        {/* Trust strip */}
        <section className="bg-gray-50 border-y border-gray-200 py-5 sm:py-6">
          <div className="site-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  Icon: ShieldCheck,
                  title: "Links Verificados",
                  desc: "Redirecionamos para lojas oficiais",
                  color: "text-green-600",
                },
                {
                  Icon: BadgeDollarSign,
                  title: "Menores Preços",
                  desc: "Curadoria dos melhores valores",
                  color: "text-orange-500",
                },
                {
                  Icon: Store,
                  title: "Lojas Confiáveis",
                  desc: "Shopee, Magalu e Mercado Livre",
                  color: "text-blue-600",
                },
                {
                  Icon: RefreshCw,
                  title: "Atualizado Diário",
                  desc: "Novos achados todos os dias",
                  color: "text-purple-600",
                },
              ].map((badge) => (
                <div key={badge.title} className="flex items-start gap-3">
                  <badge.Icon className={`${badge.color} shrink-0 mt-0.5`} size={20} />
                  <div>
                    <h3 className="font-bold text-gray-900 text-xs sm:text-sm">
                      {badge.title}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5">
                      {badge.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-gray-900">
          <div className="site-container py-10 sm:py-14">
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 bg-orange-500/20 text-orange-400 text-[10px] font-bold px-2.5 py-1 mb-3 uppercase tracking-wider">
                  <Zap size={10} />
                  Atualizações diárias
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-2 leading-tight">
                  Não perca nenhuma oferta
                </h2>
                <p className="text-gray-500 text-sm mb-5 max-w-md">
                  Siga nosso Instagram e fique por dentro de todas as
                  promoções e achados exclusivos
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition-colors"
                >
                  Seguir no Instagram
                  <ArrowRight size={14} />
                </a>
              </div>
              <div className="hidden md:flex flex-col items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-gray-700 border-2 border-gray-900 flex items-center justify-center"
                    >
                      <Users size={12} className="text-gray-500" />
                    </div>
                  ))}
                </div>
                <p className="text-gray-500 text-xs">
                  <span className="text-white font-bold">2.500+</span> pessoas já seguem
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* All Products Grid */}
        <section className="site-container py-6 sm:py-8">
          <ProductGrid
            products={recentProducts}
            title="Todos os Achados"
            subtitle="Explore todos os produtos disponíveis"
            showViewAll
            viewAllLink="/ofertas"
          />
        </section>

        {/* Security footer strip */}
        <section className="border-t border-gray-200 bg-white py-4">
          <div className="site-container flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[10px] sm:text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Lock size={11} className="text-green-500" />
              Conexão segura
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck size={11} className="text-green-500" />
              Links verificados
            </span>
            <span className="flex items-center gap-1">
              <Store size={11} className="text-blue-500" />
              Lojas oficiais
            </span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
