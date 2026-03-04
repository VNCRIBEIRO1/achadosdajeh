import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BannerSlider from "@/components/BannerSlider";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import { prisma } from "@/lib/db";
import { ShieldCheck, BadgeDollarSign, Store, RefreshCw, ArrowRight, Sparkles, Zap } from "lucide-react";
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
          take: 8,
        }),
        prisma.product.findMany({
          where: { active: true },
          orderBy: { createdAt: "desc" },
          take: 12,
        }),
      ]);
    return { banners, categories, featuredProducts, recentProducts };
  } catch {
    return { banners: [], categories: [], featuredProducts: [], recentProducts: [] };
  }
}

export default async function Home() {
  const { banners, categories, featuredProducts, recentProducts } =
    await getData();

  return (
    <>
      <Header />
      <main>
        {/* Hero Banner — full width */}
        <section className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 max-w-7xl mx-auto">
          <BannerSlider banners={banners} />
        </section>

        {/* Categories — horizontal scroll on mobile */}
        <section className="mt-8 sm:mt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 section-title">
              Navegue por categorias
            </h2>
            <Link
              href="/ofertas"
              className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center gap-1 transition-colors"
            >
              Ver todas <ArrowRight size={14} />
            </Link>
          </div>
          <CategoryGrid categories={categories} />
        </section>

        {/* Featured Products */}
        <section className="mt-10 sm:mt-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <ProductGrid
            products={featuredProducts}
            title="Destaques da Jeh"
            subtitle="Produtos selecionados especialmente pra você"
            showViewAll
            viewAllLink="/ofertas"
          />
        </section>

        {/* CTA Banner */}
        <section className="mt-10 sm:mt-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 sm:p-12 lg:p-16">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-pink-500/15 to-transparent rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                  <Zap size={12} />
                  ATUALIZAÇÕES DIÁRIAS
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                  Não perca nenhuma oferta!
                </h2>
                <p className="text-gray-400 sm:text-lg mb-6 max-w-md">
                  Siga nosso Instagram e fique por dentro de todas as promoções e achados exclusivos
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-orange-500/25 transition-all hover:scale-[1.02]"
                >
                  Seguir no Instagram
                  <ArrowRight size={16} />
                </a>
              </div>
              <div className="shrink-0 hidden md:block">
                <div className="w-48 h-48 bg-gradient-to-br from-orange-500/30 to-pink-500/30 rounded-full flex items-center justify-center animate-float">
                  <Sparkles className="text-orange-400" size={64} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Products */}
        <section className="mt-10 sm:mt-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <ProductGrid
            products={recentProducts}
            title="Acabou de Chegar"
            subtitle="Os achados mais recentes"
            showViewAll
            viewAllLink="/ofertas"
          />
        </section>

        {/* Trust Section */}
        <section className="mt-10 sm:mt-14 mb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-10">
            <h2 className="text-center text-lg sm:text-xl font-bold text-gray-900 mb-8">
              Por que escolher a Achados da Jeh?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {[
                { Icon: ShieldCheck, title: "Links Seguros", desc: "Direcionamos para lojas oficiais", gradient: "from-green-500 to-emerald-600" },
                { Icon: BadgeDollarSign, title: "Melhores Preços", desc: "Curadoria dos menores valores", gradient: "from-orange-500 to-amber-500" },
                { Icon: Store, title: "Lojas Confiáveis", desc: "Shopee, Magalu e Mercado Livre", gradient: "from-blue-500 to-indigo-600" },
                { Icon: RefreshCw, title: "Atualizado", desc: "Novos achados todos os dias", gradient: "from-purple-500 to-violet-600" },
              ].map((badge) => (
                <div key={badge.title} className="text-center group">
                  <div className={`inline-flex p-3.5 rounded-2xl bg-gradient-to-br ${badge.gradient} mb-3 shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform`}>
                    <badge.Icon className="text-white" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
