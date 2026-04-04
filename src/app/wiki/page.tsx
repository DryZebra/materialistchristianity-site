import Link from 'next/link';
import { getAllWikiNodes, getAllEssays } from '@/lib/wiki';

export default function WikiHome() {
  const nodes = getAllWikiNodes();
  const essays = getAllEssays();
  const latestEssay = essays[0]; // Assuming newest is first or alphabetical

  return (
    <div className="max-w-[1600px] mx-auto">
      <header className="mb-16 border-l-8 border-signal pl-8 pt-8">
        <h1 className="text-6xl md:text-9xl mb-4 uppercase leading-none font-black italic tracking-tighter">
          The Archive
        </h1>
        <p className="text-xl md:text-3xl uppercase font-bold tracking-tighter opacity-70">
          Forensic Knowledge Hub // Materialist Christianity Vol II
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT STREAM: AXIOM VAULT */}
        <div className="lg:col-span-5">
          <div className="sticky top-8">
            <div className="flex items-center justify-between mb-8 border-b-4 border-ash pb-4">
              <h2 className="text-4xl uppercase font-black tracking-tighter">Axiom Vault</h2>
              <span className="font-mono text-sm opacity-50">[{nodes.length} NODES]</span>
            </div>
            
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
              {nodes.map(node => (
                <Link 
                  key={node.slug} 
                  href={`/wiki/node/${node.slug}`}
                  className="block p-6 bg-steel/20 border-l-4 border-ash hover:border-signal hover:bg-steel/40 transition-all group"
                >
                  <h3 className="text-xl font-black uppercase mb-1 group-hover:text-signal">{node.title}</h3>
                  <p className="text-sm opacity-60 font-mono uppercase leading-tight">{node.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT STREAM: TESTIMONY LIBRARY */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-8 border-b-4 border-ash pb-4">
            <h2 className="text-4xl uppercase font-black tracking-tighter">Testimony Library</h2>
            <span className="font-mono text-sm opacity-50">[{essays.length} ENTRIES]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {essays.map(essay => (
              <Link 
                key={essay.slug} 
                href={`/wiki/essays/${essay.slug}`}
                className="brutalist-card !p-8 flex flex-col justify-between h-[350px]"
              >
                <div>
                  <div className="text-[10px] font-mono opacity-50 mb-4 uppercase tracking-widest">{essay.date}</div>
                  <h3 className="text-3xl font-black uppercase leading-none mb-4">{essay.title}</h3>
                  <p className="text-sm opacity-70 uppercase font-mono leading-relaxed line-clamp-4">
                    {essay.description}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-ash/10 text-xs font-bold uppercase tracking-widest text-signal">
                  Open Testimony &rarr;
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER AUDIT */}
      <div className="mt-32 p-12 bg-steel/30 border-t-8 border-signal">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl uppercase font-black mb-6 italic text-signal">Forensic Integrity Policy</h3>
            <p className="text-lg leading-relaxed opacity-70 font-mono uppercase">
              All data within this Hub is reverse-engineered from the Conclusion of the Industrial Real. We do not deal in spiritual sentiment; we deal in behavioral mass. If a structure survives, it is valid.
            </p>
          </div>
          <div className="flex flex-col justify-end items-start md:items-end">
            <div className="text-right mb-8">
              <div className="text-sm opacity-40 uppercase font-mono mb-2">Operational State</div>
              <div className="text-3xl font-black uppercase text-signal">100% Traceable</div>
            </div>
            <Link href="/" className="cta-terminal !text-lg !py-4">
              Return to Command Center &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>

  );
}
