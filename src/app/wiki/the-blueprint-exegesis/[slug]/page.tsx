import { Metadata } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAllBibleTranslations, getBibleBySlug, getLinkPath } from '@/lib/wiki';
import { transformWikiLinks } from '@/lib/markdown';

export async function generateStaticParams() {
  const bibles = getAllBibleTranslations();
  return bibles.map(b => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const bible = getBibleBySlug(slug);
  
  if (!bible) {
    return {
      title: 'Missing Record | Materialist Christianity',
      description: 'The requested scriptural teardown is not in the public record.'
    };
  }

  return {
    title: `${bible.title} | The Blueprint Exegesis`,
    description: bible.description,
  };
}

export default async function BiblePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bible = getBibleBySlug(slug);
  
  if (!bible) {
    return (
      <div className="p-8 md:p-24 bg-concrete text-ash min-h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-8xl text-signal uppercase font-black mb-4">Forensic Gap</h1>
        <p className="mt-4 font-mono uppercase opacity-60 text-xl max-w-2xl">
          Scriptural Teardown [{slug}] is not currently active. 
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
          <Link href="/wiki/the-blueprint-exegesis" className="hover:text-signal">The Blueprint Exegesis</Link>
          <span className="breadcrumb-sep"></span>
          <span className="text-signal">{bible.title}</span>
        </div>
      </nav>

      <header className="max-w-4xl mx-auto mb-16">
        <div className="flex gap-2 mb-4 text-[10px] font-mono uppercase tracking-widest text-signal font-black">
          THE BLUEPRINT EXEGESIS // {bible.category}
        </div>
        <h1 className="text-5xl md:text-8xl mb-8 leading-[0.9] uppercase font-black italic tracking-tighter">
          {bible.title}
        </h1>
        <div className="bg-steel/10 p-8 border-l-[12px] border-signal font-bold mb-12 shadow-[12px_12px_0_rgba(0,0,0,0.4)]">
          <span className="uppercase text-[10px] block mb-2 opacity-50 font-mono tracking-widest">Protocol Summary:</span>
          <p className="text-xl md:text-2xl leading-tight uppercase font-black">{bible.description}</p>
        </div>
      </header>

      <section className="max-w-5xl mx-auto text-lg md:text-2xl leading-relaxed markdown-real border-b-4 border-ash pb-16">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {transformWikiLinks(bible.content)}
        </ReactMarkdown>
      </section>

      {bible.related && bible.related.length > 0 && (
        <section className="mt-16 max-w-4xl mx-auto">
          <h4 className="text-xl font-black uppercase mb-6 text-signal italic">Mechanical Axioms Activated</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bible.related.map(rel => (
              <Link key={rel} href={`${getLinkPath(rel)}${rel}`} className="brutalist-card p-4 hover:border-signal text-sm uppercase font-bold">
                {rel.replace(/_/g, ' ')} &rarr;
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer className="mt-24 p-12 border-4 border-ash text-center max-w-4xl mx-auto bg-steel/5">
        <h2 className="text-4xl md:text-6xl mb-6 uppercase italic font-black">The Direct Wire</h2>
        <p className="mb-12 opacity-70 text-lg md:text-xl font-mono uppercase tracking-tight">
          This forensic audit proves the material reality behind the scriptural symbol. Information is mass.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link href="/wiki" className="cta-terminal">
            Search More Scripts &rarr;
          </Link>
        </div>
      </footer>
    </article>
  );
}
