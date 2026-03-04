import { prisma } from "@/lib/db";
import { Package, FolderOpen, MousePointerClick, TrendingUp } from "lucide-react";

export default async function AdminDashboard() {
  let stats = {
    totalProducts: 0,
    totalCategories: 0,
    totalClicks: 0,
    topProducts: [] as { id: string; title: string; clicks: number; platform: string }[],
  };

  try {
    const [totalProducts, totalCategories, totalClicks, topProducts] =
      await Promise.all([
        prisma.product.count({ where: { active: true } }),
        prisma.category.count(),
        prisma.product.aggregate({ _sum: { clicks: true } }),
        prisma.product.findMany({
          orderBy: { clicks: "desc" },
          take: 5,
          select: { id: true, title: true, clicks: true, platform: true },
        }),
      ]);

    stats = {
      totalProducts,
      totalCategories,
      totalClicks: totalClicks._sum.clicks || 0,
      topProducts,
    };
  } catch {
    // Database not ready yet
  }

  const cards = [
    {
      icon: Package,
      label: "Produtos Ativos",
      value: stats.totalProducts,
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: FolderOpen,
      label: "Categorias",
      value: stats.totalCategories,
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: MousePointerClick,
      label: "Cliques Total",
      value: stats.totalClicks,
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: TrendingUp,
      label: "Top Produto",
      value: stats.topProducts[0]?.clicks || 0,
      color: "from-blue-500 to-blue-600",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`bg-gradient-to-r ${card.color} p-2 rounded-xl`}
              >
                <card.icon className="text-white" size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            <p className="text-sm text-gray-500">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-800 mb-4">
          Produtos Mais Clicados
        </h2>
        {stats.topProducts.length === 0 ? (
          <p className="text-gray-400 text-sm">Nenhum produto cadastrado ainda.</p>
        ) : (
          <div className="space-y-3">
            {stats.topProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-300">
                    #{index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">
                      {product.title}
                    </p>
                    <p className="text-xs text-gray-400">{product.platform}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-orange-500">
                  {product.clicks} cliques
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
