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
        <div className="bg-white border-b border-gray-100">
          <div className="site-container py-8 sm:py-10">
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
              <Link href="/" className="hover:text-[#FF5733] transition-colors">
                Início
              </Link>
              <ChevronRight size={12} />
              <span className="text-[#212529] font-medium">
                Política de Privacidade
              </span>
            </nav>
            <h1 className="font-heading text-xl sm:text-2xl font-bold text-[#212529]">
              Política de Privacidade
            </h1>
          </div>
        </div>

        <div className="site-container py-6 sm:py-8" style={{ maxWidth: "860px" }}>
          <div className="bg-white rounded-xl border border-gray-100 p-6 sm:p-10">
            <p className="text-xs text-gray-400 mb-6">
              Última atualização: Março de 2026
            </p>

            <div className="space-y-6">
              {[
                {
                  title: "1. Informações Coletadas",
                  text: "Coletamos apenas informações mínimas necessárias para o funcionamento do site, como dados de navegação anônimos através de cookies de analytics.",
                },
                {
                  title: "2. Uso dos Dados",
                  text: "Os dados coletados são utilizados exclusivamente para melhorar a experiência de navegação e entender quais conteúdos são mais relevantes para nossos usuários.",
                },
                {
                  title: "3. Links de Afiliados",
                  text: "Este site contém links de afiliados para plataformas como Shopee, Magazine Luiza, Mercado Livre e Amazon. Ao clicar nesses links, você será redirecionado para os respectivos sites, que possuem suas próprias políticas de privacidade.",
                },
                {
                  title: "4. LGPD",
                  text: "Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), garantimos o direito à privacidade e proteção dos dados pessoais dos nossos usuários.",
                },
                {
                  title: "5. Contato",
                  text: "Para dúvidas sobre privacidade, entre em contato através do nosso Instagram.",
                },
              ].map((section) => (
                <div key={section.title}>
                  <h2 className="font-heading text-sm font-semibold text-[#212529] mb-2">
                    {section.title}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {section.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
