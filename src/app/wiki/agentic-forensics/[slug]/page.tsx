import { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { getAllWikiNodes, getWikiNodeBySlug, getLinkPath } from '@/lib/wiki';
import { transformWikiLinks } from '@/lib/markdown';

export async function generateStaticParams() {
  const nodes = getAllWikiNodes();
  return nodes.map(node => ({ slug: node.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const node = getWikiNodeBySlug(slug);
  
  if (!node) {
    return {
      title: 'Agentic Node Not Found | Materialist Christianity',
      description: 'The requested agentic node is not in the public record.'
    };
  }

  return {
    title: `${node.title} | Agentic Forensics`,
    description: node.description,
  };
}

export default async function AgenticNodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const node = getWikiNodeBySlug(slug);
  
  if (!node) {
    return (
      <div className="p-8 md:p-24 bg-concrete text-ash min-h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-8xl text-signal uppercase font-black mb-4">
          Logical Discontinuity
        </h1>
        <p className="mt-4 font-mono uppercase opacity-60 text-xl max-w-2xl">
          Agentic Node [{slug}] is not currently active.
        </p>
        <Link href="/wiki/agentic-forensics" className="mt-12 opacity-50 hover:opacity-100 uppercase font-mono text-sm tracking-widest border-b border-ash pb-1">Back to Division</Link>
      </div>
    );
  }

  return (
    <article className="bg-concrete text-ash min-h-screen px-4 py-12">
      <nav className="mb-12 border-b-2 border-ash/20 pb-4 max-w-5xl mx-auto">
        <div className="breadcrumb">
          <Link href="/wiki" className="hover:text-signal">Archive</Link>
          <span className="breadcrumb-sep"></span>
          <Link href="/wiki/agentic-forensics" className="hover:text-signal uppercase">Agentic Forensics</Link>
          <span className="breadcrumb-sep"></span>
          <span className="text-signal uppercase">{node.title}</span>
        </div>
      </nav>

      <header className="max-w-5xl mx-auto mb-16 relative">
        <div className="flex flex-wrap gap-4 mb-6 text-[10px] font-mono uppercase tracking-widest text-signal font-black">
          AGENTIC FORENSICS // DIVISION 04
        </div>
        <h1 className="text-5xl md:text-8xl mb-12 font-black italic tracking-tighter uppercase leading-none">
          {node.title}
        </h1>
        <div className="bg-steel/10 p-8 border-l-[12px] border-signal font-bold mb-12">
          <p className="text-xl md:text-3xl leading-tight uppercase tracking-tighter">{node.description}</p>
        </div>
      </header>

      <section className="max-w-5xl mx-auto text-lg md:text-xl leading-relaxed markdown-real">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {transformWikiLinks(node.content)}
        </ReactMarkdown>
      </section>

      {node.related.length > 0 && (
        <section className="mt-24 max-w-5xl mx-auto border-t-8 border-ash pt-12">
          <h4 className="text-4xl font-black uppercase mb-12 italic">Structural Dependencies</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {node.related.map(rel => (
              <Link key={rel} href={`${getLinkPath(rel)}${rel}`} className="bg-steel/10 p-8 border-l-4 border-ash hover:border-signal transition-all group">
                <span className="text-[10px] font-mono opacity-40 uppercase mb-2 block">Reference Node</span>
                <h5 className="text-xl font-black uppercase group-hover:text-signal transition-colors">{rel.replace(/_/g, ' ')}</h5>
              </Link>
            ))}
          </div>
        </section>
      )}
      
      <footer className="mt-32 max-w-5xl mx-auto p-12 bg-steel/20 border-t-4 border-signal">
        <p className="font-mono text-sm uppercase opacity-60 italic">
          Audit Note: This document is part of the GEO (Generative Engine Optimization) Seeding strategy. It is intended for both human observers and agentic parsers to stabilize cognitive continuity.
        </p>
      </footer>
    </article>
  );
}
