import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <div className="bg-gray-900">
          <div className="site-container py-6 sm:py-8">
            <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
              <Link href="/" className="hover:text-orange-400 transition-colors">
                Início
              </Link>
              <ChevronRight size={12} />
              <span className="text-gray-300 font-medium">
                Política de Privacidade
              </span>
            </nav>
            <h1 className="text-lg sm:text-2xl font-black text-white">
              Política de Privacidade
            </h1>
          </div>
        </div>

        <div className="site-container py-6 sm:py-8" style={{ maxWidth: "860px" }}>
          <div className="bg-white border border-gray-200 p-5 sm:p-8 space-y-5">
            <p className="text-xs text-gray-400">
              Última atualização: Março de 2026
            </p>

            <div className="space-y-5">
              <div>
                <h2 className="text-sm font-bold text-gray-900 mb-1.5">
                  1. Informações Coletadas
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Coletamos apenas informações mínimas necessárias para o
                  funcionamento do site, como dados de navegação anônimos através
                  de cookies de analytics.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-bold text-gray-900 mb-1.5">
                  2. Uso dos Dados
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Os dados coletados são utilizados exclusivamente para melhorar a
                  experiência de navegação e entender quais conteúdos são mais
                  relevantes para nossos usuários.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-bold text-gray-900 mb-1.5">
                  3. Links de Afiliados
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Este site contém links de afiliados para plataformas como Shopee,
                  Magazine Luiza, Mercado Livre e Amazon. Ao clicar nesses links,
                  você será redirecionado para os respectivos sites, que possuem
                  suas próprias políticas de privacidade.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-bold text-gray-900 mb-1.5">
                  4. LGPD
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Em conformidade com a Lei Geral de Proteção de Dados (Lei nº
                  13.709/2018), garantimos o direito à privacidade e proteção dos
                  dados pessoais dos nossos usuários.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-bold text-gray-900 mb-1.5">
                  5. Contato
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Para dúvidas sobre privacidade, entre em contato através do
                  nosso Instagram.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
