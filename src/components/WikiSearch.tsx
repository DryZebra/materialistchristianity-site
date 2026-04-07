'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';

interface SearchItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  type: 'node' | 'essay' | 'bible';
  url: string;
}

interface WikiSearchProps {
  items: SearchItem[];
}

export default function WikiSearch({ items }: WikiSearchProps) {
  const [query, setQuery] = useState('');
  const [pagefindResults, setPagefindResults] = useState<any[]>([]);
  const [isPagefindLoaded, setIsPagefindLoaded] = useState(false);

  // Initialize Pagefind (Production only)
  useEffect(() => {
    async function initPagefind() {
      try {
        // @ts-ignore
        if (typeof window !== 'undefined' && !window.__pagefind__) {
          // @ts-ignore
          const pagefind = await import(/* webpackIgnore: true */ '/_pagefind/pagefind.js');
          await pagefind.init();
          // @ts-ignore
          window.__pagefind__ = pagefind;
          setIsPagefindLoaded(true);
        } else {
          setIsPagefindLoaded(true);
        }
      } catch (e) {
        console.warn('Pagefind not available (Development mode). Falling back to metadata search.');
      }
    }
    initPagefind();
  }, []);

  // Search Logic
  useEffect(() => {
    async function doSearch() {
      if (!query) {
        setPagefindResults([]);
        return;
      }

      // @ts-ignore
      if (window.__pagefind__ && isPagefindLoaded) {
        // @ts-ignore
        const search = await window.__pagefind__.search(query);
        // Pagefind provides result objects that need to be "loaded" to get data
        const results = await Promise.all(search.results.slice(0, 8).map((r: any) => r.data()));
        setPagefindResults(results);
      }
    }
    doSearch();
  }, [query, isPagefindLoaded]);

  // Fallback Filtering (Metadata only)
  const fallbackItems = useMemo(() => {
    if (!query || isPagefindLoaded && pagefindResults.length > 0) return [];
    const lowerQuery = query.toLowerCase();
    return items.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) || 
      item.description.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery)
    ).slice(0, 8);
  }, [query, items, isPagefindLoaded, pagefindResults]);

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-12">
      <div className="flex items-center border-4 border-ash bg-steel/10 focus-within:border-signal transition-colors group">
        <div className="pl-4 opacity-50 group-focus-within:opacity-100 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <input
          type="text"
          placeholder="SEARCH ARCHIVE // FULL-TEXT ENGINE"
          className="w-full p-4 bg-transparent outline-none font-black uppercase text-xl placeholder:opacity-30"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="pr-4 hover:text-signal transition-colors font-black"
          >
            [X]
          </button>
        )}
      </div>

      {query && (pagefindResults.length > 0 || fallbackItems.length > 0) && (
        <div className="absolute top-full left-0 right-0 z-[100] mt-1 bg-concrete border-4 border-ash shadow-[12px_12px_0_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Pagefind Results */}
          {pagefindResults.map((res, i) => (
            <Link 
              key={res.url}
              href={res.url}
              onClick={() => setQuery('')}
              className="block p-4 border-b-2 border-ash/10 hover:bg-steel/30 hover:border-signal group transition-all"
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-mono text-signal font-black uppercase tracking-widest bg-signal/10 px-2 py-0.5">
                  Result {i + 1} // Confidence: High
                </span>
              </div>
              <h4 className="text-lg font-black uppercase group-hover:text-signal">{res.meta.title}</h4>
              <p 
                className="text-xs opacity-50 font-mono uppercase line-clamp-2"
                dangerouslySetInnerHTML={{ __html: res.excerpt }}
              />
            </Link>
          ))}

          {/* Fallback Results */}
          {pagefindResults.length === 0 && fallbackItems.map(item => (
            <Link 
              key={`${item.type}-${item.slug}`}
              href={item.url}
              onClick={() => setQuery('')}
              className="block p-4 border-b-2 border-ash/10 hover:bg-steel/30 hover:border-signal group transition-all"
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-mono text-signal font-black uppercase tracking-widest bg-signal/10 px-2 py-0.5">
                  {item.type} // {item.category}
                </span>
              </div>
              <h4 className="text-lg font-black uppercase group-hover:text-signal">{item.title}</h4>
              <p className="text-xs opacity-50 font-mono uppercase line-clamp-1">{item.description}</p>
            </Link>
          ))}
        </div>
      )}

      {query && pagefindResults.length === 0 && fallbackItems.length === 0 && (
        <div className="absolute top-full left-0 right-0 z-[100] mt-1 bg-concrete border-4 border-ash p-8 text-center shadow-[12px_12px_0_rgba(0,0,0,0.8)]">
          <p className="font-black uppercase text-xl text-signal">Logical Discontinuity</p>
          <p className="font-mono opacity-50 uppercase text-xs">No matching forensic data found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
