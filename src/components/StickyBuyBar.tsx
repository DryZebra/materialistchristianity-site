'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function StickyBuyBar() {
  const pathname = usePathname();

  // Don't show sticky bar on thank-you page to avoid transfer loop
  if (pathname === '/thank-you-amazon') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate/95 backdrop-blur-md border-t-2 border-amber/40 p-3 md:px-6 shadow-[0_-8px_30px_rgba(0,0,0,0.8)] transition-all">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* LEFT: BOOK METADATA */}
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="relative w-9 h-12 rounded overflow-hidden border border-amber/30 hidden xs:block shadow-md">
            <Image 
              src="/square_ad_asset.jpg" 
              alt="Materialist Christianity Book Cover" 
              fill 
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="bg-signal/20 text-signal border border-signal/30 text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded">
                NEW RELEASE
              </span>
              <span className="text-xs md:text-sm font-bold text-white tracking-tight">
                Materialist Christianity <span className="text-muted font-normal">by Ezra Byrd</span>
              </span>
            </div>
            <span className="text-[11px] font-mono text-muted hidden md:block">
              Journeyman Electrician & JATC Instructor &bull; Volume I & Volume II Available Now
            </span>
          </div>
        </div>

        {/* RIGHT: DUAL VOLUME CTAS */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-center">
          <Link
            href="/thank-you-amazon?vol=1"
            className="flex-1 sm:flex-none px-4 md:px-5 py-2.5 bg-amber hover:bg-white text-concrete text-xs md:text-sm font-mono font-black uppercase tracking-wider rounded transition-all shadow-lg hover:scale-[1.02] active:scale-95 text-center whitespace-nowrap"
          >
            Get Volume I &rarr;
          </Link>
          <Link
            href="/thank-you-amazon?vol=2"
            className="flex-1 sm:flex-none px-4 md:px-5 py-2.5 bg-signal hover:bg-white text-white hover:text-concrete text-xs md:text-sm font-mono font-black uppercase tracking-wider rounded transition-all shadow-lg hover:scale-[1.02] active:scale-95 text-center whitespace-nowrap"
          >
            Get Volume II &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
