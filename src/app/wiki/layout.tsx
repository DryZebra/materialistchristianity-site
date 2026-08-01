import Link from 'next/link';
import { getNodesByCategory, ContentNode } from '@/lib/wiki';
import MobileNav from '@/components/MobileNav';

export default function WikiLayout({ children }: { children: React.ReactNode }) {
  const rawCategories = getNodesByCategory();
  const categoryNames = Object.keys(rawCategories).sort();

  // Strip content for layout payload
  const categories: Record<string, Omit<ContentNode, 'content'>[]> = {};
  categoryNames.forEach(cat => {
    categories[cat] = rawCategories[cat].map(({ content, ...node }) => node);
  });

  return (
    <div className="forensic-layout min-h-screen bg-concrete text-ash">
      {/* PERSISTENT FORENSIC SIDEBAR (DESKTOP) */}
      <aside className="forensic-sidebar hidden lg:block bg-concrete border-r border-ash/10 p-6 custom-scrollbar">
        <div className="mb-10 pb-6 border-b border-ash/10">
          <Link href="/wiki" className="text-xl font-bold text-white block mb-1 hover:text-amber transition-all">
            Garden Cathedral
          </Link>
          <div className="text-[10px] font-mono text-muted uppercase tracking-widest">
            Canonical Knowledge Base
          </div>
        </div>

        <nav className="space-y-8">
          <div>
            <div className="text-[10px] font-mono font-bold uppercase text-amber tracking-widest mb-3">
              Cathedral Pillars
            </div>
            <div className="space-y-1 font-mono text-xs">
              <Link href="/wiki#01-axioms" className="block py-1 text-muted hover:text-ash transition-all">
                &rarr; I. Structural Axioms
              </Link>
              <Link href="/wiki#02-thermodynamics" className="block py-1 text-muted hover:text-ash transition-all">
                &rarr; II. Thermodynamics of Sin
              </Link>
              <Link href="/wiki#03-labor-and-torque" className="block py-1 text-muted hover:text-ash transition-all">
                &rarr; III. Labor & Torque
              </Link>
              <Link href="/wiki#04-verse-forensics" className="block py-1 text-muted hover:text-ash transition-all">
                &rarr; IV. Scriptural Forensics
              </Link>
              <Link href="/wiki#05-life-mechanics" className="block py-1 text-muted hover:text-ash transition-all">
                &rarr; V. Life Mechanics
              </Link>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono font-bold uppercase text-amber tracking-widest mb-4">
              All Master Nodes
            </div>
            
            {categoryNames.map(category => (
              <div key={category} className="mb-6">
                <div className="text-[10px] font-mono uppercase text-muted/60 mb-2 border-b border-ash/10 pb-1">
                  {category}
                </div>
                <div className="space-y-1">
                  {categories[category].map((node: Omit<ContentNode, 'content'>) => (
                    <Link 
                      key={node.slug} 
                      href={node.url} 
                      className="block py-1.5 px-2 text-xs font-medium text-ash/80 hover:text-amber hover:bg-slate/50 rounded transition-all line-clamp-1"
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
