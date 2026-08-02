import { Metadata } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { getAllWikiNodes, getWikiNodeBySlug, getLinkPath } from '@/lib/wiki';
import { transformWikiLinks } from '@/lib/markdown';

export async function generateStaticParams() {
  const nodes = getAllWikiNodes();
  return nodes.map(node => ({
    category: node.category,
    slug: node.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const node = getWikiNodeBySlug(slug);

  if (!node) {
    return {
      title: 'Axiom Not Found | Materialist Christianity',
      description: 'The requested mechanical node is not in the public record.',
    };
  }

  return {
    title: `${node.title} | Materialist Christianity Wiki`,
    description: node.description,
  };
}

export default async function WikiCategoryNodePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const node = getWikiNodeBySlug(slug);

  if (!node) {
    return (
      <div className="p-8 md:p-24 bg-concrete text-ash min-h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-8xl text-signal uppercase font-black mb-4">
          Node Unresolved
        </h1>
        <p className="mt-4 font-mono uppercase opacity-60 text-xl max-w-2xl">
          Axiom Node [{slug}] is not currently active under [{category}].
        </p>
        <Link
          href="/wiki"
          className="mt-12 opacity-50 hover:opacity-100 uppercase font-mono text-sm tracking-widest border-b border-ash pb-1"
        >
          Return to Knowledge Hub
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-concrete text-ash min-h-screen px-4 py-12">
      <nav className="mb-12 border-b-2 border-ash/20 pb-4 max-w-5xl mx-auto">
        <div className="breadcrumb">
          <Link href="/wiki" className="hover:text-signal font-mono text-xs uppercase tracking-widest opacity-60">
            Knowledge Hub
          </Link>
          <span className="breadcrumb-sep text-ash/40"> / </span>
          <span className="font-mono text-xs uppercase tracking-widest text-signal">
            {node.category}
          </span>
          <span className="breadcrumb-sep text-ash/40"> / </span>
          <span className="text-ash font-bold text-xs uppercase">{node.title}</span>
        </div>
      </nav>

      <header className="max-w-4xl mx-auto mb-16 relative">
        <div className="flex flex-wrap gap-4 mb-6 text-[10px] font-mono uppercase tracking-widest text-signal font-black">
          CATEGORY // {node.category.toUpperCase()}
        </div>
        <h1 className="text-4xl md:text-7xl mb-8 font-black italic tracking-tighter uppercase leading-tight">
          {node.title}
        </h1>
        <div className="bg-steel/10 p-8 border-l-[12px] border-signal font-bold mb-12">
          <p className="text-xl md:text-2xl leading-relaxed uppercase tracking-tight">{node.description}</p>
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

      {/* AMAZON CONVERSION BANNER */}
      <section className="mt-20 max-w-5xl mx-auto p-8 md:p-12 bg-ash text-concrete border-t-8 border-signal">
        <h3 className="text-2xl md:text-4xl font-black uppercase mb-4 text-signal italic">
          Examine the Full Masterwork
        </h3>
        <p className="text-base md:text-lg font-mono uppercase opacity-80 leading-snug mb-8">
          This node is part of the broader physical and mechanical framework recorded in Materialist Christianity by Ezra Byrd.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/thank-you-amazon?vol=1"
            className="cta-terminal bg-amber text-concrete font-black uppercase tracking-widest text-sm inline-block"
          >
            Get Volume I on Amazon &rarr;
          </Link>
          <Link
            href="/thank-you-amazon?vol=2"
            className="cta-terminal bg-signal text-white font-black uppercase tracking-widest text-sm inline-block"
          >
            Get Volume II on Amazon &rarr;
          </Link>
        </div>
      </section>

      {node.related.length > 0 && (
        <section className="mt-16 max-w-5xl mx-auto italic border-t-4 border-ash/20 pt-8">
          <h4 className="text-lg font-black uppercase mb-6 text-ash/80">Related Nodes</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {node.related.map(rel => (
              <Link
                key={rel}
                href={getLinkPath(rel)}
                className="brutalist-card p-4 hover:border-signal text-sm uppercase font-bold block"
              >
                {rel.replace(/-/g, ' ')} &rarr;
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
