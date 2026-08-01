'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ThankYouAmazonPage() {
  const associateTag = "materialistch-20";
  const asin = "B0FMN5PDZ4";
  const amazonUrl = `https://www.amazon.com/dp/${asin}?tag=${associateTag}&maas=maas_mc_google_ads_conversion&ref_=mc_google_ads`;

  useEffect(() => {
    // Fire Google Ads & Analytics Conversion Event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-18364987806',
        'value': 14.99,
        'currency': 'USD'
      });
    }

    // Auto-redirect to Amazon after 2 seconds
    const timer = setTimeout(() => {
      window.location.href = amazonUrl;
    }, 2200);

    return () => clearTimeout(timer);
  }, [amazonUrl]);

  return (
    <main className="min-h-screen bg-concrete text-ash selection:bg-signal selection:text-concrete flex flex-col justify-center items-center px-6 py-24 text-center">
      <div className="max-w-2xl bg-slate p-8 md:p-12 border border-amber/30 rounded-lg shadow-2xl">
        <div className="inline-block bg-amber text-concrete px-4 py-1 font-mono text-xs font-bold uppercase tracking-widest mb-6 rounded-full">
          Redirecting to Amazon
        </div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
          Thank You for Supporting <br/>
          <span className="italic font-serif font-normal text-amber">Materialist Christianity</span>
        </h1>

        <p className="text-base font-mono text-muted mb-8 leading-relaxed">
          Your interest in the mechanics of moral motion means everything. We are transferring you to the official Amazon book page with your author referral discount parameters attached...
        </p>

        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber border-t-transparent rounded-full animate-spin mb-4"></div>

          <a
            href={amazonUrl}
            className="px-8 py-3.5 bg-amber text-concrete hover:bg-white text-sm font-mono uppercase font-bold tracking-widest rounded transition-all inline-block shadow-lg"
          >
            Click Here if Not Redirected Automatically &rarr;
          </a>

          <Link href="/" className="text-xs font-mono text-muted hover:text-ash mt-4 underline">
            &larr; Return to Materialist Christianity Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
