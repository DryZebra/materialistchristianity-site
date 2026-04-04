import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* 1. THE STRIKE (Above the Fold) */}
      <section className="h-screen flex flex-col justify-center items-center p-8 text-center bg-concrete border-b-8 border-ash relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none text-[20vw] font-black uppercase whitespace-nowrap overflow-hidden select-none">
          STRUCTURE MATTER MOTION
        </div>
        
        <header className="max-w-6xl z-10">
          <h1 className="text-6xl md:text-[10rem] mb-6 leading-none">
            Matter Precedes <br/> Hierarchy.
          </h1>
          <p className="text-xl md:text-3xl uppercase font-mono tracking-widest mb-12 opacity-80">
            A structural audit of faith, proving that morality is the mechanism for human survival.
          </p>
          <a 
            href="https://www.amazon.com/dp/B0FMN5PDZ4" 
            className="cta-terminal"
          >
            Examine the Text &rarr;
          </a>
        </header>

        <div className="absolute bottom-10 animate-bounce opacity-40">
          <span className="font-mono text-sm">SCROLL FOR STRUCTURAL PROOF &darr;</span>
        </div>
      </section>

      {/* 2. THE LOAD-BEARING WALL (Core Axioms) */}
      <section className="p-8 md:p-24 bg-ash text-concrete">
        <h2 className="text-4xl md:text-7xl mb-16 border-b-4 border-concrete pb-4 inline-block">The Foundation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="border-t-4 border-concrete pt-8">
            <h3 className="text-2xl mb-4">Matter Precedes Hierarchy</h3>
            <p className="text-lg leading-snug">
              Belief is secondary to behavior. The physical reality of labor, sacrifice, and survival is the only foundation that holds under pressure.
            </p>
          </div>
          <div className="border-t-4 border-concrete pt-8">
            <h3 className="text-2xl mb-4">Morality is Mechanical</h3>
            <p className="text-lg leading-snug">
              Morality is not a sentiment; it is a mechanism that prevents the human machine from tearing itself apart. It is proven by consequence, not by dogma.
            </p>
          </div>
          <div className="border-t-4 border-concrete pt-8">
            <h3 className="text-2xl mb-4">The Posture of the Cross</h3>
            <p className="text-lg leading-snug">
              Truth is not a declaration but a motion. It is the shape of a life that breaks but doesn't deform. It is recognizeable because it is repeatable.
            </p>
          </div>
        </div>
      </section>

      {/* 3. THE CORE SAMPLE (Lead Magnet) */}
      <section className="p-8 md:p-24 bg-concrete text-ash border-y-4 border-ash">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl mb-8">Inspect the Foundation</h2>
          <p className="text-xl mb-12 opacity-80 uppercase font-mono">
            Before you buy the house, examine the studs. Request Chapter 1: "What Is Real?"
          </p>
          <div className="flex justify-center">
            <a 
              href="mailto:MaterialistChristianityPress@gmail.com?subject=REQUEST: CHAPTER 1 BLUEPRINT" 
              className="cta-terminal"
            >
              Secure the Blueprint &rarr;
            </a>
          </div>
          <p className="mt-8 text-xs font-mono opacity-50 uppercase">No marketing fluff. Only structural data.</p>
        </div>
      </section>

      {/* 4. THE STRUCTURAL PROOF (Excerpts) */}
      <section className="p-8 md:p-24 bg-ash text-concrete border-b-4 border-ash relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/images/subtle_paper_texture.png')]"></div>
        <h2 className="text-4xl md:text-7xl mb-16 text-center">Proof of Torque</h2>
        <div className="max-w-5xl mx-auto space-y-24">
          <blockquote className="text-3xl md:text-5xl border-l-[12px] border-signal pl-8 italic leading-tight">
            "I didn’t go looking for God. I went looking for something that could survive collapse and still call itself good."
          </blockquote>
          <blockquote className="text-3xl md:text-5xl border-l-[12px] border-signal pl-8 italic leading-tight ml-auto md:w-3/4">
            "Reality isn't determined by what can be touched, but by what causes change. If it alters behavior, it's real."
          </blockquote>
          <blockquote className="text-3xl md:text-5xl border-l-[12px] border-signal pl-8 italic leading-tight">
            "Christianity had already happened to me. Not in my mind... but in the structure of my life and the labor I gave."
          </blockquote>
        </div>
      </section>

      {/* 5. THE SPLICE (Final Conversion) */}
      <section className="p-8 md:p-24 bg-ash text-concrete text-center border-t-8 border-concrete">
        <div className="max-w-4xl mx-auto">
          <div className="md:w-1/2 flex justify-center mx-auto mb-16">
            <div className="relative group">
              <div className="absolute -inset-1 bg-signal rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <img 
                src="/images/book-cover.png" 
                alt="Materialist Christianity Book Cover" 
                className="relative rounded-lg shadow-2xl w-full max-w-sm border-4 border-ash"
              />
            </div>
          </div>
          <h2 className="text-4xl md:text-7xl mb-6">Examine the Full Text</h2>
          <p className="text-xl mb-12 opacity-80 uppercase font-mono max-w-2xl mx-auto">
            The mechanical audit of faith is complete. Secure your copy of the manuscript in your preferred format.
          </p>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <a href="https://www.amazon.com/dp/B0FMN5PDZ4" className="cta-terminal bg-concrete text-ash flex-1">
              Paperback &mdash; $19.99
            </a>
            <a href="https://www.amazon.com/dp/B0FMN5PDZ4" className="cta-terminal flex-1">
              Kindle &mdash; $9.99
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER & WIKI LINK */}
      <footer className="p-12 bg-concrete text-ash text-center border-t-4 border-ash">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-left">
            <h4 className="font-black text-xl mb-2">MATERIALIST CHRISTIANITY</h4>
            <p className="text-sm opacity-50 uppercase font-mono">&copy; {new Date().getFullYear()} EZRA BYRD. ALL RIGHTS RESERVED.</p>
          </div>
          <nav className="flex gap-8 font-mono text-sm uppercase">
            <Link href="/wiki" className="hover:text-signal transition-colors underline underline-offset-8">Explore the Knowledge Hub (Wiki) &rarr;</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
