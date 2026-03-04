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
    <footer className="bg-white border-t border-gray-200">
      <div className="site-container py-12 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-[#FF5733] rounded-lg flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">A</span>
              </div>
              <span className="font-heading font-bold text-[#212529]">
                Achados da Jeh
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              Curadoria especial dos melhores produtos da internet com preços incríveis.
            </p>
            <div className="flex gap-2">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-[#FF5733] hover:text-white text-gray-500 flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-[#FF5733] hover:text-white text-gray-500 flex items-center justify-center transition-all"
                aria-label="E-mail"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-semibold text-[#212529] text-sm mb-4">
              Categorias
            </h4>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categoria/${cat.slug}`}
                    className="text-sm text-gray-500 hover:text-[#FF5733] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="font-heading font-semibold text-[#212529] text-sm mb-4">
              Plataformas
            </h4>
            <ul className="space-y-2.5">
              <li className="text-sm text-gray-500">Shopee</li>
              <li className="text-sm text-gray-500">Magazine Luiza</li>
              <li className="text-sm text-gray-500">Mercado Livre</li>
              <li className="text-sm text-gray-500">Amazon</li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-heading font-semibold text-[#212529] text-sm mb-4">
              Informações
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/sobre" className="text-sm text-gray-500 hover:text-[#FF5733] transition-colors">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidade" className="text-sm text-gray-500 hover:text-[#FF5733] transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/ofertas" className="text-sm text-gray-500 hover:text-[#FF5733] transition-colors">
                  Ofertas
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-100">
        <div className="site-container py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
            <span>&copy; 2026 Achados da Jeh. Todos os direitos reservados.</span>
            <span className="flex items-center gap-1">
              Feito com <Heart className="text-[#FF5733]" size={10} /> para você
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
