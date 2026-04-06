import { Metadata } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAllEssays, getEssayBySlug, getLinkPath } from '@/lib/wiki';
import { transformWikiLinks } from '@/lib/markdown';

export async function generateStaticParams() {
  const essays = getAllEssays();
  return essays.map(essay => ({ slug: essay.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);
  
  if (!essay) {
    return {
      title: 'Missing Testimony | Materialist Christianity',
      description: 'The requested forensic document is not in the public record.'
    };
  }

  return {
    title: `${essay.title} | Testimony`,
    description: essay.description,
  };
}

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);
  
  if (!essay) {
    return (
      <div className="p-8 md:p-24 bg-concrete text-ash min-h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-8xl text-signal uppercase font-black mb-4">Forensic Gap</h1>
        <p className="mt-4 font-mono uppercase opacity-60 text-xl max-w-2xl">
          Testimony [{slug}] has not yet been processed for the public record. 
        </p>
        <Link href="/wiki" className="mt-12 cta-terminal">Return to Hub</Link>
      </div>
    );
  }

  return (
    <article className="bg-concrete text-ash min-h-screen px-4 py-12">
      <nav className="mb-12 border-b-2 border-ash/20 pb-4 max-w-5xl mx-auto flex justify-between items-center">
        <div className="breadcrumb">
          <Link href="/wiki" className="hover:text-signal">Archive</Link>
          <span className="breadcrumb-sep"></span>
          <Link href="/wiki/essays" className="hover:text-signal">Testimony</Link>
          <span className="breadcrumb-sep"></span>
          <span className="text-signal">{essay.title}</span>
        </div>
      </nav>

      <header className="max-w-4xl mx-auto mb-16">
        <div className="flex gap-2 mb-4 text-[10px] font-mono uppercase tracking-widest opacity-50 font-black">
          TESTIMONY // {essay.category} // {essay.date}
        </div>
        <h1 className="text-5xl md:text-8xl mb-8 leading-[0.9] uppercase font-black italic tracking-tighter">
          {essay.title}
        </h1>
        <div className="bg-ash text-concrete p-8 border-l-[12px] border-signal font-bold mb-12 shadow-[12px_12px_0_rgba(0,0,0,0.4)]">
          <p className="text-xl md:text-2xl leading-tight uppercase">"{essay.description}"</p>
        </div>
      </header>

      <section className="max-w-4xl mx-auto text-lg md:text-2xl leading-relaxed markdown-real">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {transformWikiLinks(essay.content)}
        </ReactMarkdown>
      </section>

      {essay.related && essay.related.length > 0 && (
        <section className="mt-24 max-w-4xl mx-auto border-t-4 border-ash pt-8">
          <h4 className="text-xl font-black uppercase mb-6 text-signal">Foundational Logic</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {essay.related.map(rel => (
              <Link key={rel} href={`${getLinkPath(rel)}${rel}`} className="brutalist-card p-4 hover:border-signal text-sm uppercase font-bold">
                {rel.replace(/_/g, ' ')} &rarr;
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
