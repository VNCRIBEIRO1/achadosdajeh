import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Achados da Jeh | Os Melhores Achados da Internet",
    template: "%s | Achados da Jeh",
  },
  description:
    "Descubra os melhores produtos com preços incríveis! Curadoria especial de ofertas da Shopee, Magazine Luiza e Mercado Livre. Economize agora!",
  keywords: [
    "achados",
    "promoções",
    "ofertas",
    "shopee",
    "magazine luiza",
    "mercado livre",
    "produtos afiliados",
    "melhores preços",
    "cupons",
    "desconto",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Achados da Jeh",
    title: "Achados da Jeh | Os Melhores Achados da Internet",
    description:
      "Descubra os melhores produtos com preços incríveis! Curadoria especial de ofertas.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} font-sans antialiased bg-gray-50 text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
