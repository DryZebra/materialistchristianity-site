import Link from 'next/link';
import { getNodesByCategory, getAllWikiNodes, getAllEssays } from '@/lib/wiki';
import MobileNav from '@/components/MobileNav';

export default function WikiLayout({ children }: { children: React.ReactNode }) {
  const rawCategories = getNodesByCategory();
  const categoryNames = Object.keys(rawCategories).sort();

  // Strip content for layout payload
  const categories: Record<string, any> = {};
  categoryNames.forEach(cat => {
    categories[cat] = rawCategories[cat].map(({ content, ...node }) => node);
  });

  return (
    <div className="forensic-layout">
      {/* PERSISTENT FORENSIC SIDEBAR (DESKTOP) */}
      <aside className="forensic-sidebar hidden lg:block">
        <div className="mb-12">
          <Link href="/wiki" className="text-3xl font-black text-signal block mb-2 uppercase leading-none italic">
            Archive
          </Link>
          <div className="text-[10px] uppercase font-mono opacity-40">Status: Operational // Vol II</div>
        </div>

        <nav className="space-y-8">
          <div>
            <div className="text-xs font-black uppercase opacity-30 mb-4 tracking-widest border-b border-ash/10 pb-1">
              Testimony
            </div>
            <Link href="/wiki/labor-and-torque" className="category-item !opacity-100 !text-ash hover:!text-signal font-bold">
              Testimony Library
            </Link>
          </div>

          <div>
            <div className="text-xs font-black uppercase opacity-30 mb-4 tracking-widest border-b border-ash/10 pb-1">
              Knowledge Map
            </div>
            <Link href="/wiki/structural-proofs" className="category-item !opacity-100 !text-ash hover:!text-signal font-bold mb-4">
              All Axioms
            </Link>
            
            {categoryNames.map(category => (
              <div key={category} className="mb-4">
                <div className="text-[9px] uppercase font-mono opacity-40 mb-2">{category}</div>
                <div className="space-y-1">
                  {categories[category].map(node => (
                    <Link 
                      key={node.slug} 
                      href={node.url} 
                      className="block px-4 py-2 text-xs font-bold uppercase transition-all duration-200 border-l-2 border-transparent hover:border-signal hover:bg-signal/5 hover:text-signal"
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

      {/* MOBILE NAV OVERLAY */}
      <MobileNav categories={categories} />

      {/* VIEWPORT */}
      <section className="forensic-content relative">
        {children}
      </section>
    </div>
  );
}
