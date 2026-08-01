import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Chapter 1: What Is Real? | Materialist Christianity by Ezra Byrd',
  description: 'Read the full Chapter 1 and Preface of Materialist Christianity. A forensic audit of survival, labor, and moral reality.',
  openGraph: {
    title: 'Read Chapter 1: What Is Real? | Materialist Christianity',
    description: 'Read the full Preface and Chapter 1 of Materialist Christianity by Ezra Byrd.',
    type: 'article',
    url: 'https://materialistchristianity.org/read-chapter-1',
  },
};

export default function SampleChapterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BookChapter',
    'name': 'Chapter 1: What Is Real?',
    'isPartOf': {
      '@type': 'Book',
      'name': 'Materialist Christianity',
      'author': {
        '@type': 'Person',
        'name': 'Ezra Byrd'
      },
      'url': 'https://www.amazon.com/dp/B0FMN5PDZ4'
    },
    'position': '1',
    'description': 'A forensic audit of reality as motion and consequential force.'
  };

  return (
    <div className="bg-concrete text-ash min-h-screen pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 bg-concrete/95 backdrop-blur border-b-4 border-ash p-4 md:px-12">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-black text-lg md:text-xl uppercase tracking-tighter hover:text-signal">
            &larr; Materialist Christianity
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/wiki" className="hidden sm:inline-block font-mono text-xs uppercase tracking-widest hover:text-signal opacity-70">
              Knowledge Hub
            </Link>
            <a
              href="https://www.amazon.com/dp/B0FMN5PDZ4"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-terminal !py-2 !px-4 !text-xs font-black uppercase tracking-widest bg-signal text-white"
            >
              Examine Full Book on Amazon &rarr;
            </a>
          </div>
        </div>
      </header>

      {/* HERO HERO TITLE */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 border-b-4 border-ash/20">
        <div className="text-xs font-mono uppercase tracking-[0.25em] text-signal font-black mb-4">
          FREE SAMPLE EXCERPT // PREFACE & CHAPTER 1
        </div>
        <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase mb-6 leading-tight">
          What Is Real?
        </h1>
        <p className="text-lg md:text-2xl font-mono uppercase opacity-70 leading-relaxed mb-8">
          By Ezra Byrd — Electrician, Foreman & Author
        </p>

        <div className="bg-ash text-concrete p-6 md:p-8 border-l-[12px] border-signal font-mono text-sm md:text-base leading-relaxed">
          <p className="font-bold mb-2 uppercase text-signal">Author's Note:</p>
          "Materialist Christianity was not born in a classroom. It was discovered in motion, through labor, love, rupture, and the long effort to make sense of a world in contradiction. I am an atheist exploring. This book is a forensic record of what survived collapse."
        </div>
      </section>

      {/* READER CONTENT */}
      <main className="max-w-3xl mx-auto px-6 py-16 space-y-12 text-lg md:text-xl leading-relaxed font-sans">
        {/* PREFACE */}
        <article className="space-y-8 border-b-4 border-ash/20 pb-16">
          <h2 className="text-3xl md:text-4xl font-black uppercase italic border-b-2 border-ash/20 pb-4 text-signal">
            Preface
          </h2>
          
          <p>
            I didn’t write this book because I found religion. I wrote it because I ran out of places to stand. I had lived a good life—at least, I thought I had. I worked hard, I stayed loyal, I built love with my own hands. I sacrificed. I carried people. I kept going. But eventually, the structure I had trusted to make all that meaningful collapsed. Not because I was weak. Not because I did anything wrong. But because what I was trying to live had no real place in the world as it stands. That was the beginning of the search—not for God, not for faith, but for something that could survive collapse and still be called good.
          </p>

          <p>
            This is not a story of belief. It’s not a conversion or an argument. It’s a forensic analysis of survival. Of meaning. Of why some moral structures rot and others repeat. Of why Christianity, in spite of everything, keeps showing up—not just as a religion, but as a form. A pattern. A shape left behind by motion. I didn’t “become” a Christian. I realized that Christianity had already happened to me. Not in my mind. Not in my identity. In the structure of my life, the labor I gave, the betrayals I survived, and the refusal to abandon goodness even when it cost me everything.
          </p>

          <p>
            That’s the thread this book follows. Not a revelation. Not a theology. A motion. And what it leads toward is a truth I never expected to find: that the moral arc I tried to build from scratch had already been walked, already been written—not as commandment, but as consequence. Not as myth, but as structure. Not as God speaking down, but as history speaking forward. And once I saw that, I couldn’t unsee it. I didn’t need to “believe.” I only needed to keep walking.
          </p>

          <p>
            I was born in North Carolina, and I came up in a house that did the best it could with what it had. We weren't starving financially, but we weren't okay in any other way. What I remember most is the confusion. Adults talking around me like I couldn’t hear. Systems reacting to me like a problem to be solved. I wasn’t rebellious. I was curious. I asked why, again and again. And what I learned early, before I could name it, was that the world doesn’t reward honesty. It rewards obedience. Even the people who loved me were shaped by that. They lied to protect things. They punished questions to avoid shame. In church, in school, and at home, they called it love, but it didn’t move like love.
          </p>

          <p>
            By the time I was a teenager, I’d already rejected religion. Not because I wanted to sin or rebel; I just couldn’t stomach the hypocrisy. The way people talked about grace but lived by fear. The way churches seemed more interested in appearances than in truth. If a system says it’s holy but rewards cruelty and control, then it isn’t holy. It’s just power. And I hated power that pretended it wasn’t power. So I left it all behind. I read Dawkins. I argued online. I tried to burn down every lie I’d ever been told.
          </p>

          <p>
            But I didn’t want to float in the void. I wanted structure. I wanted to live right. I worked. I gave. I loved hard. I thought: if there’s no God, then it’s up to us. We make meaning. So I tried. I built a life around labor and loyalty, and I believed in that with everything I had. That’s how I loved people—not with words, but with my back, my time, my will. I didn’t need salvation. I just needed the people I cared about to be safe, and for my work to matter.
          </p>

          <blockquote className="my-8 border-l-[12px] border-signal pl-6 italic text-xl md:text-2xl font-serif text-ash">
            "I didn’t go looking for God. I went looking for something that could survive collapse and still call itself good."
          </blockquote>

          <p>
            And for a while, it looked like it was working. I thought I’d found it—the structure that could last. But then, slowly, it broke. Not all at once, but piece by piece. People changed. Systems changed. I gave everything and got silence. I stayed, and others walked. I told the truth and was punished for it. I watched the house I built for love collapse with me still inside it. That’s when I knew. The problem wasn’t just bad luck. The problem was that I had trusted a system that couldn’t hold. I had built on sand and thought it was stone.
          </p>

          <p>
            I started reading the Bible again—not as revelation, but as record. Not to believe it, but to track its consequences. I approached it like I would any other historical object. Cold. Skeptical. But something happened. Not metaphysical. Not emotional. Structural. I started seeing patterns I already knew. Labor that wasn’t paid. Love that wasn’t returned. Truth spoken into silence. Sacrifice that wasn’t rewarded. I saw people choosing good anyway. Not because it worked, but because it was right. Because it was the only thing that could be done.
          </p>
        </article>

        {/* CHAPTER 1 */}
        <article className="space-y-8 pt-8">
          <h2 className="text-3xl md:text-5xl font-black uppercase italic border-b-2 border-ash/20 pb-4 text-signal">
            Chapter 1: What Is Real?
          </h2>

          <p className="font-bold text-xl md:text-2xl text-ash/90">
            Not everything that shapes your life can be held in your hand.
          </p>

          <p>
            A stop sign doesn’t force a car to stop. A paycheck doesn’t feed a family by itself. A marriage, a law, a promise—these aren’t physical objects. They’re patterns. Agreements. Structures. But they move people. And because they move, they matter.
          </p>

          <p>
            We live in a world full of invisible forces—some invented, some discovered—that still have real consequences. That’s the key. Reality isn't determined by what can be touched, but by what causes change. If it alters behavior, redirects labor, or reshapes relationships, then it's part of the world, whether or not it has mass or volume.
          </p>

          <p>
            Materialism doesn’t mean denying these things. It means explaining them. Understanding how ideas, values, and institutions emerge, gain force, decay, and get reborn. Not through magic, but through motion.
          </p>

          <div className="my-8 p-8 bg-ash text-concrete font-mono text-center space-y-3 font-bold uppercase tracking-widest text-lg md:text-xl border-l-8 border-signal">
            <p>What moves is real.</p>
            <p className="text-signal font-black">What doesn’t, isn’t.</p>
          </div>

          <p>
            This shift—seeing reality as motion, not as static things—changes everything.
          </p>

          <p>
            It means that laws aren’t real because they’re written on paper. They’re real because people believe them, fear them, follow them, or resist them. The words on the paper don’t matter unless they move someone.
          </p>

          <p>
            It means that money isn’t real because it’s backed by gold or fiat. It’s real because people act as if it matters. They work for it, trade for it, steal for it. The paper is nothing. The motion is everything.
          </p>

          <p>
            This is how we’ll define reality from now on:
          </p>

          <div className="my-8 p-6 bg-steel/10 border-l-[12px] border-signal font-mono text-base md:text-lg space-y-4">
            <p><strong>Not:</strong> “What exists” &mdash; <strong>But:</strong> “What exerts force.”</p>
            <p><strong>Not:</strong> “What’s made of atoms” &mdash; <strong>But:</strong> “What makes us act.”</p>
          </div>

          <p>
            If something only works because everyone agrees on it, it’s not fake. It’s relational. It’s a sub-object. Not an object like a chair. Not a subject like a person. But something in-between. A form of shared motion with no body of its own, but with consequences that cannot be ignored.
          </p>
        </article>

        {/* MID-TEXT AMAZON CALLOUT */}
        <section className="my-16 p-8 md:p-12 bg-ash text-concrete text-center border-t-8 border-signal">
          <h3 className="text-3xl md:text-4xl font-black uppercase mb-4 text-signal italic">
            Examine the Full Master Manuscript
          </h3>
          <p className="text-base md:text-lg font-mono uppercase opacity-80 max-w-2xl mx-auto mb-8">
            You have read the opening studs of the foundation. Secure your complete copy of Materialist Christianity on Amazon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/thank-you-amazon"
              className="cta-terminal bg-concrete text-ash font-black uppercase tracking-widest text-sm py-4 px-8 inline-block"
            >
              Paperback &mdash; $19.99 on Amazon &rarr;
            </Link>
            <Link
              href="/thank-you-amazon"
              className="cta-terminal bg-signal text-white font-black uppercase tracking-widest text-sm py-4 px-8 inline-block"
            >
              Kindle Edition &mdash; $9.99 on Amazon &rarr;
            </Link>
          </div>
        </section>
      </main>

      {/* STICKY FOOTER BUY BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-ash text-concrete p-4 border-t-4 border-signal shadow-2xl">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <span className="font-black text-sm uppercase block tracking-wider text-signal">Materialist Christianity by Ezra Byrd</span>
            <span className="text-xs font-mono opacity-60 uppercase">Available now in Paperback ($19.99) & Kindle ($9.99)</span>
          </div>
          <Link
            href="/thank-you-amazon"
            className="cta-terminal !py-3 !px-6 !text-xs font-black uppercase tracking-widest bg-signal text-white whitespace-nowrap inline-block"
          >
            Buy Book on Amazon &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
