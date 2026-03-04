import Link from "next/link";
import { Instagram, Mail, Heart } from "lucide-react";

export default function Footer() {
  const categories = [
    { name: "Eletrônicos", slug: "eletronicos" },
    { name: "Moda", slug: "moda" },
    { name: "Casa e Decoração", slug: "casa" },
    { name: "Beleza", slug: "beleza" },
    { name: "Esportes", slug: "esportes" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">
            Receba as melhores ofertas!
          </h3>
          <p className="text-orange-100 text-sm mb-4">
            Cadastre-se e seja a primeira a saber dos melhores achados
          </p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 px-4 py-2.5 rounded-full text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-colors text-sm"
            >
              Quero Ofertas!
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">
            Achados da Jeh
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Curadoria especial dos melhores produtos da internet com os preços
            mais incríveis. Selecionados com carinho pra você!
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              className="bg-gray-800 hover:bg-orange-500 p-2 rounded-full transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="bg-gray-800 hover:bg-orange-500 p-2 rounded-full transition-colors"
              aria-label="E-mail"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-semibold mb-3">Categorias</h4>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/categoria/${cat.slug}`}
                  className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Platforms */}
        <div>
          <h4 className="text-white font-semibold mb-3">Plataformas</h4>
          <ul className="space-y-2">
            <li className="text-sm text-gray-400">Shopee</li>
            <li className="text-sm text-gray-400">Magazine Luiza</li>
            <li className="text-sm text-gray-400">Mercado Livre</li>
            <li className="text-sm text-gray-400">Amazon</li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="text-white font-semibold mb-3">Informações</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/sobre"
                className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
              >
                Sobre nós
              </Link>
            </li>
            <li>
              <Link
                href="/politica-privacidade"
                className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
              >
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link
                href="/termos"
                className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
              >
                Termos de Uso
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-500">
            © 2026 Achados da Jeh. Feito com{" "}
            <Heart className="inline text-red-500" size={12} /> |{" "}
            <span className="text-gray-400">
              Este site contém links de afiliados. Ao comprar através dos nossos
              links, podemos receber uma comissão, sem custo adicional para
              você.
            </span>
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Em conformidade com a LGPD (Lei nº 13.709/2018)
          </p>
        </div>
      </div>
    </footer>
  );
}
