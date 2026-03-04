import Link from "next/link";
import { Instagram, Mail, Heart, ArrowRight, MapPin, Shield } from "lucide-react";

export default function Footer() {
  const categories = [
    { name: "Eletrônicos", slug: "eletronicos" },
    { name: "Moda", slug: "moda" },
    { name: "Casa e Decoração", slug: "casa" },
    { name: "Beleza", slug: "beleza" },
    { name: "Esportes", slug: "esportes" },
  ];

  return (
    <footer className="relative">
      {/* Newsletter */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-orange-500 to-pink-500">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white rounded-full" />
        </div>
        <div className="relative site-container py-10 sm:py-14">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">
              Receba as melhores ofertas!
            </h3>
            <p className="text-orange-100 text-sm sm:text-base mb-6">
              Cadastre-se e seja a primeira a saber dos melhores achados da internet
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-5 py-3 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all text-sm shadow-lg hover:shadow-xl"
              >
                Quero Ofertas
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-gray-900 text-gray-300">
        <div className="site-container py-12 sm:py-16">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-black text-lg">A</span>
                </div>
                <h3 className="text-lg font-bold text-white">Achados da Jeh</h3>
              </div>
              <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                Curadoria especial dos melhores produtos da internet com os preços mais incríveis.
              </p>
              <div className="flex gap-2.5">
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-orange-500 p-2.5 rounded-xl transition-all hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-orange-500 p-2.5 rounded-xl transition-all hover:scale-110"
                  aria-label="E-mail"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Categorias
              </h4>
              <ul className="space-y-2.5">
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
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Plataformas
              </h4>
              <ul className="space-y-2.5">
                <li className="text-sm text-gray-400">Shopee</li>
                <li className="text-sm text-gray-400">Magazine Luiza</li>
                <li className="text-sm text-gray-400">Mercado Livre</li>
                <li className="text-sm text-gray-400">Amazon</li>
              </ul>
            </div>

            {/* Info */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Informações
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/sobre" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                    Sobre nós
                  </Link>
                </li>
                <li>
                  <Link href="/politica-privacidade" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/termos" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                    Termos de Uso
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800">
          <div className="site-container py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>© 2026 Achados da Jeh</span>
                <span className="text-gray-700">•</span>
                <span className="flex items-center gap-1">
                  Feito com <Heart className="text-red-500" size={10} />
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Shield size={12} className="text-green-500" />
                  Links de afiliados
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <MapPin size={12} />
                  LGPD Compliant
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
