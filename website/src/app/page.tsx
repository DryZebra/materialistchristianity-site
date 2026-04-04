import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* High-Authority Header */}
      <header className="p-8 md:p-24 border-b-8 border-black">
        <h1 className="text-5xl md:text-9xl font-black tracking-tighter leading-none mb-4 uppercase">
          Materialist<br/>Christianity
        </h1>
        <p className="text-2xl md:text-4xl font-bold uppercase tracking-widest opacity-60">
          By Ezra Byrd
        </p>
      </header>

      {/* The Forensic Blurb (Sales) */}
      <section className="p-8 md:p-24 grid md:grid-cols-2 gap-16">
        <div className="space-y-8 text-xl md:text-2xl leading-relaxed">
          <p className="font-extrabold uppercase text-signal">A Forensic Analysis of Survival.</p>
          <p>
            Materialist Christianity is not a book of slogans, easy answers, or doctrinal shortcuts. It is a journey through the living motion of truth—the way it changes, survives, fails, and returns.
          </p>
          <p>
            This is not a work of theology in the traditional sense. It treats Christianity as something discovered rather than declared—a moral truth that emerged through centuries of human struggle.
          </p>
          <p className="bg-black text-white p-6 font-mono text-lg">
            "I didn\u2019t \u2018become\u2019 a Christian. I realized that Christianity had already happened to me."
          </p>
        </div>

        {/* The Material Terminal (Conversion) */}
        <div className="border-8 border-black p-12 bg-zinc-50 flex flex-col justify-center text-center">
          <h2 className="text-4xl font-black uppercase mb-8">Purchase the Record</h2>
          <div className="space-y-6">
            <a 
              href="https://www.amazon.com/dp/B0FMN5PDZ4" 
              className="btn-signal w-full text-center text-2xl py-6"
            >
              Paperback ($19.99)
            </a>
            <a 
              href="https://www.amazon.com/dp/B0FMN5PDZ4" 
              className="btn-signal bg-zinc-800 w-full text-center text-2xl py-6"
            >
              E-Book ($9.99)
            </a>
          </div>
          <p className="mt-8 text-sm uppercase font-bold opacity-40">
            Available Exclusively on Amazon
          </p>
        </div>
      </section>

      {/* Authority Proof */}
      <section className="p-8 md:p-24 bg-black text-white">
        <div className="max-w-4xl mx-auto space-y-12">
          <h3 className="text-3xl md:text-6xl font-black uppercase border-b-2 border-white pb-4">Inside the Manuscript</h3>
          <ul className="text-xl md:text-3xl font-bold space-y-6 opacity-80">
            <li>\u2014 A fresh way of reading the Bible through historical motion.</li>
            <li>\u2014 An exploration of \u201csub-objects\u201d\u2014invisible moral structures.</li>
            <li>\u2014 Honest confrontation with difficult passages without erasing history.</li>
            <li>\u2014 The argument that eternity is found in collective contribution.</li>
          </ul>
        </div>
      </section>

      {/* Discovery Hub (Wiki) */}
      <footer className="p-8 md:p-24 border-t border-black text-center">
        <p className="mb-8 opacity-60 font-bold uppercase tracking-tighter">
          Seeking structural evidence? Explore the research hub.
        </p>
        <Link href="/wiki" className="text-2xl font-black uppercase border-b-4 border-black hover:bg-black hover:text-white transition-all px-4 py-2">
          Enter the Knowledge Wiki &rarr;
        </Link>
      </footer>
    </main>
  );
}
