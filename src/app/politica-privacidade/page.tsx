import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Política de Privacidade</h1>
        <div className="prose prose-gray max-w-none space-y-4 text-gray-600">
          <p>Última atualização: Março de 2026</p>
          
          <h2 className="text-xl font-bold text-gray-800">1. Informações Coletadas</h2>
          <p>Coletamos apenas informações mínimas necessárias para o funcionamento do site, como dados de navegação anônimos através de cookies de analytics.</p>
          
          <h2 className="text-xl font-bold text-gray-800">2. Uso dos Dados</h2>
          <p>Os dados coletados são utilizados exclusivamente para melhorar a experiência de navegação e entender quais conteúdos são mais relevantes para nossos usuários.</p>
          
          <h2 className="text-xl font-bold text-gray-800">3. Links de Afiliados</h2>
          <p>Este site contém links de afiliados para plataformas como Shopee, Magazine Luiza, Mercado Livre e Amazon. Ao clicar nesses links, você será redirecionado para os respectivos sites, que possuem suas próprias políticas de privacidade.</p>
          
          <h2 className="text-xl font-bold text-gray-800">4. LGPD</h2>
          <p>Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), garantimos o direito à privacidade e proteção dos dados pessoais dos nossos usuários.</p>
          
          <h2 className="text-xl font-bold text-gray-800">5. Contato</h2>
          <p>Para dúvidas sobre privacidade, entre em contato através do nosso Instagram.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
