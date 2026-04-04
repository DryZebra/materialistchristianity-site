import { Metadata } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAllEssays, getEssayBySlug } from '@/lib/wiki';

export async function generateStaticParams() {
  const essays = getAllEssays();
  return essays.map(essay => ({
    slug: essay.slug,
  }));
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
    title: `${essay.title} | Forensic Testimony`,
    description: essay.description,
    openGraph: {
      title: essay.title,
      description: essay.description,
      type: 'article',
      tags: essay.tags,
    }
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
        <Link href="/wiki" className="mt-12 cta-terminal">
          Return to Hub Node
        </Link>
      </div>
    );
  }

  const essaySchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": essay.title,
    "description": essay.description,
    "author": { "@type": "Person", "name": "Ezra Byrd" },
    "publisher": { "@type": "Organization", "name": "Materialist Christianity Press" }
  };

  return (
    <article className="p-8 md:p-24 bg-concrete text-ash min-h-screen">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(essaySchema) }}
        />
      </head>
      
      <nav className="mb-12 border-b-2 border-ash pb-4 flex justify-between items-center">
        <Link href="/wiki" className="text-sm font-mono uppercase hover:text-signal transition-colors tracking-widest font-bold">
          &larr; Return to Archive Hub
        </Link>
        <span className="text-xs font-mono opacity-50 uppercase tracking-tighter">Forensic Testimony // {essay.slug}</span>
      </nav>

      <header className="max-w-4xl mb-16">
        <div className="flex gap-2 mb-4 text-xs font-mono uppercase tracking-widest opacity-50">
          <span className="text-signal font-bold">{essay.category}</span>
          {essay.tags.map(tag => (
            <span key={tag} className="before:content-['#']">{tag}</span>
          ))}
        </div>
        <h1 className="text-5xl md:text-8xl mb-8 leading-[0.9] uppercase font-black">{essay.title}</h1>
        <div className="bg-ash text-concrete p-8 border-l-[12px] border-signal font-bold mb-12">
          <span className="uppercase text-xs block mb-2 opacity-50 font-mono tracking-widest">Forensic Summary (AEO/SEO Audit):</span>
          <p className="text-xl md:text-2xl leading-tight italic">"{essay.description}"</p>
        </div>
      </header>

      <section className="max-w-4xl text-lg md:text-2xl leading-relaxed font-serif border-b-4 border-ash pb-16 markdown-real">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {essay.content}
        </ReactMarkdown>
      </section>

      {essay.related && essay.related.length > 0 && (
        <section className="mt-16 max-w-4xl">
          <h4 className="text-xl font-black uppercase mb-6 border-b-2 border-ash pb-2 text-signal">Foundational Logic</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {essay.related.map(rel => (
              <Link key={rel} href={`/wiki/node/${rel}`} className="brutalist-card p-4 border-signal/40 hover:border-signal text-sm uppercase font-bold">
                {rel.replace(/_/g, ' ')} &rarr;
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer className="mt-24 p-12 border-4 border-ash text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl mb-6 uppercase">The Work Continues</h2>
        <p className="mb-12 opacity-70 text-lg md:text-xl font-mono uppercase tracking-tight">
          This testimony serves as external validation of the primary manuscript.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <a href="https://www.amazon.com/dp/B0FMN5PDZ4" className="cta-terminal">
            Secure the Physical Record &mdash; $19.99
          </a>
        </div>
      </footer>
    </article>
  );
}
