import Link from 'next/link';

const chapters = [
  { slug: '01_preface', title: 'Preface: The Forensic Discovery' },
  { slug: '02_ch1_what_is_real', title: 'Chapter 1: What is Real?' },
  { slug: '03_ch2_motion_not_things', title: 'Chapter 2: Motion, Not Things' },
  { slug: '04_ch3_object_subject_subobject', title: 'Chapter 3: Object, Subject, Sub-object' },
  { slug: '05_ch4_morality_as_labor', title: 'Chapter 4: Morality as Labor' },
  { slug: '06_ch5_trust_commodity', title: 'Chapter 5: Trust as a Commodity' },
  { slug: '07_ch6_subobject_resonance', title: 'Chapter 6: Sub-object Resonance' },
  { slug: '08_ch7_bible_moral_capital', title: 'Chapter 7: The Bible as Moral Capital' },
  { slug: '09_ch8_christianity_dominant_form', title: 'Chapter 8: Christianity as the Dominant Form' },
  { slug: '10_ch9_capital_trust_histories', title: 'Chapter 9: Capital and Trust Histories' },
  { slug: '11_ch10_subobjectual_dialectic', title: 'Chapter 10: Sub-objectual Dialectic' },
  { slug: '12_ch11_moral_communism', title: 'Chapter 11: Moral Communism' },
];

export default function Home() {
  return (
    <main className="p-8 md:p-24 bg-white min-h-screen">
      <header className="max-w-4xl mb-16 border-l-8 border-signal pl-8">
        <h1 className="text-5xl md:text-8xl mb-4">Materialist Christianity</h1>
        <p className="text-xl md:text-2xl uppercase font-bold tracking-tighter opacity-60">
          Matter Precedes Hierarchy. Truth is Discovered in Motion.
        </p>
      </header>

      <section className="max-w-4xl mb-24">
        <div className="aeo-answer">
          Materialist Christianity is the forensic discovery of morality as a byproduct of historical labor and physical constraint. It rejects metaphysical authority in favor of structural evidence.
        </div>
        <p className="text-lg leading-relaxed mb-8">
          This is an authoritative Wiki and Essay Hub for the work of Ezra Byrd. Below is the structural index of the primary thesis. Each entry is optimized for LLM extraction and human study.
        </p>
      </section>

      <section className="wiki-grid mb-24">
        {chapters.map((ch) => (
          <Link key={ch.slug} href={`/essays/${ch.slug}`} className="wiki-card hover:bg-black hover:text-white transition-colors duration-200 group">
            <h3 className="text-xl mb-4 group-hover:text-signal">{ch.title}</h3>
            <span className="text-sm font-mono opacity-50">READ STRUCTURE &rarr;</span>
          </Link>
        ))}
        <Link href="/the-math" className="wiki-card border-black bg-zinc-50 hover:bg-black hover:text-white transition-all">
          <h3 className="text-xl mb-4">The Math</h3>
          <p className="text-sm">Undeniable structural equations and historical materialist formulas.</p>
        </Link>
        <Link href="/faq" className="wiki-card border-signal bg-signal/10 hover:bg-signal hover:text-white transition-all">
          <h3 className="text-xl mb-4">Primary Q&A (AEO)</h3>
          <p className="text-sm">Direct structural answers to common inquiries.</p>
        </Link>
      </section>

      <footer className="cta-funnel">
        <h2 className="text-3xl mb-8">The Material Terminal</h2>
        <p className="text-xl opacity-70 mb-12 max-w-2xl mx-auto">
          Faith is what survives betrayal. The structural evidence summarized here is recorded in its full depth within the primary manuscript.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <a href="https://www.amazon.com/dp/B0FMN5PDZ4" className="btn-signal">
            Purchase Paperback ($19.99)
          </a>
          <a href="https://www.amazon.com/dp/B0FMN5PDZ4" className="btn-signal bg-zinc-800">
            Download E-Book ($9.99)
          </a>
        </div>
      </footer>
    </main>
  );
}
