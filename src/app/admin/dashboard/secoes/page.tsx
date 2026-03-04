"use client";

import { useState } from "react";
import { LayoutList, GripVertical, Palette, Eye, EyeOff, Save, Plus, Trash2 } from "lucide-react";

interface Section {
  id: string;
  title: string;
  type: "carousel" | "grid" | "banner";
  color: string;
  borderColor: string;
  visible: boolean;
  filter: "featured" | "recent" | "all";
  limit: number;
}

const defaultSections: Section[] = [
  {
    id: "destaques",
    title: "Destaques da Jeh",
    type: "carousel",
    color: "from-orange-500 to-orange-600",
    borderColor: "border-orange-200",
    visible: true,
    filter: "featured",
    limit: 12,
  },
  {
    id: "ofertas",
    title: "Ofertas que você vai amar",
    type: "carousel",
    color: "from-pink-500 to-rose-500",
    borderColor: "border-pink-200",
    visible: true,
    filter: "recent",
    limit: 12,
  },
  {
    id: "todos",
    title: "Todos os Achados",
    type: "grid",
    color: "from-gray-700 to-gray-800",
    borderColor: "border-gray-200",
    visible: true,
    filter: "all",
    limit: 12,
  },
];

const gradientOptions = [
  { label: "Laranja", value: "from-orange-500 to-orange-600", border: "border-orange-200", preview: "bg-gradient-to-r from-orange-500 to-orange-600" },
  { label: "Rosa", value: "from-pink-500 to-rose-500", border: "border-pink-200", preview: "bg-gradient-to-r from-pink-500 to-rose-500" },
  { label: "Azul", value: "from-blue-500 to-blue-600", border: "border-blue-200", preview: "bg-gradient-to-r from-blue-500 to-blue-600" },
  { label: "Verde", value: "from-green-500 to-emerald-500", border: "border-green-200", preview: "bg-gradient-to-r from-green-500 to-emerald-500" },
  { label: "Roxo", value: "from-purple-500 to-violet-500", border: "border-purple-200", preview: "bg-gradient-to-r from-purple-500 to-violet-500" },
  { label: "Vermelho", value: "from-red-500 to-red-600", border: "border-red-200", preview: "bg-gradient-to-r from-red-500 to-red-600" },
  { label: "Escuro", value: "from-gray-700 to-gray-800", border: "border-gray-200", preview: "bg-gradient-to-r from-gray-700 to-gray-800" },
];

export default function SecoesPage() {
  const [sections, setSections] = useState<Section[]>(defaultSections);
  const [saved, setSaved] = useState(false);

  const updateSection = (id: string, updates: Partial<Section>) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
    setSaved(false);
  };

  const removeSection = (id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
    setSaved(false);
  };

  const addSection = () => {
    const newId = `section-${Date.now()}`;
    setSections((prev) => [
      ...prev,
      {
        id: newId,
        title: "Nova Seção",
        type: "carousel",
        color: "from-blue-500 to-blue-600",
        borderColor: "border-blue-200",
        visible: true,
        filter: "recent",
        limit: 12,
      },
    ]);
    setSaved(false);
  };

  const handleSave = () => {
    // In a real app, this would POST to an API
    localStorage.setItem("homeSections", JSON.stringify(sections));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Seções da Home</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gerencie os cards de produtos exibidos na página inicial
          </p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            saved
              ? "bg-green-500 text-white"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
        >
          <Save size={16} />
          {saved ? "Salvo!" : "Salvar Alterações"}
        </button>
      </div>

      {/* Preview of current layout */}
      <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4 mb-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Preview da Home
        </p>
        <div className="space-y-2">
          <div className="bg-gradient-to-r from-orange-400 to-amber-400 rounded-lg h-12 flex items-center px-4">
            <span className="text-white text-xs font-bold">Banner Principal</span>
          </div>
          <div className="flex gap-2 justify-center py-1">
            {["Elet.", "Moda", "Casa", "Beleza", "Esportes"].map((c) => (
              <div key={c} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[6px] text-gray-500 font-bold">
                {c}
              </div>
            ))}
          </div>
          {sections.filter(s => s.visible).map((s) => (
            <div key={s.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className={`bg-gradient-to-r ${s.color} px-3 py-1.5`}>
                <span className="text-white text-[10px] font-bold">{s.title}</span>
              </div>
              <div className="flex gap-1 p-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="w-10 h-12 bg-gray-100 rounded flex-shrink-0" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sections list */}
      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${
              section.visible ? "border-gray-200" : "border-gray-100 opacity-60"
            }`}
          >
            {/* Section header with gradient preview */}
            <div className={`bg-gradient-to-r ${section.color} px-5 py-3 flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <GripVertical size={16} className="text-white/50 cursor-grab" />
                <LayoutList size={16} className="text-white" />
                <span className="text-white font-bold text-sm">{section.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateSection(section.id, { visible: !section.visible })}
                  className="text-white/70 hover:text-white transition-colors p-1"
                  title={section.visible ? "Ocultar" : "Mostrar"}
                >
                  {section.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button
                  onClick={() => removeSection(section.id)}
                  className="text-white/50 hover:text-red-200 transition-colors p-1"
                  title="Remover"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Section config */}
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Title */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                  Título da Seção
                </label>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateSection(section.id, { title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
                />
              </div>

              {/* Type */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                  Tipo de Layout
                </label>
                <select
                  value={section.type}
                  onChange={(e) => updateSection(section.id, { type: e.target.value as Section["type"] })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
                >
                  <option value="carousel">Carrossel Horizontal</option>
                  <option value="grid">Grade 4 Colunas</option>
                </select>
              </div>

              {/* Filter */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                  Filtro de Produtos
                </label>
                <select
                  value={section.filter}
                  onChange={(e) => updateSection(section.id, { filter: e.target.value as Section["filter"] })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
                >
                  <option value="featured">Destaques</option>
                  <option value="recent">Recentes</option>
                  <option value="all">Todos</option>
                </select>
              </div>

              {/* Limit */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                  Limite de Itens
                </label>
                <input
                  type="number"
                  value={section.limit}
                  onChange={(e) => updateSection(section.id, { limit: parseInt(e.target.value) || 8 })}
                  min={4}
                  max={24}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
                />
              </div>

              {/* Color picker */}
              <div className="sm:col-span-2 lg:col-span-4">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Palette size={12} />
                  Cor do Cabeçalho
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {gradientOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        updateSection(section.id, {
                          color: opt.value,
                          borderColor: opt.border,
                        })
                      }
                      className={`${opt.preview} w-20 h-8 rounded-lg text-[9px] text-white font-bold transition-all ${
                        section.color === opt.value
                          ? "ring-2 ring-offset-2 ring-gray-800 scale-105"
                          : "hover:scale-105"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add section */}
      <button
        onClick={addSection}
        className="mt-4 w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-2xl text-gray-400 hover:border-orange-400 hover:text-orange-500 transition-colors text-sm font-semibold"
      >
        <Plus size={18} />
        Adicionar Nova Seção
      </button>
    </div>
  );
}
