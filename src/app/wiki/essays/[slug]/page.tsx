import { Metadata } from 'next';
import Link from 'next/link';
import { getAllWikiNodes, getWikiNodeBySlug } from '@/lib/wiki';

export async function generateStaticParams() {
  const nodes = getAllWikiNodes();
  return nodes.map(node => ({
    slug: node.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const node = getWikiNodeBySlug(slug);
  
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

export default async function Essay({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const node = getWikiNodeBySlug(slug);
  
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
    <article className="p-8 md:p-24 bg-concrete text-ash min-h-screen">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </head>
      
      <nav className="mb-12 border-b-2 border-ash pb-4">
        <Link href="/wiki" className="text-sm font-mono uppercase hover:text-signal transition-colors tracking-widest font-bold">
          &larr; Hub Node / Wiki Index
        </Link>
      </nav>

      <header className="max-w-4xl mb-16">
        <div className="flex gap-2 mb-4 text-xs font-mono uppercase tracking-widest opacity-50">
          <span className="text-signal font-bold">{node.category}</span>
          {node.tags.map(tag => (
            <span key={tag} className="before:content-['#']">{tag}</span>
          ))}
        </div>
        <h1 className="text-5xl md:text-[8rem] mb-12 leading-[0.85]">{node.title}</h1>
        <div className="bg-ash text-concrete p-8 border-l-[12px] border-signal font-bold mb-12">
          <span className="uppercase text-xs block mb-2 opacity-50 font-mono tracking-widest">Machine-Readable Extract (AEO Index):</span>
          <p className="text-xl md:text-2xl leading-tight">{node.description}</p>
        </div>
      </header>

      <section className="max-w-5xl text-lg md:text-2xl leading-relaxed whitespace-pre-wrap font-serif border-b-4 border-ash pb-16">
        {node.content}
      </section>

      {node.related.length > 0 && (
        <section className="mt-16 max-w-4xl">
          <h4 className="text-xl font-black uppercase mb-6 border-b-2 border-ash pb-2">Related Forensic Nodes</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {node.related.map(rel => (
              <Link key={rel} href={`/wiki/essays/${rel}`} className="brutalist-card p-4 hover:border-signal text-sm uppercase font-bold">
                {rel.replace(/_/g, ' ')} &rarr;
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
