import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Materialist Christianity | Ezra Byrd",
  description: "The forensic analysis of why you are still standing. A record of what survived betrayal, discovered in motion through labor and recognition.",
  openGraph: {
    title: "Materialist Christianity",
    description: "Forensic analysis of survival by Ezra Byrd.",
    type: "website",
    url: "https://materialistchristianity.org",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": "Materialist Christianity",
    "author": {
      "@type": "Person",
      "name": "Ezra Byrd"
    },
    "description": "A forensic analysis of moral structures and historical materialism.",
    "publisher": {
      "@type": "Organization",
      "name": "Materialist Christianity Press"
    }
  };

  return (
    <html lang="en" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-signal-red selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
