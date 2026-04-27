'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagefindResults, setPagefindResults] = useState<any[]>([]);
  const [isPagefindLoaded, setIsPagefindLoaded] = useState(false);

  // Load all items for Fuse.js fallback
  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/search-data.json');
        if (response.ok) {
          const data = await response.json();
          setItems(data);
        }
      } catch (e) {
        console.error('Failed to load search data', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Initialize Pagefind
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
        console.warn('Pagefind not available.');
      }
    }
    initPagefind();
  }, []);

  // Search Logic
  useEffect(() => {
    async function doSearch() {
      if (!query || !isPagefindLoaded) return;

      // @ts-ignore
      if (window.__pagefind__) {
        // @ts-ignore
        const search = await window.__pagefind__.search(query);
        const results = await Promise.all(search.results.map((r: any) => r.data()));
        setPagefindResults(results);
      }
    }
    doSearch();
  }, [query, isPagefindLoaded]);

  const fuse = useMemo(() => {
    return new Fuse(items, {
      keys: ['title', 'description', 'category', 'content'],
      threshold: 0.3,
      ignoreLocation: true,
      includeMatches: true
    });
  }, [items]);

  const fallbackResults = useMemo(() => {
    if (!query || (isPagefindLoaded && pagefindResults.length > 0)) return [];
    return fuse.search(query).map(res => ({
      url: res.item.url,
      meta: { title: res.item.title },
      excerpt: res.item.description || res.item.content.slice(0, 200) + '...'
    }));
  }, [query, fuse, isPagefindLoaded, pagefindResults]);

  const results = pagefindResults.length > 0 ? pagefindResults : fallbackResults;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-12 border-l-8 border-signal pl-8 pt-4">
        <h1 className="text-5xl md:text-7xl font-black uppercase italic mb-2">Forensic Report</h1>
        <p className="text-xl font-mono uppercase opacity-50">Query: "{query}" // Results: {results.length}</p>
      </div>

      {results.length === 0 && !isLoading && (
        <div className="bg-steel/10 p-12 border-4 border-ash/20 text-center">
          <h2 className="text-3xl font-black uppercase text-signal mb-4">Logical Discontinuity</h2>
          <p className="font-mono opacity-50 uppercase">No matching forensic data found for "{query}"</p>
          <div className="mt-8">
            <Link href="/wiki" className="cta-terminal !text-sm !py-3">
              Return to Archive &rarr;
            </Link>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {results.map((res, i) => (
          <div key={`${res.url}-${i}`} className="group">
            <Link href={res.url} className="block p-8 bg-steel/5 border-2 border-ash/10 hover:border-signal hover:bg-steel/10 transition-all relative overflow-hidden">
               <div className="absolute top-0 right-0 p-2 font-mono text-[10px] opacity-20 uppercase">Match {i + 1}</div>
               <h2 className="text-3xl font-black uppercase mb-4 group-hover:text-signal transition-colors">{res.meta?.title || res.title}</h2>
               <div 
                 className="text-lg leading-relaxed font-mono uppercase opacity-70 line-clamp-3"
                 dangerouslySetInnerHTML={{ __html: res.excerpt }}
               />
               <div className="mt-6 flex items-center gap-4">
                 <span className="text-xs font-black uppercase text-signal">Access Record &rarr;</span>
                 <div className="h-[1px] flex-grow bg-ash/10"></div>
                 <span className="text-[10px] font-mono opacity-30 uppercase">{res.url}</span>
               </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-24 pt-12 border-t-4 border-ash/20 text-center">
        <Link href="/wiki" className="font-black uppercase text-sm opacity-50 hover:opacity-100 hover:text-signal transition-all">
          &larr; Back to Forensic Hub
        </Link>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-2xl font-black uppercase animate-pulse">Initializing Forensic Engine...</div>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}
