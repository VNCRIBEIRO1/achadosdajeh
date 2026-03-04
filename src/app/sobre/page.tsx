import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ChevronRight, Heart, ShieldCheck, Sparkles, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nós",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="site-container py-6 sm:py-8" style={{ maxWidth: '900px' }}>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-orange-500 transition-colors">Início</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700 font-medium">Sobre</span>
        </nav>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Hero */}
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-8 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Sobre a Achados da Jeh</h1>
            <p className="text-orange-100 text-sm sm:text-base">Curadoria especial dos melhores produtos da internet</p>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-10 space-y-6">
            <p className="text-gray-600 leading-relaxed text-base">
              O <strong className="text-gray-900">Achados da Jeh</strong> é um catálogo online de curadoria de produtos, onde selecionamos os melhores achados da internet com os preços mais incríveis para você!
            </p>
            <p className="text-gray-600 leading-relaxed text-base">
              Nosso objetivo é facilitar a sua vida na hora de encontrar aquele produto perfeito com o melhor preço. Fazemos uma curadoria cuidadosa em plataformas como <strong className="text-gray-900">Shopee</strong>, <strong className="text-gray-900">Magazine Luiza</strong>, <strong className="text-gray-900">Mercado Livre</strong> e <strong className="text-gray-900">Amazon</strong> para trazer as melhores ofertas diretamente para você.
            </p>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
              <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-orange-50">
                <div className="bg-gradient-to-br from-orange-500 to-pink-500 p-2.5 rounded-xl mb-3">
                  <Sparkles className="text-white" size={20} />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">Curadoria</h3>
                <p className="text-xs text-gray-500 mt-1">Produtos selecionados com carinho</p>
              </div>
              <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-green-50">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-2.5 rounded-xl mb-3">
                  <ShieldCheck className="text-white" size={20} />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">Confiança</h3>
                <p className="text-xs text-gray-500 mt-1">Lojas verificadas e seguras</p>
              </div>
              <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-blue-50">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-2.5 rounded-xl mb-3">
                  <Users className="text-white" size={20} />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">Comunidade</h3>
                <p className="text-xs text-gray-500 mt-1">Milhares de pessoas economizando</p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 p-2 rounded-xl shrink-0">
                  <Heart className="text-amber-600" size={16} />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-amber-900 mb-1">Transparência</h2>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    Este site contém links de afiliados. Quando você compra um produto através dos nossos links, podemos receber uma pequena comissão, sem nenhum custo adicional para você. Essa comissão nos ajuda a manter o site e continuar trazendo as melhores ofertas!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
