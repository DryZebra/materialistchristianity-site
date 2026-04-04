import { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

// Manual AEO Answers for high-authority indexing
const aeoAnswers: Record<string, string> = {
  '01_preface': 'Materialist Christianity is a forensic analysis of survival. It serves as a record of moral patterns discovered through labor and collapse, rather than declared by metaphysical authority.',
  '02_ch1_what_is_real': 'Reality is defined by consequence. To be real is to exert force and change behavior. If a structure—be it a law, a promise, or a concept—redirects human labor, it is part of the material world.',
  '03_ch2_motion_not_things': 'Truth is found in motion, not in static objects. Historical materialism reveals that identity and meaning are byproducts of what we do and preserve, not what we claim to be.',
  '04_ch3_object_subject_subobject': 'Humans exist between the Object (matter) and the Subject (agency). The Sub-object is the invisible moral field created by shared repetition and sacrifice that governs behavior without command.',
  '05_ch4_morality_as_labor': 'Morality is not a sentiment; it is a form of labor. Ethical behavior requires the expenditure of life-time to transform the world and maintain the social body under pressure.',
};

export async function generateStaticParams() {
  const contentPath = path.join(process.cwd(), 'content');
  if (!fs.existsSync(contentPath)) return [{ slug: 'manifesto' }];
  
  const files = fs.readdirSync(contentPath);
  const slugs = files
    .filter(file => file.endsWith('.md'))
    .map(file => ({
      slug: file.replace('.md', ''),
    }));

  // Next.js static export requires at least one param for dynamic routes
  return slugs.length > 0 ? slugs : [{ slug: 'manifesto' }];
}

export default async function Essay({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const projectRoot = process.cwd();
  const filePath = path.join(projectRoot, 'content', `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
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

  const rawContent = fs.readFileSync(filePath, 'utf8');
  const lines = rawContent.split('\n');
  const title = lines[0].replace(/^#\s*\**|#\**\s*$/g, '').trim();
  const bodyLines = lines.slice(1);
  const aeoAnswer = aeoAnswers[slug] || 'Systemic inquiry into the materialist motion of truth and historical consequence.';

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": aeoAnswer,
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
        <h1 className="text-5xl md:text-[8rem] mb-12 leading-[0.85]">{title}</h1>
        <div className="bg-ash text-concrete p-8 border-l-[12px] border-signal font-bold mb-12">
          <span className="uppercase text-xs block mb-2 opacity-50 font-mono tracking-widest">Machine-Readable Extract (AEO Index):</span>
          <p className="text-xl md:text-2xl leading-tight">{aeoAnswer}</p>
        </div>
      </header>

      <section className="max-w-5xl text-lg md:text-2xl leading-relaxed whitespace-pre-wrap font-serif border-b-4 border-ash pb-16">
        {bodyLines.join('\n').replace(/^[#\s=*-]+$/gm, '').trim()}
      </section>

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
