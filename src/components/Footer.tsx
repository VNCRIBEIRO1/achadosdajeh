import Link from "next/link";
import { Instagram, Mail, Heart, ArrowRight, Shield, MapPin } from "lucide-react";

export default function Footer() {
  const categories = [
    { name: "Eletrônicos", slug: "eletronicos" },
    { name: "Moda", slug: "moda" },
    { name: "Casa e Decoração", slug: "casa" },
    { name: "Beleza", slug: "beleza" },
    { name: "Esportes", slug: "esportes" },
  ];

  return (
    <footer>
      {/* Newsletter */}
      <div className="bg-orange-500">
        <div className="site-container py-10 sm:py-12">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-white text-lg sm:text-xl font-bold mb-1.5">
              Receba as melhores ofertas
            </h3>
            <p className="text-orange-200 text-sm mb-5">
              Cadastre-se e seja a primeira a saber dos achados
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-2.5 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors text-sm"
              >
                Quero Ofertas
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-gray-900 text-gray-400">
        <div className="site-container py-10 sm:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-orange-500 flex items-center justify-center">
                  <span className="text-white font-black text-sm">A</span>
                </div>
                <h3 className="text-base font-bold text-white">Achados da Jeh</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                Curadoria especial dos melhores produtos da internet com preços incríveis.
              </p>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-orange-500 p-2 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-orange-500 p-2 transition-colors"
                  aria-label="E-mail"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
                Categorias
              </h4>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/categoria/${cat.slug}`}
                      className="text-sm text-gray-500 hover:text-orange-400 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Platforms */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
                Plataformas
              </h4>
              <ul className="space-y-2">
                <li className="text-sm text-gray-500">Shopee</li>
                <li className="text-sm text-gray-500">Magazine Luiza</li>
                <li className="text-sm text-gray-500">Mercado Livre</li>
                <li className="text-sm text-gray-500">Amazon</li>
              </ul>
            </div>

            {/* Info */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
                Informações
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/sobre" className="text-sm text-gray-500 hover:text-orange-400 transition-colors">
                    Sobre nós
                  </Link>
                </li>
                <li>
                  <Link href="/politica-privacidade" className="text-sm text-gray-500 hover:text-orange-400 transition-colors">
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800">
          <div className="site-container py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span>&copy; 2026 Achados da Jeh</span>
                <span className="text-gray-700">&middot;</span>
                <span className="flex items-center gap-0.5">
                  Feito com <Heart className="text-red-500" size={9} />
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Shield size={11} className="text-green-500" />
                  Links de afiliados
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <MapPin size={11} />
                  LGPD
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
