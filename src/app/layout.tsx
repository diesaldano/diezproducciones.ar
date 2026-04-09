import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Montserrat } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { ThemeProvider } from "@/lib/theme-context";
import { BackToTop } from "@/components/back-to-top";
import "./globals.css";

// Optimize fonts with next/font
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bebas",
  preload: true, // ✅ Preload hero font
});

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

// Viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#000000",
};

// Complete SEO metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://diezproducciones.ar"),
  title: "DIEZ PRODUCCIONES - Autos Robados | Preventa de Entradas y Bebidas",
  description: "Conocé a Autos Robados en vivo. Sonido crudo, sin filtro. Entradas y bebidas en preventa. Diez Producciones presenta.",
  keywords: [
    "Autos Robados",
    "concierto",
    "rock",
    "preventa",
    "bebidas",
    "Diez Producciones",
    "evento en vivo",
    "Tucumán",
    "argentina"
  ],
  authors: [{ name: "Diez Producciones" }],
  creator: "Diez Producciones",
  publisher: "Diez Producciones",
  category: "Event",
  classification: "Music Event",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://diezproducciones.ar",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://diezproducciones.ar",
    siteName: "Diez Producciones",
    title: "DIEZ PRODUCCIONES - Autos Robados | Preventa",
    description: "Sonido crudo, sin filtro. Escena independiente que mueve. Entradas y bebidas en preventa.",
    images: [
      {
        url: "/fotos/foto-promo.jpg",
        width: 1200,
        height: 630,
        alt: "Autos Robados - Diez Producciones",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@diezproducciones.ar",
    creator: "@diezproducciones.ar",
    title: "DIEZ PRODUCCIONES - Autos Robados | Preventa",
    description: "Sonido crudo, sin filtro. Escena independiente que mueve.",
    images: ["/fotos/foto-promo.jpg"],
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${bebasNeue.variable} ${montserrat.variable}`}>
      <head>
        {/* Google Tag Manager */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="canonical" href="https://diezproducciones.ar" />
        <link rel="icon" href="/favicon.svg" />
        
        {/* ✅ PHASE 2: Font & Resource Optimization */}
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Prefetch critical libraries */}
        <link rel="prefetch" href="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" as="script" />
        <link rel="prefetch" href="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" as="script" />
        
        {/* Prefetch hero video poster for better perceived performance */}
        <link rel="prefetch" href="/video/hero-fallback.jpg" as="image" imageSrcSet="/video/hero-fallback.jpg" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://supabase.co" />
        {/* Schema.org structured data for Event */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicEvent",
              name: "Autos Robados - Diez Producciones",
              description: "Sonido crudo, sin filtro. Escena independiente que mueve.",
              startDate: "2025-04-24T21:00:00-03:00",
              endDate: "2025-04-24T23:59:00-03:00",
              location: {
                "@type": "Place",
                name: "Diva Rock",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Rivadavia 13200",
                  addressLocality: "Buenos Aires",
                  addressCountry: "AR",
                },
              },
              organizer: {
                "@type": "Organization",
                name: "Diez Producciones",
                url: "https://diezproducciones.ar",
              },
              offers: {
                "@type": "Offer",
                url: "https://preventa.diezproducciones.ar",
                availability: "https://schema.org/PreOrder",
                priceCurrency: "ARS",
                price: "25000",
              },
            }),
          }}
        />
        {/* Theme setup script (runs before render to prevent FOUC) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('landing-theme') || 'light';
                const html = document.documentElement;
                if (theme === 'dark') {
                  html.classList.add('dark');
                  html.classList.remove('light');
                } else {
                  html.classList.add('light');
                  html.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
