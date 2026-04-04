import Link from 'next/link';
import { getAllEssays } from '@/lib/wiki';

export default function EssaysLibrary() {
  const essays = getAllEssays();

  return (
    <div className="max-w-6xl">
      <header className="mb-16">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/wiki" className="text-signal hover:opacity-50 transition-all font-black text-sm uppercase">&larr; Back to Dashboard</Link>
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase mb-4 italic">Forensic Testimony</h1>
        <p className="text-xl opacity-60 uppercase font-mono tracking-tighter max-w-2xl">
          Long-form forensic audits and reconstructive testimonies. The evidence of labor documented in the pursuit of the structural real.
        </p>
      </header>

      <div className="bento-grid">
        {essays.map((essay) => (
          <Link 
            key={essay.slug} 
            href={`/wiki/essays/${essay.slug}`} 
            className="brutalist-card group !bg-ash/5 hover:!bg-ash/10"
          >
            <div className="text-[10px] uppercase font-mono opacity-40 mb-4 tracking-widest border-b border-ash/10 pb-2">
              Dossier ID: {essay.slug.toUpperCase()}
            </div>
            <h3 className="text-2xl md:text-3xl group-hover:text-signal uppercase mb-4 leading-none">
              {essay.title}
            </h3>
            <p className="text-sm opacity-60 uppercase font-mono tracking-tight mb-8 line-clamp-3">
              {essay.description}
            </p>
            <div className="flex justify-between items-center mt-auto pt-4 border-t border-ash/10">
              <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest font-bold">
                Examine File
              </span>
              <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
            </div>
          </Link>
        ))}
      </div>

      {essays.length === 0 && (
        <div className="p-12 border-4 border-dashed border-ash/20 text-center uppercase font-mono opacity-40">
          Archive Empty. Scanning for ingestion...
        </div>
      )}
    </div>
  );
}
