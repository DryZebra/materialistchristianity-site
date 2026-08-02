import { Metadata } from 'next';
import Link from 'next/link';
import StructuralAuditTool from '@/components/StructuralAuditTool';

export const metadata: Metadata = {
  title: 'Structural Life Audit Engine | Materialist Christianity by Ezra Byrd',
  description: 'Interactive thermodynamic audit tool. Calculate system friction, diagnose cognitive overthinking, and locate physical moral solutions.',
  openGraph: {
    title: 'Run Your Structural Life Audit | Materialist Christianity',
    description: 'Calculate your thermodynamic friction and locate physical solutions embedded in scripture.',
    type: 'website',
    url: 'https://materialistchristianity.org/audit',
  },
};

export default function AuditPage() {
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
            <Link href="/wiki" className="hidden md:inline-block hover:text-signal font-bold">
              Knowledge Hub
            </Link>
            <Link
              href="/thank-you-amazon?vol=1"
              className="cta-terminal !py-2 !px-4 !text-xs font-black uppercase bg-signal text-white"
            >
              Get Volume I &rarr;
            </Link>
            <Link
              href="/thank-you-amazon?vol=2"
              className="cta-terminal !py-2 !px-4 !text-xs font-black uppercase bg-amber text-concrete"
            >
              Get Volume II &rarr;
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto text-center px-6 pt-16 pb-12">
        <div className="text-xs font-mono uppercase tracking-[0.25em] text-signal font-black mb-4">
          INTERACTIVE AUDIT ENGINE // MECHANICAL THERMODYNAMICS
        </div>
        <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase mb-6 leading-tight">
          Structural Life Audit
        </h1>
        <p className="text-lg md:text-2xl font-mono uppercase opacity-80 leading-relaxed max-w-2xl mx-auto mb-8">
          Measure your internal thermodynamic heat, identify narrative energy leaks, and ground your life in physical continuity.
        </p>
      </section>

      {/* AUDIT COMPONENT */}
      <section className="max-w-5xl mx-auto px-6">
        <StructuralAuditTool />
      </section>

      {/* AMAZON CONVERSION BANNER */}
      <section className="max-w-4xl mx-auto px-6 mt-20 text-center">
        <div className="p-8 md:p-12 bg-ash text-concrete border-t-8 border-signal">
          <h3 className="text-3xl font-black uppercase mb-4 text-signal italic">
            Examine the Full Two-Volume Masterwork
          </h3>
          <p className="text-base font-mono uppercase opacity-80 max-w-xl mx-auto mb-8">
            The audit isolates the mechanical problem. Volume I and Volume II provide the full physical framework.
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
