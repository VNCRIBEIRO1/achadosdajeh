import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import BottomBar from "@/components/BottomBar";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#F97316",
};

export const metadata: Metadata = {
  title: {
    default: "Achados da Jeh | Os Melhores Achados da Internet",
    template: "%s | Achados da Jeh",
  },
  description:
    "Descubra os melhores produtos com preços incríveis! Curadoria especial de ofertas da Shopee, Magazine Luiza e Mercado Livre.",
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
    title: "Achados da Jeh | Os Melhores Achados da Internet",
    description:
      "Descubra os melhores produtos com preços incríveis! Curadoria especial de ofertas.",
  },
  robots: { index: true, follow: true },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Achados da Jeh",
  },
  formatDetection: {
    telephone: false,
  },
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
        className={`${poppins.variable} font-sans antialiased bg-white text-gray-900`}
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
