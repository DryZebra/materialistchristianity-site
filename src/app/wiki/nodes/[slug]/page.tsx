import { Metadata } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAllWikiNodes, getWikiNodeBySlug } from '@/lib/wiki';
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
      title: 'Axiom Not Found | Materialist Christianity',
      description: 'The requested mechanical node is not in the public record.'
    };
  }

  return {
    title: `${node.title} | Axiom`,
    description: node.description,
  };
}

export default async function WikiNodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const node = getWikiNodeBySlug(slug);
  
  if (!node) {
    return (
      <div className="p-8 md:p-24 bg-concrete text-ash min-h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-8xl text-signal uppercase font-black mb-4">Logical Discontinuity</h1>
        <p className="mt-4 font-mono uppercase opacity-60 text-xl max-w-2xl">
          Axiom Node [{slug}] is not currently active. 
        </p>
        <Link href="/wiki" className="mt-12 cta-terminal">Back to Hub</Link>
      </div>
    );
  }

  return (
    <article className="bg-concrete text-ash min-h-screen px-4 py-12">
      <nav className="mb-12 border-b-2 border-ash/20 pb-4 max-w-5xl mx-auto">
        <div className="breadcrumb">
          <Link href="/wiki" className="hover:text-signal">Archive</Link>
          <span className="breadcrumb-sep"></span>
          <Link href="/wiki/nodes" className="hover:text-signal">Axioms</Link>
          <span className="breadcrumb-sep"></span>
          <span className="text-signal">{node.title}</span>
        </div>
      </nav>

      <header className="max-w-4xl mx-auto mb-16 relative">
        <div className="flex flex-wrap gap-4 mb-6 text-[10px] font-mono uppercase tracking-widest text-signal font-black">
          AXIOM // {node.category}
        </div>
        <h1 className="text-5xl md:text-8xl mb-12 font-black italic tracking-tighter uppercase">
          {node.title}
        </h1>
        <div className="bg-steel/10 p-8 border-l-[12px] border-signal font-bold mb-12">
          <p className="text-xl md:text-3xl leading-tight uppercase tracking-tighter">{node.description}</p>
        </div>
      </header>

      <section className="max-w-5xl mx-auto text-lg md:text-2xl leading-relaxed markdown-real">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {transformWikiLinks(node.content)}
        </ReactMarkdown>
      </section>

      {node.related.length > 0 && (
        <section className="mt-24 max-w-4xl mx-auto italic border-t-4 border-ash pt-8">
          <h4 className="text-xl font-black uppercase mb-6">Related Axioms</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {node.related.map(rel => (
              <Link key={rel} href={`/wiki/nodes/${rel}`} className="brutalist-card p-4 hover:border-signal text-sm uppercase font-bold">
                {rel.replace(/_/g, ' ')} &rarr;
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
