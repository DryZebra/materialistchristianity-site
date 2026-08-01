import type { Metadata } from "next";
import { Inter, Baskervville } from "next/font/google";
import "./globals.css";
import 'katex/dist/katex.min.css';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const baskerville = Baskervville({
  variable: "--font-baskerville",
  weight: "400",
  subsets: ["latin"],
  style: "italic",
});

export const metadata: Metadata = {
  title: "Materialist Christianity | Forensic Discovery of Moral Motion & Mechanics",
  description: "Materialist Christianity maps the physical, thermodynamic, and historical sediment of morality. Proving scripture is survival technology for working communities under pressure.",
  verification: {
    google: "google43f7cd79c820a35b",
  },
  openGraph: {
    title: "Materialist Christianity | Ezra Byrd — Journeyman Electrician",
    description: "Matter precedes hierarchy. Morality as a physical, thermodynamic, and historical reality.",
    type: "website",
    url: "https://materialistchristianity.org",
    images: [
      {
        url: "https://materialistchristianity.org/square_ad_asset.jpg",
        width: 1200,
        height: 1200,
        alt: "Materialist Christianity Book Cover Artwork by Ezra Byrd",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Materialist Christianity | Ezra Byrd",
    description: "The physical, thermodynamic, and historical reality of morality and scripture.",
    images: ["https://materialistchristianity.org/square_ad_asset.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://materialistchristianity.org/#organization",
        "name": "Materialist Christianity Press",
        "url": "https://materialistchristianity.org"
      },
      {
        "@type": "Person",
        "@id": "https://materialistchristianity.org/#author",
        "name": "Ezra Byrd",
        "jobTitle": "Author",
        "description": "Author of Materialist Christianity and historical materialist."
      },
      {
        "@type": "Product",
        "name": "Materialist Christianity",
        "author": { "@id": "https://materialistchristianity.org/#author" },
        "offers": [
          {
            "@type": "Offer",
            "name": "Paperback",
            "price": "19.99",
            "priceCurrency": "USD",
            "url": "https://www.amazon.com/dp/B0FMN5PDZ4"
          },
          {
            "@type": "Offer",
            "name": "E-Book",
            "price": "9.99",
            "priceCurrency": "USD",
            "url": "https://www.amazon.com/dp/B0FMN5PDZ4"
          }
        ]
      }
    ]
  };

  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="google-site-verification" content="google43f7cd79c820a35b.html" />
        <meta name="google-site-verification" content="google43f7cd79c820a35b" />
        {/* Google Ads Tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18364987806" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18364987806');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(baseJsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${baskerville.variable} antialiased selection:bg-signal selection:text-white font-sans`}
      >
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
