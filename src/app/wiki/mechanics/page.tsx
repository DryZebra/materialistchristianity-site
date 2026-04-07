import Link from 'next/link';
import { getNodesByCategory } from '@/lib/wiki';

export default function NodesIndex() {
  const categories = getNodesByCategory();
  const categoryNames = Object.keys(categories).sort();

  return (
    <div className="max-w-6xl">
      <header className="mb-16">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/wiki" className="text-signal hover:opacity-50 transition-all font-black text-sm uppercase">&larr; Back to Dashboard</Link>
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase mb-4 italic">Axiomatic Map</h1>
        <p className="text-xl opacity-60 uppercase font-mono tracking-tighter max-w-2xl">
          The structural ledger of Materialist Christianity. A categorical breakdown of the mechanics, rhythms, and ontological structures that hold the Industrial Real.
        </p>
      </header>

      <div className="space-y-24">
        {categoryNames.map(category => (
          <div key={category}>
            <div className="flex items-end justify-between border-b-4 border-ash/20 pb-4 mb-12">
              <h2 className="text-3xl md:text-5xl text-ash uppercase font-black leading-none">
                {category}
              </h2>
              <span className="text-xs font-mono opacity-40 uppercase tracking-widest font-black italic">
                Category Archive / {categories[category].length} Nodes
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories[category].map((node) => (
                <Link 
                  key={node.slug} 
                  href={`/wiki/nodes/${node.slug}`} 
                  className="p-6 border-2 border-ash group hover:border-signal hover:bg-signal/5 transition-all flex flex-col"
                >
                  <h3 className="text-xl md:text-2xl group-hover:text-signal uppercase mb-4 font-black leading-tight">
                    {node.title}
                  </h3>
                  <p className="text-[11px] opacity-60 uppercase font-mono tracking-tight line-clamp-2 mb-6">
                    {node.description}
                  </p>
                  <div className="mt-auto pt-4 flex justify-between items-center opacity-30 group-hover:opacity-100 group-hover:text-signal">
                    <span className="text-[9px] font-mono uppercase font-black tracking-widest italic">Node: {node.slug}</span>
                    <span className="">&rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
