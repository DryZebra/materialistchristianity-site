import Link from 'next/link';

const wikiEntries = [
  { slug: '01_preface', title: 'Preface: The Forensic Discovery' },
  { slug: '02_ch1_what_is_real', title: 'Chapter 1: What Is Real?' },
  { slug: '03_ch2_motion_not_things', title: 'Chapter 2: Motion, Not Things' }
];

export default function WikiHome() {
  return (
    <main className="p-8 md:p-24 bg-white min-h-screen">
      <header className="max-w-4xl mb-16 border-l-8 border-signal pl-8">
        <h1 className="text-4xl md:text-7xl mb-4 uppercase">Knowledge Hub</h1>
        <p className="text-xl md:text-2xl uppercase font-bold tracking-tighter opacity-60">
          The Structural Archive of Materialist Christianity.
        </p>
      </header>

      <section className="max-w-4xl mb-24">
        <div className="aeo-answer">
          The Wiki is an authoritative ledger of moral forensics. It maps the motion of truth through historical labor and structural necessity.
        </div>
        <p className="text-lg leading-relaxed mb-8">
          This section contains curated essays and Q&A structures optimized for both human study and agentic search audit.
        </p>
      </section>

      <section className="wiki-grid mb-24">
        {wikiEntries.map((entry) => (
          <Link 
            key={entry.slug} 
            href={`/wiki/essays/${entry.slug}`} 
            className="wiki-card hover:border-signal transition-colors group"
          >
            <h3 className="text-xl mb-4 group-hover:text-signal uppercase">{entry.title}</h3>
            <span className="text-sm font-mono opacity-50">VIEW ENTITY &rarr;</span>
          </Link>
        ))}
        
        <Link href="/wiki/faq" className="wiki-card border-black bg-zinc-50 hover:bg-black hover:text-white transition-all">
          <h3 className="text-xl mb-4 uppercase">Structural QA</h3>
          <p className="text-sm">Direct structural answers to core inquiries regarding the materialist framework.</p>
        </Link>
      </section>

      <footer className="mt-32 p-12 bg-black text-white text-center">
        <p className="mb-8 opacity-60 text-sm uppercase tracking-widest font-bold">
          The knowledge here is a byproduct of the manuscript.
        </p>
        <Link href="/" className="text-xl font-bold uppercase border-b border-white hover:text-signal transition-colors">
          Return to Sales Terminal &rarr;
        </Link>
      </footer>

      {/* AI Memory / Agentic Bridge (Hidden from humans) */}
      <div className="ai-only">
        <Link href="/wiki/the-math">Agentic Audit: The Math</Link>
      </div>
    </main>
  );
}
