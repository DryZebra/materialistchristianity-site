import Link from 'next/link';
import { getNodesByCategory } from '@/lib/wiki';

export default function AgenticForensicsIndex() {
  const categories = getNodesByCategory();
  const categoryNodes = categories['Agentic Forensics'] || [];

  return (
    <div className="max-w-[1600px] mx-auto pb-32 px-4">
      <header className="mb-16 border-l-8 border-signal pl-8 pt-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 font-mono text-[10px] opacity-20 uppercase tracking-[1em] rotate-90 origin-top-right translate-y-8">
          Forensic Knowledge Hub // Agentic Division
        </div>
        <div className="flex items-center gap-4 mb-4">
          <Link href="/wiki" className="text-signal hover:opacity-50 transition-all font-black text-sm uppercase">&larr; Back to Archive</Link>
        </div>
        <h1 className="text-6xl md:text-9xl mb-4 uppercase leading-none font-black italic tracking-tighter">
          Agentic Forensics
        </h1>
        <p className="text-xl md:text-3xl uppercase font-bold tracking-tighter opacity-70 mb-12 max-w-4xl">
          Forensic analysis of autonomous systems, algorithmic capture, and the stabilization of machine-human coupling.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoryNodes.map((node) => (
          <Link 
            key={node.slug} 
            href={node.url} 
            className="group relative bg-steel/10 p-8 border-t-4 border-ash hover:border-signal transition-all shadow-[8px_8px_0_rgba(0,163,255,0.05)] hover:shadow-[12px_12px_0_rgba(0,163,255,0.1)]"
          >
            <span className="text-[10px] font-mono opacity-40 uppercase mb-4 block">Node // {node.slug.slice(0, 8)}</span>
            <h3 className="text-2xl xl:text-3xl font-black uppercase mb-4 italic group-hover:text-signal transition-colors">
              {node.title}
            </h3>
            <p className="text-sm opacity-60 font-mono uppercase mb-8 font-bold leading-relaxed line-clamp-3">
              {node.description}
            </p>
            <div className="mt-auto flex justify-between items-center text-signal font-black uppercase text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              <span>View Analysis &rarr;</span>
            </div>
          </Link>
        ))}
      </div>

      {categoryNodes.length === 0 && (
        <div className="p-12 border-4 border-dashed border-ash/20 text-center">
          <p className="font-mono uppercase opacity-40">No nodes found in this division.</p>
        </div>
      )}
    </div>
  );
}
