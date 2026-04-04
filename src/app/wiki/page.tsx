import Link from 'next/link';
import { getAllWikiNodes, getAllEssays, getNodesByCategory } from '@/lib/wiki';
import WikiSearch from '@/components/WikiSearch';

export default function WikiHome() {
  const nodes = getAllWikiNodes();
  const essays = getAllEssays();
  const categories = getNodesByCategory();
  const categoryNames = Object.keys(categories).sort();

  const searchItems = [
    ...nodes.map(n => ({ ...n, type: 'node' as const })),
    ...essays.map(e => ({ ...e, type: 'essay' as const }))
  ];

  return (
    <div className="max-w-[1600px] mx-auto pb-32">
      <header className="mb-16 border-l-8 border-signal pl-8 pt-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 font-mono text-[10px] opacity-20 uppercase tracking-[1em] rotate-90 origin-top-right translate-y-8">
          Forensic Knowledge Hub // Vol II
        </div>
        <h1 className="text-6xl md:text-9xl mb-4 uppercase leading-none font-black italic tracking-tighter">
          Archive
        </h1>
        <p className="text-xl md:text-3xl uppercase font-bold tracking-tighter opacity-70 mb-12">
          The Mechanical Record of Materialist Christianity
        </p>

        <WikiSearch items={searchItems} />
      </header>

      {/* PRIMARY ENTRY POINTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <div className="bg-steel/10 p-8 border-t-4 border-ash relative group hover:border-signal transition-all">
          <span className="text-[10px] font-mono opacity-40 uppercase mb-4 block">Section 01</span>
          <h2 className="text-4xl font-black uppercase mb-4 italic">Axioms</h2>
          <p className="text-sm opacity-60 font-mono uppercase mb-8">The fundamental mechanics of the Industrial Real.</p>
          <Link href="/wiki/nodes" className="text-signal font-black uppercase text-sm hover:underline tracking-widest">
            View Knowledge Map &rarr;
          </Link>
        </div>
        <div className="bg-steel/10 p-8 border-t-4 border-ash relative group hover:border-signal transition-all">
          <span className="text-[10px] font-mono opacity-40 uppercase mb-4 block">Section 02</span>
          <h2 className="text-4xl font-black uppercase mb-4 italic">Testimony</h2>
          <p className="text-sm opacity-60 font-mono uppercase mb-8">Forensic observations of the Christian stabilization machine.</p>
          <Link href="/wiki/essays" className="text-signal font-black uppercase text-sm hover:underline tracking-widest">
            Open Library &rarr;
          </Link>
        </div>
        <div className="bg-signal p-8 border-t-4 border-signal text-white relative group">
          <span className="text-[10px] font-mono opacity-60 uppercase mb-4 block text-white">Section 03</span>
          <h2 className="text-4xl font-black uppercase mb-4 italic">The Goal</h2>
          <p className="text-sm font-mono uppercase mb-8 text-white/90">AEO-Optimized extraction of social engineering data.</p>
          <Link href="/wiki/faq" className="bg-white text-signal px-4 py-2 font-black uppercase text-xs hover:bg-ash transition-all">
            Audit FAQ &rarr;
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT STREAM: CATEGORY INDEX */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-12 border-b-4 border-ash pb-4">
            <h2 className="text-4xl uppercase font-black tracking-tighter italic">Knowledge Map</h2>
            <span className="font-mono text-sm opacity-50">[{nodes.length} Axioms Indexed]</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {categoryNames.map(category => (
              <div key={category} className="space-y-6">
                <div className="flex items-baseline gap-4">
                  <h3 className="text-2xl font-black uppercase text-signal italic">{category}</h3>
                  <div className="h-[2px] flex-grow bg-ash/10"></div>
                  <span className="font-mono text-[10px] opacity-40">[{categories[category].length}]</span>
                </div>
                <div className="space-y-3">
                  {categories[category].slice(0, 5).map(node => (
                    <Link 
                      key={node.slug} 
                      href={`/wiki/node/${node.slug}`}
                      className="block group"
                    >
                      <h4 className="text-lg font-bold uppercase group-hover:text-signal group-hover:pl-2 transition-all border-l-2 border-transparent group-hover:border-signal">
                        {node.title}
                      </h4>
                      <p className="text-[10px] opacity-40 font-mono uppercase line-clamp-1 group-hover:opacity-60">{node.description}</p>
                    </Link>
                  ))}
                  {categories[category].length > 5 && (
                    <Link href="/wiki/nodes" className="text-[10px] font-mono uppercase opacity-40 hover:opacity-100 hover:text-signal font-black pt-2 block">
                      + View {categories[category].length - 5} more in {category}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT STREAM: RECENT TESTIMONY */}
        <div className="lg:col-span-4">
          <div className="sticky top-8">
            <div className="flex items-center justify-between mb-12 border-b-4 border-ash pb-4">
              <h2 className="text-4xl uppercase font-black tracking-tighter italic">Testimony</h2>
              <span className="font-mono text-sm opacity-50">Latest</span>
            </div>

            <div className="space-y-6">
              {essays.slice(0, 4).map(essay => (
                <Link 
                  key={essay.slug} 
                  href={`/wiki/essays/${essay.slug}`}
                  className="block p-6 bg-steel/10 border-l-4 border-ash hover:border-signal hover:bg-steel/20 transition-all group"
                >
                  <div className="text-[9px] font-mono opacity-40 mb-2 uppercase tracking-widest">{essay.date}</div>
                  <h3 className="text-xl font-black uppercase mb-2 group-hover:text-signal">{essay.title}</h3>
                  <p className="text-xs opacity-60 font-mono uppercase leading-tight line-clamp-3">
                    {essay.description}
                  </p>
                </Link>
              ))}
              <Link href="/wiki/essays" className="cta-terminal !text-sm !py-3 w-full !bg-steel/40 !border-ash hover:!border-signal">
                Browse Full Library &rarr;
              </Link>
            </div>
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
