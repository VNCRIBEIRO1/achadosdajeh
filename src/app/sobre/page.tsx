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
      <main>
        <div className="bg-orange-500">
          <div className="site-container py-8 sm:py-10">
            <nav className="flex items-center gap-1.5 text-xs text-orange-200 mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                Início
              </Link>
              <ChevronRight size={12} />
              <span className="text-white font-medium">Sobre</span>
            </nav>
            <h1 className="text-xl sm:text-3xl font-black text-white mb-1">
              Sobre a Achados da Jeh
            </h1>
            <p className="text-orange-200 text-sm">
              Curadoria especial dos melhores produtos da internet
            </p>
          </div>
        </div>

        <div className="site-container py-6 sm:py-8" style={{ maxWidth: "860px" }}>
          <div className="bg-white border border-gray-200 overflow-hidden">
            <div className="p-5 sm:p-8 space-y-5">
              <p className="text-gray-600 text-sm leading-relaxed">
                O{" "}
                <strong className="text-gray-900">Achados da Jeh</strong> é um
                catálogo online de curadoria de produtos, onde selecionamos os
                melhores achados da internet com os preços mais incríveis para
                você!
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nosso objetivo é facilitar a sua vida na hora de encontrar aquele
                produto perfeito com o melhor preço. Fazemos uma curadoria
                cuidadosa em plataformas como{" "}
                <strong className="text-gray-900">Shopee</strong>,{" "}
                <strong className="text-gray-900">Magazine Luiza</strong>,{" "}
                <strong className="text-gray-900">Mercado Livre</strong> e{" "}
                <strong className="text-gray-900">Amazon</strong> para trazer as
                melhores ofertas diretamente para você.
              </p>

              {/* Values */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-3">
                <div className="flex flex-col items-center text-center p-4 bg-orange-50 border border-orange-100">
                  <Sparkles className="text-orange-500 mb-2" size={20} />
                  <h3 className="font-bold text-gray-900 text-xs">Curadoria</h3>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    Produtos selecionados com carinho
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-green-50 border border-green-100">
                  <ShieldCheck className="text-green-600 mb-2" size={20} />
                  <h3 className="font-bold text-gray-900 text-xs">Confiança</h3>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    Lojas verificadas e seguras
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-blue-50 border border-blue-100">
                  <Users className="text-blue-600 mb-2" size={20} />
                  <h3 className="font-bold text-gray-900 text-xs">Comunidade</h3>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    Milhares de pessoas economizando
                  </p>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-amber-50 border border-amber-200 p-4">
                <div className="flex items-start gap-2.5">
                  <Heart className="text-amber-600 shrink-0 mt-0.5" size={14} />
                  <div>
                    <h2 className="text-xs font-bold text-amber-900 mb-1">
                      Transparência
                    </h2>
                    <p className="text-xs text-amber-700 leading-relaxed">
                      Este site contém links de afiliados. Quando você compra um
                      produto através dos nossos links, podemos receber uma
                      pequena comissão, sem nenhum custo adicional para você.
                    </p>
                  </div>
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
