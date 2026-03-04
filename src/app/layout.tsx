import type { Metadata, Viewport } from "next";
import { Montserrat, Lato } from "next/font/google";
import "./globals.css";
import BottomBar from "@/components/BottomBar";
import Script from "next/script";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FF5733",
};

export const metadata: Metadata = {
  title: {
    default: "Achados da Jeh | Curadoria de Ofertas",
    template: "%s | Achados da Jeh",
  },
  description:
    "Curadoria especial dos melhores produtos com preços incríveis. Ofertas selecionadas da Shopee, Magazine Luiza, Mercado Livre e Amazon.",
  keywords: [
    "achados",
    "promoções",
    "ofertas",
    "shopee",
    "magazine luiza",
    "mercado livre",
    "cupons",
    "desconto",
    "melhores preços",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Achados da Jeh",
    title: "Achados da Jeh | Curadoria de Ofertas",
    description:
      "Curadoria especial dos melhores produtos com preços incríveis.",
  },
  robots: { index: true, follow: true },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Achados da Jeh",
  },
  formatDetection: { telephone: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body
        className={`${montserrat.variable} ${lato.variable} font-body antialiased`}
        style={{ background: "#F8F9FA", color: "#212529" }}
      >
        <div className="relative pb-bottom-bar">{children}</div>
        <BottomBar />
        <Script
          id="sw-register"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').catch(() => {});
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
