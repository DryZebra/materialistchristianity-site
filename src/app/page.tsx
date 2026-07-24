import Link from 'next/link';
import StructuralAuditTool from '@/components/StructuralAuditTool';

export default function GardenCathedralLanding() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://materialistchristianity.org/#website',
        'url': 'https://materialistchristianity.org',
        'name': 'Materialist Christianity',
        'description': 'The physical, thermodynamic, and historical reality of morality and scripture.'
      },
      {
        '@type': 'Book',
        '@id': 'https://materialistchristianity.org/#book',
        'name': 'Materialist Christianity',
        'author': {
          '@type': 'Person',
          'name': 'Ezra Byrd',
          'jobTitle': 'Journeyman Electrician, JATC Instructor, Author',
          'url': 'https://materialistchristianity.org/#author'
        },
        'url': 'https://www.amazon.com/dp/B0FMN5PDZ4'
      }
    ]
  };

  return (
    <main className="min-h-screen bg-concrete text-ash selection:bg-signal selection:text-concrete pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* CATHEDRAL NAVIGATION */}
      <nav className="border-b border-ash/10 bg-concrete/90 backdrop-blur sticky top-0 z-40 px-6 py-5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-bold text-lg tracking-tight hover:text-signal transition-all">
            Materialist Christianity
          </Link>
          <div className="flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-muted">
            <Link href="/read-chapter-1" className="hover:text-ash transition-all">
              Chapter 1
            </Link>
            <Link href="/audit" className="hover:text-ash transition-all">
              Life Audit
            </Link>
            <Link href="/scripture" className="hover:text-ash transition-all">
              Verse Mechanics
            </Link>
            <Link href="/wiki" className="hover:text-ash text-signal font-bold transition-all">
              Garden Cathedral &rarr;
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-block bg-slate text-amber px-4 py-1 font-mono text-xs font-bold uppercase tracking-widest mb-8 border border-amber/20 rounded-full">
          Author: Ezra Byrd &mdash; Journeyman Electrician & Foreman
        </div>
        
        <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-8 leading-tight text-white">
          The Forensic Discovery of <br/>
          <span className="italic font-serif font-normal text-amber">Moral Motion & Mechanics.</span>
        </h1>
        
        <p className="text-lg md:text-xl font-mono text-muted max-w-3xl mx-auto mb-12 leading-relaxed">
          Mapping the physical, thermodynamic, and historical sediment of human morality. Proving that scripture is not magical decrees, but the survival technology of working communities under pressure.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link 
            href="/wiki" 
            className="cta-terminal !py-3.5 !px-8 !text-sm"
          >
            Explore the Garden Cathedral &rarr;
          </Link>
          <Link 
            href="/read-chapter-1" 
            className="px-8 py-3.5 text-sm font-mono uppercase tracking-widest border border-ash/20 rounded hover:border-amber hover:text-amber transition-all text-ash"
          >
            Read Chapter 1 Free
          </Link>
        </div>
      </section>

      {/* THE 5 CATHEDRAL PILLARS */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-ash/10">
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-amber font-bold block mb-2">
            CANONICAL ARCHITECTURE
          </span>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
            The 5 Pillars of Knowledge
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/wiki#01-axioms" className="brutalist-card">
            <span className="text-xs font-mono text-amber block mb-2 font-bold">PILLAR I // METAPHYSICS</span>
            <h3 className="text-xl font-bold text-white mb-3">Structural Axioms</h3>
            <p className="text-sm text-muted leading-relaxed">
              Matter Precedes Hierarchy, Physical Boundary Conditions, Truth as Continuity, Sub-Objects, and the 4D Time Snake.
            </p>
          </Link>

          <Link href="/wiki#02-thermodynamics" className="brutalist-card">
            <span className="text-xs font-mono text-amber block mb-2 font-bold">PILLAR II // THERMODYNAMICS</span>
            <h3 className="text-xl font-bold text-white mb-3">Thermodynamics of Sin</h3>
            <p className="text-sm text-muted leading-relaxed">
              Hamartia as ballistic target error, thermal social heat, and Grace as anti-seizure lubricant.
            </p>
          </Link>

          <Link href="/wiki#03-labor-and-torque" className="brutalist-card">
            <span className="text-xs font-mono text-amber block mb-2 font-bold">PILLAR III // LABOR & TORQUE</span>
            <h3 className="text-xl font-bold text-white mb-3">Working-Class Sovereignty</h3>
            <p className="text-sm text-muted leading-relaxed">
              Labor vs. Profit, Trust as Infrastructure, The Redneck Dictatorship, and The 15-Man Shop.
            </p>
          </Link>

          <Link href="/wiki#04-verse-forensics" className="brutalist-card">
            <span className="text-xs font-mono text-amber block mb-2 font-bold">PILLAR IV // SCRIPTURAL FORENSICS</span>
            <h3 className="text-xl font-bold text-white mb-3">Koine & Hebrew Forensics</h3>
            <p className="text-sm text-muted leading-relaxed">
              Linguistic teardowns of Logos, Pistis, Hypostasis, Metanoia, and historical sediment.
            </p>
          </Link>

          <Link href="/wiki#05-life-mechanics" className="brutalist-card md:col-span-2">
            <span className="text-xs font-mono text-amber block mb-2 font-bold">PILLAR V // LIFE MECHANICS</span>
            <h3 className="text-xl font-bold text-white mb-3">Applied Life Mechanics</h3>
            <p className="text-sm text-muted leading-relaxed">
              The physics of eliminating anxiety by collapsing discontinuous stories into one plumb reality and reconstruction after systemic collapse.
            </p>
          </Link>
        </div>
      </section>

      {/* INTERACTIVE STRUCTURAL LIFE AUDIT */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-ash/10">
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-amber font-bold block mb-2">
            DIAGNOSTIC UTILITY
          </span>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Interactive Structural Life Audit
          </h2>
          <p className="text-base text-muted font-mono max-w-2xl">
            Calculate system friction, locate cognitive energy leaks, and identify the physical solution embedded in scripture.
          </p>
        </div>

        <StructuralAuditTool />
      </section>

      {/* DIGNIFIED AUTHOR & BOOK REFERENCE (NO HYPER-SALES) */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-ash/10 text-center">
        <div className="bg-slate p-8 md:p-12 border border-ash/10 rounded-lg">
          <span className="text-xs font-mono uppercase tracking-widest text-amber font-bold block mb-3">
            MASTER MANUSCRIPT REFERENCE
          </span>
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 italic font-serif">
            Materialist Christianity by Ezra Byrd
          </h3>
          <p className="text-base font-mono text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            The full 12-chapter master text recording the complete physical framework, trade analyses, and historical proofs across Volume I and Volume II.
          </p>
          
          <a
            href="https://www.amazon.com/dp/B0FMN5PDZ4"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-concrete border border-amber/40 text-amber hover:bg-amber hover:text-concrete text-sm font-mono uppercase font-bold tracking-widest rounded transition-all inline-block"
          >
            Examine Master Text on Amazon (Paperback $19.99 / Kindle $9.99) &rarr;
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-ash/10 py-12 px-6 bg-concrete">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 font-mono text-xs text-muted">
          <div>
            &copy; {new Date().getFullYear()} EZRA BYRD. MATERIALIST CHRISTIANITY PRESS.
          </div>
          <div className="flex gap-6">
            <Link href="/read-chapter-1" className="hover:text-ash">Chapter 1</Link>
            <Link href="/audit" className="hover:text-ash">Audit</Link>
            <Link href="/scripture" className="hover:text-ash">Verse Mechanics</Link>
            <Link href="/wiki" className="hover:text-ash text-amber">Cathedral Wiki</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
