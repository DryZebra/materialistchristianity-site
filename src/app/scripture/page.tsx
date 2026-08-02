import { Metadata } from 'next';
import Link from 'next/link';
import ScriptureTeardown from '@/components/ScriptureTeardown';

export const metadata: Metadata = {
  title: 'Scriptural Verse Forensics | Materialist Christianity by Ezra Byrd',
  description: 'Linguistic and mechanical teardown of key Bible verses (Hamartia, Pistis, Logos, Sabbath, Wages of Sin). Comparing idealist magic vs materialist physics.',
  openGraph: {
    title: 'Scriptural Verse Forensics | Materialist Christianity',
    description: 'Explore the Koine Greek & Hebrew mechanics of key Bible verses with Ezra Byrd.',
    type: 'website',
    url: 'https://materialistchristianity.org/scripture',
  },
};

export default function ScripturePage() {
  return (
    <div className="bg-concrete text-ash min-h-screen pb-32">
      {/* NAVIGATION */}
      <header className="border-b-4 border-ash p-4 md:px-12 bg-concrete/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-black text-xl uppercase tracking-tighter hover:text-signal italic">
            &larr; Materialist Christianity
          </Link>
          <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest">
            <Link href="/read-chapter-1" className="hidden sm:inline-block hover:text-signal font-bold">
              Read Chapter 1
            </Link>
            <Link href="/audit" className="hidden sm:inline-block hover:text-signal font-bold">
              Life Audit
            </Link>
            <Link href="/wiki" className="hidden md:inline-block hover:text-signal font-bold">
              Knowledge Hub
            </Link>
            <Link
              href="/thank-you-amazon?vol=1"
              className="cta-terminal !py-2 !px-3 !text-xs font-black uppercase bg-signal text-white"
            >
              Get Vol I &rarr;
            </Link>
            <Link
              href="/thank-you-amazon?vol=2"
              className="cta-terminal !py-2 !px-3 !text-xs font-black uppercase bg-amber text-concrete"
            >
              Get Vol II &rarr;
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto text-center px-6 pt-16 pb-12">
        <div className="text-xs font-mono uppercase tracking-[0.25em] text-signal font-black mb-4">
          SCRIPTURAL MECHANICS // KOINE GREEK & HEBREW AUDIT
        </div>
        <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase mb-6 leading-tight">
          Verse Mechanics
        </h1>
        <p className="text-lg md:text-2xl font-mono uppercase opacity-80 leading-relaxed max-w-2xl mx-auto mb-8">
          Stripping medieval Latin guilt from scripture and restoring Koine Greek ballistic, architectural, and labor mechanics.
        </p>
      </section>

      {/* SCRIPTURE TEARDOWN TOOL */}
      <section className="max-w-6xl mx-auto px-6">
        <ScriptureTeardown />
      </section>

      {/* AMAZON CONVERSION BANNER */}
      <section className="max-w-4xl mx-auto px-6 mt-20 text-center">
        <div className="p-8 md:p-12 bg-ash text-concrete border-t-8 border-signal">
          <h3 className="text-3xl font-black uppercase mb-4 text-signal italic">
            Examine the Complete Scriptural Teardown
          </h3>
          <p className="text-base font-mono uppercase opacity-80 max-w-xl mx-auto mb-8">
            The full master manuscript contains over 200 forensic verse teardowns across Volume I and Volume II.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/thank-you-amazon?vol=1"
              className="cta-terminal bg-amber text-concrete font-black uppercase tracking-widest text-sm py-4 px-8 inline-block"
            >
              Get Volume I on Amazon &rarr;
            </Link>
            <Link
              href="/thank-you-amazon?vol=2"
              className="cta-terminal bg-signal text-white font-black uppercase tracking-widest text-sm py-4 px-8 inline-block"
            >
              Get Volume II on Amazon &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
