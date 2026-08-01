'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ContentNode } from '@/lib/wiki';

interface MobileNavProps {
  categories: Record<string, Omit<ContentNode, 'content'>[]>;
}

export default function MobileNav({ categories }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const categoryNames = Object.keys(categories).sort();

  return (
    <>
      {/* TRIGGER BUTTON */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-[110] px-5 py-3 font-mono font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 rounded lg:hidden ${
           isOpen ? 'bg-ash text-concrete' : 'bg-signal text-concrete shadow-lg'
        }`}
      >
        <span>{isOpen ? '[ CLOSE ]' : '[ MENU ]'}</span>
      </button>

      {/* DRAWER LAYER */}
      <div 
        className={`fixed inset-0 z-[100] bg-concrete text-ash transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto p-8 pt-20 custom-scrollbar">
          <div className="mb-8 border-b border-ash/10 pb-6">
             <Link 
                href="/wiki" 
                onClick={() => setIsOpen(false)}
                className="text-2xl font-bold text-white tracking-tight"
              >
                Garden Cathedral
              </Link>
          </div>

          <nav className="space-y-8 pb-32">
             <div className="grid grid-cols-1 gap-2 font-mono text-xs">
                <Link 
                  href="/wiki#01-axioms" 
                  onClick={() => setIsOpen(false)}
                  className="p-3 bg-slate border border-ash/10 hover:border-amber text-ash font-bold rounded"
                >
                  I. Structural Axioms &rarr;
                </Link>
                <Link 
                  href="/wiki#02-thermodynamics" 
                  onClick={() => setIsOpen(false)}
                  className="p-3 bg-slate border border-ash/10 hover:border-amber text-ash font-bold rounded"
                >
                  II. Thermodynamics of Sin &rarr;
                </Link>
                <Link 
                  href="/wiki#03-labor-and-torque" 
                  onClick={() => setIsOpen(false)}
                  className="p-3 bg-slate border border-ash/10 hover:border-amber text-ash font-bold rounded"
                >
                  III. Labor & Torque &rarr;
                </Link>
                <Link 
                  href="/wiki#04-verse-forensics" 
                  onClick={() => setIsOpen(false)}
                  className="p-3 bg-slate border border-ash/10 hover:border-amber text-ash font-bold rounded"
                >
                  IV. Scriptural Forensics &rarr;
                </Link>
                <Link 
                  href="/wiki#05-life-mechanics" 
                  onClick={() => setIsOpen(false)}
                  className="p-3 bg-slate border border-ash/10 hover:border-amber text-ash font-bold rounded"
                >
                  V. Applied Life Mechanics &rarr;
                </Link>
             </div>

             {categoryNames.map(category => (
                <div key={category}>
                   <h3 className="text-xs font-mono font-bold text-amber uppercase tracking-widest mb-3 border-b border-ash/10 pb-1">
                     Category // {category}
                   </h3>
                   <div className="grid grid-cols-1 gap-1">
                      {categories[category].map(node => (
                        <Link 
                          key={node.slug} 
                          href={node.url}
                          onClick={() => setIsOpen(false)}
                          className="block py-2 px-3 text-xs font-medium text-ash/80 hover:text-amber hover:bg-slate/50 rounded transition-all"
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

      {/* OVERLAY */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[95] lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
