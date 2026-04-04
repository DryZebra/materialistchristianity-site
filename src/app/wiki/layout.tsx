import Link from 'next/link';
import { getNodesByCategory } from '@/lib/wiki';

export default function WikiLayout({ children }: { children: React.ReactNode }) {
  const categories = getNodesByCategory();
  const categoryNames = Object.keys(categories).sort();

  return (
    <div className="forensic-layout">
      {/* PERSISTENT FORENSIC SIDEBAR */}
      <aside className="forensic-sidebar hidden lg:block">
        <div className="mb-12">
          <Link href="/wiki" className="text-3xl font-black text-signal block mb-2 uppercase leading-none">
            Archive
          </Link>
          <div className="text-[10px] uppercase font-mono opacity-40">Status: Operational</div>
        </div>

        <nav className="space-y-8">
          <div>
            <div className="text-xs font-black uppercase opacity-30 mb-4 tracking-widest border-b border-ash/10 pb-1">
              Testimony
            </div>
            <Link href="/wiki/essays" className="category-item !opacity-100 !text-ash hover:!text-signal font-bold">
              Testimony Library
            </Link>
          </div>

          <div>
            <div className="text-xs font-black uppercase opacity-30 mb-4 tracking-widest border-b border-ash/10 pb-1">
              Knowledge Map
            </div>
            <Link href="/wiki/nodes" className="category-item !opacity-100 !text-ash hover:!text-signal font-bold mb-4">
              All Axioms
            </Link>
            
            {categoryNames.map(category => (
              <div key={category} className="mb-4">
                <div className="text-[9px] uppercase font-mono opacity-40 mb-2">{category}</div>
                <div className="space-y-1">
                  {categories[category].map(node => (
                    <Link 
                      key={node.slug} 
                      href={`/wiki/node/${node.slug}`} 
                      className="category-item"
                    >
                      {node.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>
      </aside>

      {/* VIEWPORT */}
      <section className="forensic-content">
        {children}
      </section>
    </div>
  );
}
