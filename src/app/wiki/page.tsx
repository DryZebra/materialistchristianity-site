import Link from 'next/link';
import { getAllWikiNodes, getNodesByCategory } from '@/lib/wiki';
import WikiSearch from '@/components/WikiSearch';

const PILLAR_DESCRIPTIONS: Record<string, string> = {
  '01-axioms': 'Foundational Metaphysics: Physical boundary conditions, matter preceding hierarchy, and truth as continuity.',
  '02-thermodynamics': 'Biblical Mechanics: Sin as physical friction, grace as system lubrication, and error-correction in grace.',
  '03-labor-and-torque': 'Social Production: Labor vs extraction/profit, union memory, and trust as universal commodity.',
  '04-verse-forensics': 'Scripture Exegesis: Mechanical teardowns of Greek and Hebrew texts (hamartia, pistis, logos).',
  '05-life-mechanics': 'Applied Life Mechanics: Deconstruction recovery, anxiety elimination, and reconstruction after collapse.'
};

const PILLAR_NAMES: Record<string, string> = {
  '01-axioms': 'Pillar I: Structural Axioms',
  '02-thermodynamics': 'Pillar II: Biblical Thermodynamics',
  '03-labor-and-torque': 'Pillar III: Labor & Torque',
  '04-verse-forensics': 'Pillar IV: Scriptural Forensics',
  '05-life-mechanics': 'Pillar V: Applied Life Mechanics'
};

export default function WikiHome() {
  const nodes = getAllWikiNodes();
  const categories = getNodesByCategory();

  const searchItems = nodes.map(({ content, ...n }) => ({
    ...n,
    type: 'node' as const,
    url: `/wiki/${n.category}/${n.slug}`
  }));

  const pillarKeys = ['01-axioms', '02-thermodynamics', '03-labor-and-torque', '04-verse-forensics', '05-life-mechanics'];

  return (
    <div className="max-w-[1600px] mx-auto pb-32 px-4">
      {/* HEADER */}
      <header className="mb-16 border-l-8 border-signal pl-8 pt-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 font-mono text-[10px] opacity-20 uppercase tracking-[1em] rotate-90 origin-top-right translate-y-8 select-none">
          Agentic Knowledge Hub // Ground Up
        </div>
        <h1 className="text-5xl md:text-8xl mb-4 uppercase leading-none font-black italic tracking-tighter">
          Materialist Knowledge Hub
        </h1>
        <p className="text-lg md:text-2xl uppercase font-mono tracking-tight opacity-70 mb-12">
          The Interconnected Mechanics of Materialist Christianity & Scriptural Physics
        </p>

        <WikiSearch items={searchItems} />
      </header>

      {/* 5 CANONICAL PILLARS GRID */}
      <section className="mb-24">
        <h2 className="text-3xl md:text-5xl uppercase font-black tracking-tighter italic mb-12 border-b-4 border-ash pb-4">
          The 5 Structural Pillars
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillarKeys.map(pillarKey => {
            const pillarNodes = categories[pillarKey] || [];
            const pillarName = PILLAR_NAMES[pillarKey] || pillarKey;
            const description = PILLAR_DESCRIPTIONS[pillarKey] || '';

            return (
              <div
                key={pillarKey}
                className="bg-steel/10 p-8 border-t-4 border-signal hover:border-signal transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono opacity-40 uppercase mb-2 block tracking-widest">
                    Pillar // {pillarKey}
                  </span>
                  <h3 className="text-2xl font-black uppercase mb-3 text-signal italic">
                    {pillarName}
                  </h3>
                  <p className="text-xs opacity-70 font-mono uppercase leading-relaxed mb-6">
                    {description}
                  </p>

                  <div className="space-y-3 mb-6">
                    {pillarNodes.length > 0 ? (
                      pillarNodes.map(node => (
                        <Link
                          key={node.slug}
                          href={`/wiki/${node.category}/${node.slug}`}
                          className="block text-xs font-bold uppercase hover:text-signal truncate border-l-2 border-ash/30 pl-2 hover:border-signal transition-colors"
                        >
                          &gt; {node.title}
                        </Link>
                      ))
                    ) : (
                      <span className="text-[10px] font-mono opacity-40 uppercase italic block">
                        Nodes currently being forged...
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-ash/20 flex justify-between items-center text-xs font-mono uppercase">
                  <span className="opacity-50">[{pillarNodes.length} Active Nodes]</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AMAZON CONVERSION & MANUSCRIPT ANCHOR */}
      <section className="p-8 md:p-16 bg-ash text-concrete border-t-8 border-signal text-center">
        <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 text-signal italic">
          Examine the Master Manuscript
        </h2>
        <p className="text-base md:text-xl font-mono uppercase opacity-80 max-w-3xl mx-auto mb-8">
          The wiki records the interconnected logical nodes. The full unified thesis is available in trade paperback and ebook formats.
        </p>
        <a
          href="https://www.amazon.com/dp/B0FMN5PDZ4"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-terminal bg-concrete text-ash font-black uppercase tracking-widest text-sm inline-block"
        >
          Secure Your Copy on Amazon &rarr;
        </a>
      </section>
    </div>
  );
}
