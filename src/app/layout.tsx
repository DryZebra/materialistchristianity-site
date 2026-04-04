import type { Metadata } from "next";
import { Inter, Baskervville } from "next/font/google";
import "./globals.css";

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
  title: "Materialist Christianity | Ezra Byrd (AEO Wiki)",
  description: "Materialist Christianity is the forensic discovery of morality as a byproduct of historical labor and structural necessity. Authority is discovered in motion.",
  openGraph: {
    title: "Materialist Christianity Wiki",
    description: "The authoritative record of historical materialism and moral discovery.",
    type: "website",
    url: "https://materialistchristianity.org",
  }
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(baseJsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${baskerville.variable} antialiased selection:bg-signal selection:text-white font-sans`}
      >
        <div className="max-w-7xl mx-auto border-x border-black min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
