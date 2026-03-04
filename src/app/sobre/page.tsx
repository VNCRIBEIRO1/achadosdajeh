import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ChevronRight, Sparkles, ShieldCheck, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nós",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <div className="bg-white border-b border-gray-100">
          <div className="site-container py-8 sm:py-10">
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
              <Link href="/" className="hover:text-[#FF5733] transition-colors">
                Início
              </Link>
              <ChevronRight size={12} />
              <span className="text-[#212529] font-medium">Sobre</span>
            </nav>
            <h1 className="font-heading text-xl sm:text-2xl font-bold text-[#212529]">
              Sobre a Achados da Jeh
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Curadoria especial dos melhores produtos da internet
            </p>
          </div>
        </div>

        <div className="site-container py-6 sm:py-8" style={{ maxWidth: "860px" }}>
          <div className="bg-white rounded-xl border border-gray-100 p-6 sm:p-10 space-y-5">
            <p className="text-gray-600 text-sm leading-relaxed">
              O{" "}
              <strong className="text-[#212529]">Achados da Jeh</strong> é um
              catálogo online de curadoria de produtos, onde selecionamos os
              melhores achados da internet com os preços mais incríveis para
              você.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Nosso objetivo é facilitar a sua vida na hora de encontrar aquele
              produto perfeito com o melhor preço. Fazemos uma curadoria
              cuidadosa em plataformas como{" "}
              <strong className="text-[#212529]">Shopee</strong>,{" "}
              <strong className="text-[#212529]">Magazine Luiza</strong>,{" "}
              <strong className="text-[#212529]">Mercado Livre</strong> e{" "}
              <strong className="text-[#212529]">Amazon</strong> para trazer as
              melhores ofertas diretamente para você.
            </p>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
              {[
                { icon: Sparkles, title: "Curadoria", desc: "Produtos selecionados com carinho", color: "#FF5733" },
                { icon: ShieldCheck, title: "Confiança", desc: "Lojas verificadas e seguras", color: "#198754" },
                { icon: Users, title: "Comunidade", desc: "Milhares de pessoas economizando", color: "#3B82F6" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center text-center p-5 rounded-xl border border-gray-100"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${item.color}12`, color: item.color }}
                  >
                    <item.icon size={20} />
                  </div>
                  <h3 className="font-heading font-semibold text-[#212529] text-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="bg-[#FFF4F1] rounded-xl p-5">
              <h2 className="font-heading text-sm font-semibold text-[#212529] mb-1.5">
                Transparência
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                Este site contém links de afiliados. Quando você compra um
                produto através dos nossos links, podemos receber uma
                pequena comissão, sem nenhum custo adicional para você.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
