import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BannerSlider from "@/components/BannerSlider";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCarousel from "@/components/ProductCarousel";
import ProductGrid from "@/components/ProductGrid";
import { prisma } from "@/lib/db";
import { ShieldCheck, BadgeDollarSign, Store, RefreshCw, ArrowRight } from "lucide-react";
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
          <h2 className="font-heading text-base sm:text-lg font-bold text-[#212529] mb-4 sm:mb-5">
            Categorias
          </h2>
          <CategoryGrid categories={categories} />
        </section>

        {/* Divider */}
        <div className="site-container"><hr className="separator" /></div>

        {/* Featured Products Carousel */}
        <section className="site-container py-6 sm:py-8">
          <ProductCarousel
            products={featuredProducts}
            title="Destaques da Jeh"
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
                    style={{ backgroundColor: `${badge.color}12`, color: badge.color }}
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
          <ProductCarousel
            products={recentProducts}
            title="Ofertas recentes"
            viewAllLink="/ofertas"
          />
        </section>

        {/* CTA Section */}
        <section className="site-container py-4 sm:py-6">
          <div className="bg-[#212529] rounded-2xl p-8 sm:p-12 text-center sm:text-left">
            <div className="max-w-xl mx-auto sm:mx-0">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2">
                Não perca nenhuma oferta
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                Siga nosso Instagram e fique por dentro de todas as promoções e achados exclusivos.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5733] text-white rounded-lg font-heading font-semibold text-sm hover:bg-[#E64D2E] transition-colors"
              >
                Seguir no Instagram
                <ArrowRight size={14} />
              </a>
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
