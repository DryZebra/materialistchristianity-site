import Link from 'next/link';
import StructuralAuditTool from '@/components/StructuralAuditTool';

export default function LandingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://materialistchristianity.org/#website',
        'url': 'https://materialistchristianity.org',
        'name': 'Materialist Christianity',
        'description': 'The physical, thermodynamic and mechanical reality of scripture and human morality.'
      },
      {
        '@type': 'Book',
        '@id': 'https://materialistchristianity.org/#book',
        'name': 'Materialist Christianity',
        'author': {
          '@type': 'Person',
          'name': 'Ezra Byrd',
          'jobTitle': 'Electrician, JATC Instructor, Author',
          'url': 'https://materialistchristianity.org/#author'
        },
        'isbn': '979-8-9998006-0-2',
        'url': 'https://www.amazon.com/dp/B0FMN5PDZ4',
        'offers': [
          {
            '@type': 'Offer',
            'name': 'Paperback',
            'price': '19.99',
            'priceCurrency': 'USD',
            'availability': 'https://schema.org/InStock',
            'url': 'https://www.amazon.com/dp/B0FMN5PDZ4'
          },
          {
            '@type': 'Offer',
            'name': 'Kindle Edition',
            'price': '9.99',
            'priceCurrency': 'USD',
            'availability': 'https://schema.org/InStock',
            'url': 'https://www.amazon.com/dp/B0FMN5PDZ4'
          }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen bg-concrete text-ash selection:bg-signal selection:text-white pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* TOP NAVIGATION BAR */}
      <nav className="border-b-4 border-ash bg-concrete/90 backdrop-blur sticky top-0 z-40 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-black text-xl uppercase tracking-tighter hover:text-signal italic">
            Materialist Christianity
          </Link>
          <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest">
            <Link href="/read-chapter-1" className="hidden sm:inline-block hover:text-signal font-bold">
              Read Chapter 1
            </Link>
            <Link href="/audit" className="hidden sm:inline-block hover:text-signal font-bold">
              Life Audit
            </Link>
            <Link href="/scripture" className="hidden md:inline-block hover:text-signal font-bold">
              Verse Mechanics
            </Link>
            <Link href="/wiki" className="hidden lg:inline-block hover:text-signal font-bold">
              Knowledge Hub
            </Link>
            <a
              href="https://www.amazon.com/dp/B0FMN5PDZ4"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-terminal !py-2 !px-4 !text-xs font-black uppercase bg-signal text-white"
            >
              Buy on Amazon &rarr;
            </a>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION (Above the Fold) */}
      <section className="min-h-[85vh] flex flex-col justify-center items-center p-8 py-20 text-center border-b-8 border-ash relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5 pointer-events-none text-[18vw] font-black uppercase whitespace-nowrap overflow-hidden select-none flex items-center justify-center">
          MATTER MOTION TORQUE
        </div>
        
        <header className="max-w-5xl z-10 py-8">
          <div className="inline-block bg-ash text-concrete px-4 py-1 font-mono text-xs font-black uppercase tracking-[0.2em] mb-8 border-l-4 border-signal">
            Written by Ezra Byrd &mdash; Union Electrician, Foreman & Author
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-9xl mb-8 leading-none font-black italic uppercase tracking-tighter">
            Matter Precedes <br/> Hierarchy.
          </h1>
          
          <p className="text-lg md:text-2xl font-mono uppercase tracking-tight mb-12 opacity-80 max-w-3xl mx-auto leading-relaxed">
            A forensic audit of faith, proving that morality is not magical sky-decrees, but the physical mechanism for human survival.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://www.amazon.com/dp/B0FMN5PDZ4" 
              target="_blank"
              rel="noopener noreferrer"
              className="cta-terminal !py-4 !px-8 !text-base bg-signal text-white font-black"
            >
              Buy the Book on Amazon ($19.99) &rarr;
            </a>
            <Link 
              href="/read-chapter-1" 
              className="cta-terminal !py-4 !px-8 !text-base bg-steel/20 border-ash text-ash hover:border-signal font-black"
            >
              Read Chapter 1 Free &rarr;
            </Link>
          </div>
        </header>

        <div className="mt-12 animate-bounce opacity-50 z-10">
          <span className="font-mono text-xs uppercase tracking-widest">&darr; Scroll for Forensic Audit &darr;</span>
        </div>
      </section>

      {/* 2. INTERACTIVE STRUCTURAL LIFE AUDIT TOOL (DIRECT ON HOMEPAGE) */}
      <section className="p-8 md:p-24 bg-concrete border-b-8 border-ash">
        <div className="max-w-6xl mx-auto">
          <StructuralAuditTool />
        </div>
      </section>

      {/* 3. THE AUTHOR'S STORY & CREDIBILITY */}
      <section className="p-8 md:p-24 bg-ash text-concrete border-b-4 border-concrete">
        <div className="max-w-5xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-signal font-black mb-4">
            AUTHOR TESTIMONY // THE INDUSTRIAL FLOOR
          </div>
          <h2 className="text-3xl md:text-6xl font-black uppercase italic mb-8 leading-tight">
            "I didn't write this book because I found religion. I wrote it because I ran out of places to stand."
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6 text-lg md:text-xl font-mono leading-relaxed opacity-90">
              <p>
                I am an electrician, a union member, a foreman, a teacher at the JATC, and an atheist. I gave everything to my work, stayed loyal, built love with my own hands, and sacrificed for others. But eventually, the structure I trusted collapsed under contradiction.
              </p>
              <p>
                I went looking for something that could survive collapse and still call itself good. I found that scripture was not a set of magical sky-decrees; it was the empirical sediment of human survival strategies carved by working-class people under 2,000 years of imperial pressure.
              </p>
              <p>
                The process is real. Eliminating discontinuous stories cleared my anxiety. Grace acts as real-time error correction. Covenant trust is physical infrastructure.
              </p>
            </div>

            <div className="lg:col-span-4 bg-concrete text-ash p-8 border-l-8 border-signal space-y-4">
              <h3 className="font-black text-xl uppercase italic text-signal">Ezra Byrd</h3>
              <p className="text-xs font-mono uppercase opacity-70">
                Author & Journeyman Electrician
              </p>
              <ul className="text-xs font-mono uppercase space-y-2 opacity-80 pt-4 border-t border-ash/20">
                <li>&check; Local Union Member</li>
                <li>&check; Electrical Apprenticeship Instructor</li>
                <li>&check; Physical Materialist Exegesis</li>
                <li>&check; Author of Volume I & Volume II</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOUR TARGET AUDIENCE SOLUTION CARDS */}
      <section className="p-8 md:p-24 bg-concrete text-ash border-b-4 border-ash">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-6xl font-black uppercase italic mb-4">
            Who This Book Is For
          </h2>
          <p className="text-base md:text-xl font-mono uppercase opacity-70 mb-16 max-w-3xl">
            Four entry points into the physical reality of Materialist Christianity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* CARD 1 */}
            <div className="bg-steel/10 p-8 border-t-4 border-signal hover:border-signal transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-signal uppercase tracking-widest font-black mb-2 block">01 // Deconstruction Recovery</span>
                <h3 className="text-2xl font-black uppercase italic mb-4">For Questioning Christians</h3>
                <p className="text-sm font-mono leading-relaxed opacity-80">
                  Disillusioned by institutional hypocrisy, political corruption, or magic-thinking dogma? Discover the unshakeable behavioral process embedded in scripture that survives deconstruction.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-ash/20">
                <Link href="/wiki/05-life-mechanics/reconstruction-after-collapse" className="text-xs font-mono font-bold uppercase text-signal hover:underline">
                  Read Reconstruction Guide &rarr;
                </Link>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="bg-steel/10 p-8 border-t-4 border-ash hover:border-signal transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-signal uppercase tracking-widest font-black mb-2 block">02 // Secular Meaning</span>
                <h3 className="text-2xl font-black uppercase italic mb-4">For Atheists & Humanists</h3>
                <p className="text-sm font-mono leading-relaxed opacity-80">
                  Craving moral structure, community rhythm, and purpose without accepting supernatural claims? Learn how the Bible acts as historical survival technology for human reproduction.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-ash/20">
                <Link href="/wiki/01-axioms/physical-boundary-condition" className="text-xs font-mono font-bold uppercase text-signal hover:underline">
                  Examine Physical Boundary Condition &rarr;
                </Link>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="bg-steel/10 p-8 border-t-4 border-ash hover:border-signal transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-signal uppercase tracking-widest font-black mb-2 block">03 // Labor & Class</span>
                <h3 className="text-2xl font-black uppercase italic mb-4">For Workers & Trade Unionists</h3>
                <p className="text-sm font-mono leading-relaxed opacity-80">
                  Reframing value, labor, and profit on the shop floor. Value is what holds under contradiction; labor is meaningful physical action; profit is extraction taking without return.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-ash/20">
                <Link href="/wiki/03-labor-and-torque/labor-vs-profit" className="text-xs font-mono font-bold uppercase text-signal hover:underline">
                  Examine Labor vs. Profit Axiom &rarr;
                </Link>
              </div>
            </div>

            {/* CARD 4 */}
            <div className="bg-steel/10 p-8 border-t-4 border-signal hover:border-signal transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-signal uppercase tracking-widest font-black mb-2 block">04 // Mental Peace</span>
                <h3 className="text-2xl font-black uppercase italic mb-4">For Anyone Facing Anxiety & Fatigue</h3>
                <p className="text-sm font-mono leading-relaxed opacity-80">
                  Anxiety is the physical heat generated by discontinuous stories. Collapse your life into one transparent reality to eliminate internal friction.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-ash/20">
                <Link href="/wiki/05-life-mechanics/eliminating-anxiety" className="text-xs font-mono font-bold uppercase text-signal hover:underline">
                  Examine Anxiety Physics &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. IN-BROWSER SAMPLE EXCERPT PROMO */}
      <section className="p-8 md:p-24 bg-ash text-concrete border-b-4 border-concrete">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-signal font-black block">
            NO EMAIL REQUIRED // IMMEDIATE ACCESS
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic">
            Read Chapter 1: "What Is Real?"
          </h2>
          <p className="text-lg md:text-xl font-mono uppercase opacity-80 max-w-2xl mx-auto">
            Before you buy the book, inspect the studs. Read the complete Preface and Chapter 1 directly in your browser.
          </p>

          <div className="pt-4 flex justify-center">
            <Link 
              href="/read-chapter-1" 
              className="cta-terminal !py-4 !px-8 !text-base bg-concrete text-ash font-black uppercase"
            >
              Open Chapter 1 Reader Now &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 6. PROOF OF TORQUE (Strongest Quotes) */}
      <section className="p-8 md:p-24 bg-concrete text-ash border-b-4 border-ash relative">
        <h2 className="text-3xl md:text-6xl font-black uppercase italic mb-16 text-center">
          Proof of Torque
        </h2>
        <div className="max-w-5xl mx-auto space-y-16">
          <blockquote className="text-2xl md:text-4xl border-l-[12px] border-signal pl-8 italic leading-tight font-serif">
            "I didn’t go looking for God. I went looking for something that could survive collapse and still call itself good."
          </blockquote>
          <blockquote className="text-2xl md:text-4xl border-l-[12px] border-signal pl-8 italic leading-tight ml-auto md:w-4/5 font-serif">
            "Reality isn't determined by what can be touched, but by what causes change. If it alters behavior, it's real."
          </blockquote>
          <blockquote className="text-2xl md:text-4xl border-l-[12px] border-signal pl-8 italic leading-tight font-serif">
            "Profit is what’s taken from labor without returning motion. Profit is evil in physical form."
          </blockquote>
        </div>
      </section>

      {/* 7. FINAL AMAZON CONVERSION & BOOK PURCHASE */}
      <section className="p-8 md:p-24 bg-ash text-concrete text-center border-t-8 border-signal">
        <div className="max-w-4xl mx-auto">
          <div className="md:w-1/2 flex justify-center mx-auto mb-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-signal rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
              <img 
                src="/images/book-cover.png" 
                alt="Materialist Christianity Book Cover by Ezra Byrd" 
                className="relative rounded-lg shadow-2xl w-full max-w-sm border-4 border-concrete"
              />
            </div>
          </div>

          <h2 className="text-4xl md:text-7xl font-black uppercase italic mb-4">
            Examine the Full Master Manuscript
          </h2>
          <p className="text-lg md:text-xl font-mono uppercase opacity-80 max-w-2xl mx-auto mb-12">
            Order your copy of Materialist Christianity on Amazon in Paperback or Kindle format.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center max-w-2xl mx-auto">
            <a 
              href="https://www.amazon.com/dp/B0FMN5PDZ4" 
              target="_blank"
              rel="noopener noreferrer"
              className="cta-terminal bg-concrete text-ash flex-1 !py-5 !text-base font-black"
            >
              Paperback &mdash; $19.99 on Amazon &rarr;
            </a>
            <a 
              href="https://www.amazon.com/dp/B0FMN5PDZ4" 
              target="_blank"
              rel="noopener noreferrer"
              className="cta-terminal bg-signal text-white flex-1 !py-5 !text-base font-black"
            >
              Kindle Edition &mdash; $9.99 on Amazon &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="p-12 bg-concrete text-ash border-t-4 border-ash">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <h4 className="font-black text-xl mb-2 italic uppercase">MATERIALIST CHRISTIANITY</h4>
            <p className="text-xs opacity-60 uppercase font-mono">&copy; {new Date().getFullYear()} EZRA BYRD. ALL RIGHTS RESERVED.</p>
          </div>
          <nav className="flex flex-wrap gap-8 font-mono text-xs uppercase tracking-widest justify-center">
            <Link href="/read-chapter-1" className="hover:text-signal">Read Chapter 1</Link>
            <Link href="/audit" className="hover:text-signal">Life Audit</Link>
            <Link href="/scripture" className="hover:text-signal">Verse Mechanics</Link>
            <Link href="/wiki" className="hover:text-signal">Knowledge Hub</Link>
            <a href="https://www.amazon.com/dp/B0FMN5PDZ4" target="_blank" rel="noopener noreferrer" className="hover:text-signal text-signal font-bold">Amazon Listing</a>
          </nav>
        </div>
      </footer>

      {/* STICKY BOTTOM BUY BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-ash text-concrete p-4 border-t-4 border-signal shadow-2xl">
        <div className="max-w-5xl mx-auto flex justify-between items-center gap-4">
          <div>
            <span className="font-black text-xs md:text-sm uppercase block tracking-wider text-signal">Materialist Christianity by Ezra Byrd</span>
            <span className="text-[10px] md:text-xs font-mono opacity-60 uppercase hidden sm:block">Paperback ($19.99) & Kindle ($9.99) on Amazon</span>
          </div>
          <a
            href="https://www.amazon.com/dp/B0FMN5PDZ4"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-terminal !py-3 !px-6 !text-xs font-black uppercase tracking-widest bg-signal text-white whitespace-nowrap"
          >
            Buy on Amazon &rarr;
          </a>
        </div>
      </div>
    </main>
  );
}
