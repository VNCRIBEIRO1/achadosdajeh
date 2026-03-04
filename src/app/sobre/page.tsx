import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nós",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Sobre a Achados da Jeh</h1>
        <div className="prose prose-gray max-w-none space-y-4">
          <p className="text-gray-600 leading-relaxed">
            O <strong>Achados da Jeh</strong> é um catálogo online de curadoria de produtos, onde selecionamos os melhores achados da internet com os preços mais incríveis para você!
          </p>
          <p className="text-gray-600 leading-relaxed">
            Nosso objetivo é facilitar a sua vida na hora de encontrar aquele produto perfeito com o melhor preço. Fazemos uma curadoria cuidadosa em plataformas como <strong>Shopee</strong>, <strong>Magazine Luiza</strong>, <strong>Mercado Livre</strong> e <strong>Amazon</strong> para trazer as melhores ofertas diretamente para você.
          </p>
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mt-6">
            <h2 className="text-lg font-bold text-orange-800 mb-2">Aviso Importante</h2>
            <p className="text-sm text-orange-700">
              Este site contém links de afiliados. Isso significa que quando você compra um produto através dos nossos links, podemos receber uma pequena comissão, sem nenhum custo adicional para você. Essa comissão nos ajuda a manter o site funcionando e continuar trazendo as melhores ofertas!
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
