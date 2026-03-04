import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BannerSlider from "@/components/BannerSlider";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import { prisma } from "@/lib/db";

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
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8 sm:space-y-12">
        {/* Banner */}
        <BannerSlider banners={banners} />

        {/* Categories */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
            📂 Categorias
          </h2>
          <CategoryGrid categories={categories} />
        </section>

        {/* Featured */}
        <ProductGrid
          products={featuredProducts}
          title="⭐ Destaques da Jeh"
          subtitle="Produtos selecionados especialmente pra você"
          showViewAll
          viewAllLink="/ofertas"
        />

        {/* Promotional Banner */}
        <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-2xl p-6 sm:p-10 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            🔥 Não perca nenhuma oferta!
          </h2>
          <p className="text-orange-100 mb-4">
            Siga nosso Instagram e fique por dentro de todas as promoções
          </p>
          <a
            href="#"
            className="inline-block px-6 py-3 bg-white text-orange-600 rounded-full font-bold hover:bg-orange-50 transition-colors"
          >
            Seguir no Instagram 📸
          </a>
        </div>

        {/* Recent */}
        <ProductGrid
          products={recentProducts}
          title="🆕 Acabou de Chegar"
          subtitle="Os achados mais recentes"
          showViewAll
          viewAllLink="/ofertas"
        />

        {/* Trust badges */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🔒", title: "Links Seguros", desc: "Direcionamos para lojas oficiais" },
            { icon: "💰", title: "Melhores Preços", desc: "Curadoria dos menores valores" },
            { icon: "✅", title: "Lojas Confiáveis", desc: "Shopee, Magalu e Mercado Livre" },
            { icon: "📱", title: "Atualizado", desc: "Novos achados todos os dias" },
          ].map((badge) => (
            <div
              key={badge.title}
              className="bg-white rounded-2xl p-4 sm:p-6 text-center shadow-sm border border-gray-100"
            >
              <span className="text-3xl">{badge.icon}</span>
              <h3 className="font-semibold text-gray-800 mt-2 text-sm sm:text-base">
                {badge.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{badge.desc}</p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
