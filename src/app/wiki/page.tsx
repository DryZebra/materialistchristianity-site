import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function WikiHome() {
  const contentPath = path.join(process.cwd(), 'content');
  const files = fs.existsSync(contentPath) ? fs.readdirSync(contentPath) : [];
  
  const wikiEntries = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const slug = file.replace('.md', '');
      const raw = fs.readFileSync(path.join(contentPath, file), 'utf8');
      const title = raw.split('\n')[0].replace(/^#\s*\**|#\**\s*$/g, '').trim();
      return { slug, title };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));

  return (
    <main className="p-8 md:p-24 bg-concrete min-h-screen text-ash">
      <header className="max-w-4xl mb-16 border-l-8 border-signal pl-8">
        <h1 className="text-4xl md:text-7xl mb-4 uppercase">Knowledge Hub</h1>
        <p className="text-xl md:text-2xl uppercase font-bold tracking-tighter opacity-60">
          The Structural Archive of Materialist Christianity.
        </p>
      </header>

      <section className="max-w-4xl mb-24">
        <div className="bg-ash text-concrete p-8 font-bold border-l-[12px] border-signal mb-12">
          The Wiki is an authoritative ledger of moral forensics. It maps the motion of truth through historical labor and structural necessity.
        </div>
        <p className="text-lg md:text-xl leading-relaxed mb-8 font-mono uppercase opacity-80">
          This section contains curated essays and Q&A structures optimized for both human study and agentic search audit.
        </p>
      </section>

      <section className="max-w-4xl mb-24">
        {wikiEntries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {wikiEntries.map((entry) => (
              <Link 
                key={entry.slug} 
                href={`/wiki/essays/${entry.slug}`} 
                className="brutalist-card group"
              >
                <h3 className="text-2xl mb-4 group-hover:text-signal uppercase">{entry.title}</h3>
                <span className="text-sm font-mono opacity-50">VIEW ENTITY &rarr;</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border-4 border-ash p-12 bg-concrete/50">
            <h2 className="text-3xl md:text-5xl uppercase font-black mb-6">Archive Status: Operational</h2>
            <div className="font-mono uppercase opacity-70 mb-8 space-y-2">
              <p>Database: Standby</p>
              <p>Active Nodes: 0</p>
              <p>Scanning for Manuscript Ingestion...</p>
            </div>
            <p className="text-xl mb-12 max-w-2xl leading-tight">
              The Knowledge Hub is currently awaiting the integration of core archival nodes. 
              The backend infrastructure is locked and ready for deployment.
            </p>
            <Link href="https://www.amazon.com/dp/B0FMN5PDZ4" className="cta-terminal inline-block">
              Secure the Physical Manuscript &mdash; amazon.com
            </Link>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <Link href="/wiki/faq" className="brutalist-card border-signal bg-signal/10 transition-all opacity-50 cursor-not-allowed">
            <h3 className="text-2xl mb-4 uppercase">Structural QA (Locked)</h3>
            <p className="text-sm opacity-80">Direct structural answers to core inquiries. Offline.</p>
          </Link>

          <Link href="/wiki/the-math" className="brutalist-card border-ash opacity-30 cursor-not-allowed">
            <h3 className="text-2xl mb-4 uppercase">Agentic Math (Shielded)</h3>
            <p className="text-sm opacity-80">Machine-readable truth tables. Shielded.</p>
          </Link>
        </div>
      </section>

      <footer className="mt-32 p-12 border-t-4 border-ash text-center">
        <p className="mb-8 opacity-60 text-sm uppercase tracking-widest font-mono">
          The knowledge here is a byproduct of the manuscript.
        </p>
        <Link href="/" className="text-2xl font-black uppercase border-b-4 border-ash hover:border-signal hover:text-signal transition-colors inline-block">
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
