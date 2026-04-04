import { Metadata } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAllWikiNodes, getWikiNodeBySlug, getAllEssays, getEssayBySlug } from '@/lib/wiki';
import { transformWikiLinks } from '@/lib/markdown';

export async function generateStaticParams() {
  const nodes = getAllWikiNodes();
  const essays = getAllEssays();
  
  const allParams = [
    ...nodes.map(node => ({ slug: node.slug })),
    ...essays.map(essay => ({ slug: essay.slug }))
  ];
  
  return allParams;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let node = getWikiNodeBySlug(slug);
  
  if (!node) {
    node = getEssayBySlug(slug);
  }
  
  if (!node) {
    return {
      title: 'Logical Discontinuity | Materialist Christianity',
      description: 'Archival node not found in the public record.'
    };
  }

  return {
    title: `${node.title} | Materialist Christianity Wiki`,
    description: node.description,
    openGraph: {
      title: node.title,
      description: node.description,
      type: 'article',
      tags: node.tags,
    }
  };
}

export default async function WikiNode({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let node = getWikiNodeBySlug(slug);
  let isEssayFallback = false;

  if (!node) {
    // Fallback to essays if not found in wiki nodes
    const essay = getEssayBySlug(slug);
    if (essay) {
      node = essay;
      isEssayFallback = true;
    }
  }
  
  if (!node) {
    return (
      <div className="p-8 md:p-24 bg-concrete text-ash min-h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-8xl text-signal uppercase font-black mb-4">Logical Discontinuity</h1>
        <p className="mt-4 font-mono uppercase opacity-60 text-xl max-w-2xl">
          Archival Node [{slug}] is not currently active in the public record. 
        </p>
        <div className="mt-12 flex flex-col md:flex-row gap-6">
          <Link href="/wiki" className="cta-terminal border-ash hover:bg-ash hover:text-concrete">
            Back to Hub Node
          </Link>
          <Link href="/" className="cta-terminal">
            Return to Sales Terminal
          </Link>
        </div>
      </div>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": node.title,
    "description": node.description,
    "author": { "@type": "Person", "name": "Ezra Byrd" },
    "publisher": { "@type": "Organization", "name": "Materialist Christianity Press" }
  };

  return (
    <article className="bg-concrete text-ash min-h-screen">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </head>
      
      <nav className="mb-12 border-b-2 border-ash/20 pb-4">
        <div className="breadcrumb">
          <Link href="/wiki" className="hover:text-signal transition-colors">Archive</Link>
          <span className="breadcrumb-sep"></span>
          <span className="text-signal">{node.category}</span>
          <span className="breadcrumb-sep"></span>
          <span className="opacity-100">{node.title}</span>
        </div>
      </nav>

      <header className="max-w-4xl mb-16 relative">
        <div className="absolute -left-12 top-0 h-full w-1 bg-signal opacity-50 hidden md:block"></div>
        <div className="flex flex-wrap gap-4 mb-6 text-[10px] font-mono uppercase tracking-widest">
          <div className="bg-signal text-white px-3 py-1 font-black">
            Category // {node.category}
          </div>
          <div className="flex gap-2 items-center opacity-50">
            {node.tags.map(tag => (
              <span key={tag} className="border border-ash/30 px-2 py-0.5 before:content-['#']">{tag}</span>
            ))}
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl xl:text-8xl mb-12 leading-[0.9] break-words overflow-hidden font-black italic">
          {node.title}
        </h1>
        <div className="bg-steel/10 p-8 border-l-[12px] border-signal font-bold mb-12 shadow-[12px_12px_0_rgba(0,0,0,0.4)]">
          <span className="uppercase text-[10px] block mb-3 opacity-40 font-mono tracking-widest border-b border-ash/10 pb-1 w-fit">Extraction Hash // Description:</span>
          <p className="text-xl md:text-3xl leading-tight uppercase tracking-tighter">{node.description}</p>
        </div>
      </header>

      <section className="max-w-5xl text-lg md:text-2xl leading-relaxed font-serif border-b-4 border-ash pb-16 markdown-real">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {transformWikiLinks(node.content)}
        </ReactMarkdown>
      </section>

      {node.related.length > 0 && (
        <section className="mt-16 max-w-4xl">
          <h4 className="text-xl font-black uppercase mb-6 border-b-2 border-ash pb-2">Related Forensic Nodes</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {node.related.map(rel => (
              <Link key={rel} href={`/wiki/node/${rel}`} className="brutalist-card p-4 hover:border-signal text-sm uppercase font-bold">
                {rel.replace(/_/g, ' ')} &rarr;
              </Link>
            ))}
          </div>
        </section>
      )}

      {node.references && node.references.length > 0 && (
        <section className="mt-16 max-w-4xl">
          <h4 className="text-xl font-black uppercase mb-6 border-b-2 border-ash pb-2 text-signal">Forensic Testimony</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {node.references.map(ref => (
              <Link key={ref} href={`/wiki/essays/${ref}`} className="brutalist-card p-4 border-signal/40 hover:border-signal text-sm uppercase font-bold">
                {ref.replace(/_/g, ' ')} &rarr;
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer className="mt-24 p-12 border-4 border-ash text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl mb-6 uppercase">Expand the Logic</h2>
        <p className="mb-12 opacity-70 text-lg md:text-xl font-mono uppercase tracking-tight">
          This data-node is a subset of the primary manuscript. The full mechanical audit is preserved in the physical volume.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <a href="https://www.amazon.com/dp/B0FMN5PDZ4" className="cta-terminal">
            Paperback &mdash; $19.99
          </a>
          <a href="https://www.amazon.com/dp/B0FMN5PDZ4" className="cta-terminal bg-ash text-concrete">
             Kindle &mdash; $9.99
          </a>
        </div>
      </footer>
    </article>
  );
}
