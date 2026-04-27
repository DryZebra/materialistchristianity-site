import Link from 'next/link';
import { getAllWikiNodes, getAllEssays, getAllBibleTranslations, getNodesByCategory, getLinkPath } from '@/lib/wiki';
import WikiSearch from '@/components/WikiSearch';

export default function WikiHome() {
  const nodes = getAllWikiNodes();
  const essays = getAllEssays();
  const bibles = getAllBibleTranslations();
  const categories = getNodesByCategory();
  const categoryNames = Object.keys(categories).sort();

  const totalCount = nodes.length + essays.length + bibles.length;
  const searchItems = [
    ...nodes.map(({ content, ...n }) => ({ ...n, type: 'node' as const, url: n.url })),
    ...essays.map(({ content, ...e }) => ({ ...e, type: 'essay' as const, url: e.url })),
    ...bibles.map(({ content, ...b }) => ({ ...b, type: 'bible' as const, url: b.url }))
  ];

  return (
    <div className="max-w-[1600px] mx-auto pb-32 px-4">
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

      {/* TRIPARTITE ENTRY POINTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {/* SECTION 01: PRAXIS (THE WORK) */}
        <div className="bg-steel/10 p-8 border-t-4 border-signal relative group hover:border-signal transition-all shadow-[8px_8px_0_rgba(0,163,255,0.1)]">
          <span className="text-[10px] font-mono opacity-40 uppercase mb-4 block">Section 01 // Shop Floor</span>
          <h2 className="text-3xl xl:text-4xl font-black uppercase mb-4 italic text-signal no-wrap">Praxis</h2>
          <p className="text-sm opacity-60 font-mono uppercase mb-8 font-bold">Applied mechanics for stable social reproduction.</p>
          <div className="space-y-2 mb-8">
            {nodes.filter(n => n.category === 'Praxis').slice(0, 3).map(node => (
              <Link key={node.slug} href={`${getLinkPath(node.slug)}${node.slug}`} className="block text-xs font-bold uppercase hover:text-signal truncate">
                &gt; {node.title}
              </Link>
            ))}
          </div>
          <Link href="/wiki/structural-proofs" className="text-signal font-black uppercase text-sm hover:underline tracking-widest">
            Execution Manuals &rarr;
          </Link>
        </div>

        {/* SECTION 02: ESSAYS (TESTIMONY) */}
        <div className="bg-steel/10 p-8 border-t-4 border-ash relative group hover:border-signal transition-all">
          <span className="text-[10px] font-mono opacity-40 uppercase mb-4 block">Section 02 // Observations</span>
          <h2 className="text-3xl xl:text-4xl font-black uppercase mb-4 italic text-signal no-wrap">Testimony</h2>
          <p className="text-sm opacity-60 font-mono uppercase mb-8">Forensic observations of the stabilization machine.</p>
          <div className="space-y-2 mb-8">
            {essays.slice(0, 3).map(essay => (
              <Link key={essay.slug} href={`${getLinkPath(essay.slug)}${essay.slug}`} className="block text-xs font-bold uppercase hover:text-signal truncate">
                &gt; {essay.title}
              </Link>
            ))}
          </div>
          <Link href="/wiki/labor-and-torque" className="text-signal font-black uppercase text-sm hover:underline tracking-widest">
            Open Library &rarr;
          </Link>
        </div>

        {/* SECTION 03: BIBLE (SOURCE FORENSICS) */}
        <div className="bg-steel/10 p-8 border-t-4 border-ash relative group hover:border-signal transition-all">
          <span className="text-[10px] font-mono opacity-40 uppercase mb-4 block">Section 03 // Records</span>
          <h2 className="text-3xl xl:text-4xl font-black uppercase mb-4 italic text-signal no-wrap">Forensics</h2>
          <p className="text-sm opacity-60 font-mono uppercase mb-8">Historical records and biblical maintenance logs.</p>
          <div className="space-y-2 mb-8">
            {bibles.slice(0, 3).map(bible => (
              <Link key={bible.slug} href={`${getLinkPath(bible.slug)}${bible.slug}`} className="block text-xs font-bold uppercase hover:text-signal truncate">
                &gt; {bible.title}
              </Link>
            ))}
          </div>
          <Link href="/wiki/the-blueprint-exegesis" className="text-signal font-black uppercase text-sm hover:underline tracking-widest">
            Study Bible &rarr;
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT COLUMN: KNOWLEDGE MAP BY CATEGORY */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-12 border-b-4 border-ash pb-4">
            <h2 className="text-4xl uppercase font-black tracking-tighter italic">Knowledge Map</h2>
            <div className="flex items-baseline gap-2">
               <span className="font-mono text-sm opacity-50 underline decoration-signal decoration-2">Total Archive: {totalCount}</span>
               <span className="font-mono text-[10px] opacity-40">[{nodes.length} Mechanics // {essays.length} Testimonies]</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {categoryNames.map(category => (
              <div key={category} className="space-y-6">
                <div className="flex items-baseline gap-4">
                  <h3 className="text-2xl font-black uppercase text-signal italic">{category}</h3>
                  <div className="h-[2px] flex-grow bg-ash/10"></div>
                  <span className="font-mono text-[10px] opacity-40">[{categories[category].length}]</span>
                </div>
                <div className="space-y-4">
                  {categories[category].slice(0, 8).map(node => (
                    <Link 
                      key={node.slug} 
                      href={`${getLinkPath(node.slug)}${node.slug}`}
                      className="block group"
                    >
                      <h4 className="text-sm font-black uppercase group-hover:text-signal group-hover:pl-2 transition-all border-l-2 border-transparent group-hover:border-signal">
                        {node.title}
                      </h4>
                      <p className="text-[9px] opacity-30 font-mono uppercase group-hover:opacity-60 transition-opacity">
                        Forensic Tag: {node.slug.slice(0, 8)}...
                      </p>
                    </Link>
                  ))}
                  {categories[category].length > 8 && (
                    <Link href="/wiki/structural-proofs" className="text-[10px] font-mono uppercase opacity-40 hover:opacity-100 hover:text-signal font-black pt-2 block border-t border-ash/10">
                      + Access {categories[category].length - 8} deeper nodes
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: LATEST BIBLE TEARDOWNS */}
        <div className="lg:col-span-4">
          <div className="sticky top-8">
            <div className="flex items-center justify-between mb-12 border-b-4 border-ash pb-4">
              <h2 className="text-4xl uppercase font-black tracking-tighter italic">Bible Forensics</h2>
              <span className="font-mono text-sm opacity-50">Latest</span>
            </div>

            <div className="space-y-6">
              {bibles.slice(0, 4).map(bible => (
                <Link 
                  key={bible.slug} 
                  href={`${getLinkPath(bible.slug)}${bible.slug}`}
                  className="block p-6 bg-steel/10 border-l-4 border-ash hover:border-signal hover:bg-steel/20 transition-all group"
                >
                  <div className="text-[9px] font-mono opacity-40 mb-2 uppercase tracking-widest">Section {bible.slug.split('_').slice(1,3).join('-')}</div>
                  <h3 className="text-xl font-black uppercase mb-2 group-hover:text-signal">{bible.title}</h3>
                  <p className="text-xs opacity-60 font-mono uppercase leading-tight line-clamp-3">
                    {bible.description}
                  </p>
                </Link>
              ))}
              <Link href="/wiki/the-blueprint-exegesis" className="cta-terminal !text-sm !py-3 w-full !bg-steel/40 !border-ash hover:!border-signal">
                Browse Scriptural Records &rarr;
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
