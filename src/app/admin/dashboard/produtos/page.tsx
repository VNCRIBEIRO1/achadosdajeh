"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
  _count?: { products: number };
}

interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number | null;
  platform: string;
  affiliateLink: string;
  categoryId: string;
  featured: boolean;
  active: boolean;
  clicks: number;
  description: string;
  category?: Category;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    originalPrice: "",
    platform: "shopee",
    affiliateLink: "",
    categoryId: "",
    featured: false,
    active: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch("/api/admin/products"),
        fetch("/api/admin/categories"),
      ]);
      const prods = await prodRes.json();
      const cats = await catRes.json();
      setProducts(Array.isArray(prods) ? prods : []);
      setCategories(Array.isArray(cats) ? cats : []);
    } catch {
      console.error("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingProduct
        ? `/api/admin/products/${editingProduct.id}`
        : "/api/admin/products";
      const method = editingProduct ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setShowForm(false);
      setEditingProduct(null);
      resetForm();
      loadData();
    } catch {
      alert("Erro ao salvar produto");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    loadData();
  };

  const handleEdit = (product: Product) => {
    setForm({
      title: product.title,
      description: product.description,
      image: product.image,
      price: String(product.price),
      originalPrice: product.originalPrice ? String(product.originalPrice) : "",
      platform: product.platform,
      affiliateLink: product.affiliateLink,
      categoryId: product.categoryId,
      featured: product.featured,
      active: product.active,
    });
    setEditingProduct(product);
    setShowForm(true);
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      image: "",
      price: "",
      originalPrice: "",
      platform: "shopee",
      affiliateLink: "",
      categoryId: categories[0]?.id || "",
      featured: false,
      active: true,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Produtos</h1>
        <button
          onClick={() => {
            resetForm();
            setEditingProduct(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors text-sm"
        >
          <Plus size={16} /> Novo Produto
        </button>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">
                {editingProduct ? "Editar Produto" : "Novo Produto"}
              </h2>
              <button onClick={() => { setShowForm(false); setEditingProduct(null); }}>
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none text-sm"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem *</label>
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none text-sm"
                    placeholder="https://..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preço *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preço Original</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.originalPrice}
                    onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plataforma *</label>
                  <select
                    value={form.platform}
                    onChange={(e) => setForm({ ...form, platform: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none text-sm"
                  >
                    <option value="shopee">Shopee</option>
                    <option value="magalu">Magazine Luiza</option>
                    <option value="mercadolivre">Mercado Livre</option>
                    <option value="amazon">Amazon</option>
                    <option value="americanas">Americanas</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoria *</label>
                  <select
                    value={form.categoryId}
                    onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none text-sm"
                    required
                  >
                    <option value="">Selecione...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link de Afiliado *</label>
                  <input
                    type="url"
                    value={form.affiliateLink}
                    onChange={(e) => setForm({ ...form, affiliateLink: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none text-sm"
                    placeholder="https://..."
                    required
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm">Destaque</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.active}
                      onChange={(e) => setForm({ ...form, active: e.target.checked })}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm">Ativo</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors text-sm"
                >
                  {editingProduct ? "Salvar Alterações" : "Criar Produto"}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditingProduct(null); }}
                  className="px-6 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 text-sm"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {products.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-400">Nenhum produto cadastrado ainda.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Produto</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 hidden sm:table-cell">Plataforma</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Preço</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 hidden md:table-cell">Cliques</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 hidden md:table-cell">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {product.image && (
                          <img
                            src={product.image}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                          />
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-800 line-clamp-1">{product.title}</p>
                          <p className="text-xs text-gray-400">{product.category?.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{product.platform}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-orange-600">
                        R$ {product.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-sm text-gray-600">{product.clicks}</span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`text-xs px-2 py-1 rounded-full ${product.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {product.active ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-1.5 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
