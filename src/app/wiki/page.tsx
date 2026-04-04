import Link from 'next/link';
import { getAllWikiNodes, getAllEssays } from '@/lib/wiki';

export default function WikiHome() {
  const nodes = getAllWikiNodes();
  const essays = getAllEssays();
  const latestEssay = essays[0]; // Assuming newest is first or alphabetical

  return (
    <div className="max-w-6xl">
      <header className="mb-24 border-l-8 border-signal pl-8">
        <h1 className="text-5xl md:text-8xl mb-4 uppercase leading-none font-black italic">
          Knowledge Hub
        </h1>
        <p className="text-xl md:text-2xl uppercase font-bold tracking-tighter opacity-60">
          The Structural Archive of Materialist Christianity.
        </p>
      </header>

      {/* FORENSIC DATA CLUSTER */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 font-mono text-[10px] uppercase tracking-widest text-ash/50">
        <div className="p-4 border border-ash/10 bg-steel/20">
          <div className="text-signal font-black text-xl leading-none mb-1">{nodes.length}</div>
          <div>Axiomatic Nodes</div>
        </div>
        <div className="p-4 border border-ash/10 bg-steel/20">
          <div className="text-ash font-black text-xl leading-none mb-1">{essays.length}</div>
          <div>Forensic Testimonies</div>
        </div>
        <div className="p-4 border border-ash/10 bg-steel/20">
          <div className="text-ash font-black text-xl leading-none mb-1">Operational</div>
          <div>System State</div>
        </div>
        <div className="p-4 border border-ash/10 bg-steel/20">
          <div className="text-ash font-black text-xl leading-none mb-1">Forensic</div>
          <div>Filter Engine</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* GATE 1: THE WIKI */}
        <Link href="/wiki/nodes" className="gate-card group">
          <div>
            <h2 className="text-4xl md:text-6xl text-ash uppercase font-black mb-6 group-hover:text-signal">
              The Axiomatic <span className="block">Map</span>
            </h2>
            <p className="text-lg opacity-60 uppercase font-mono leading-tight mb-8">
              A categorical ledger of structural truth. Laws, mechanics, and survival rhythms documented through historical friction.
            </p>
          </div>
          <div>
            <div className="text-sm font-mono opacity-50 uppercase tracking-widest font-bold border-t border-ash/20 pt-4 flex justify-between items-center group-hover:text-signal">
              <span>Access Node Archive</span>
              <span>&rarr;</span>
            </div>
          </div>
        </Link>

        {/* GATE 2: THE TESTIMONY */}
        <Link href="/wiki/essays" className="gate-card group !bg-ash !text-concrete border-ash">
          <div>
            <h2 className="text-4xl md:text-6xl uppercase font-black mb-6 group-hover:text-signal">
              Forensic <span className="block">Testimony</span>
            </h2>
            <p className="text-lg opacity-80 uppercase font-mono leading-tight mb-8">
              Long-form forensic audits. The application of materialist logic to human history and labor.
            </p>
            {latestEssay && (
              <div className="bg-concrete text-ash p-4 border-l-4 border-signal">
                <div className="text-[10px] opacity-50 mb-1">Latest Entry:</div>
                <div className="text-sm font-bold uppercase truncate">{latestEssay.title}</div>
              </div>
            )}
          </div>
          <div>
            <div className="text-sm font-mono opacity-50 uppercase tracking-widest font-bold border-t border-concrete/20 pt-4 flex justify-between items-center group-hover:text-signal">
              <span>Examine Testimonies</span>
              <span>&rarr;</span>
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-24 p-12 bg-ash/5 border-ash border-4">
        <h3 className="text-2xl uppercase font-black mb-6 italic text-signal">Forensic Integrity Policy</h3>
        <p className="text-lg leading-relaxed opacity-70 mb-8 font-mono uppercase">
          All data within this Hub is reverse-engineered from the Conclusion of the Industrial Real. We do not deal in spiritual sentiment; we deal in behavioral mass. If a structure survives, it is valid.
        </p>
        <Link href="/" className="inline-block border-b-2 border-signal text-signal font-bold uppercase py-1 hover:opacity-70">
          Sync with Sales Terminal &rarr;
        </Link>
      </div>
    </div>
  );
}
