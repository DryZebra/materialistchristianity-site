'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ContentNode } from '@/lib/wiki';

interface MobileNavProps {
  categories: Record<string, ContentNode[]>;
}

export default function MobileNav({ categories }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const categoryNames = Object.keys(categories).sort();

  return (
    <>
      {/* TRIGGER BUTTON */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-[110] p-6 font-black uppercase text-xl shadow-[8px_8px_0_rgba(0,0,0,0.5)] transition-all flex items-center gap-3 lg:hidden ${
           isOpen ? 'bg-ash text-concrete' : 'bg-signal text-white'
        }`}
      >
        <span>{isOpen ? '[ CLOSE ]' : '[ MENU ]'}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          {isOpen ? (
            <line x1="18" y1="6" x2="6" y2="18" />
          ) : (
            <>
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {/* DRAWER LAYER */}
      <div 
        className={`fixed inset-0 z-[100] bg-concrete transform transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto p-8 pt-24 custom-scrollbar">
          <div className="mb-12 border-b-8 border-signal pb-8">
             <Link 
                href="/wiki" 
                onClick={() => setIsOpen(false)}
                className="text-6xl font-black text-ash uppercase leading-none italic"
              >
                Archive
              </Link>
          </div>

          <nav className="space-y-12 pb-32">
             <div className="grid grid-cols-1 gap-4">
                <Link 
                  href="/wiki/nodes" 
                  onClick={() => setIsOpen(false)}
                  className="p-4 bg-steel/20 border-l-4 border-ash hover:border-signal text-2xl font-black uppercase"
                >
                  All Axioms &rarr;
                </Link>
                <Link 
                  href="/wiki/essays" 
                  onClick={() => setIsOpen(false)}
                  className="p-4 bg-steel/20 border-l-4 border-ash hover:border-signal text-2xl font-black uppercase"
                >
                  Testimony Library &rarr;
                </Link>
             </div>

             {categoryNames.map(category => (
                <div key={category}>
                   <h3 className="text-xs font-mono font-black text-signal uppercase tracking-widest mb-6 opacity-60 border-b border-ash/10 pb-2">
                     Category // {category}
                   </h3>
                   <div className="grid grid-cols-1 gap-2">
                      {categories[category].map(node => (
                        <Link 
                          key={node.slug} 
                          href={`/wiki/mechanics/${node.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-3 text-xs font-bold uppercase transition-all duration-200 border-l-2 border-transparent hover:border-signal hover:bg-signal/5 hover:text-signal"
                        >
                          {node.title}
                        </Link>
                      ))}
                   </div>
                </div>
             ))}
          </nav>
        </div>
      </div>

      {/* OVERLAY for better focus */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[95] lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
