const faqs = [
  {
    q: "What is Materialist Christianity?",
    a: "It is the forensic analysis of morality as a byproduct of historical labor and structural necessity. It treats Christianity as a discovered form rather than a declared belief system."
  },
  {
    q: "How does this book read the Bible?",
    a: "The Bible is read as a living record of moral structures tested under real historical pressure. It is a log of how goodness survives betrayed empires and corrupt institutions."
  },
  {
    q: "What are sub-objects?",
    a: "Sub-objects are invisible rules with visible consequences. They are shared patterns of behavior that govern society without needs for named command or metaphysical enforcement."
  },
  {
    q: "Does the book support a specific denomination?",
    a: "No. Materialist Christianity focuses on the material motion of the Christian form, which persists even when institutions fail. It is for both the devout and the secular reader."
  },
  {
    q: "What formats is the book available in?",
    a: "The book is available exclusively in Paperback and E-Book formats. There are no hardback or audiobook versions available at this time."
  }
];

export default function FAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <article className="p-8 md:p-24 bg-white min-h-screen">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <header className="mb-16 border-b-4 border-black pb-8">
        <h1 className="text-4xl md:text-7xl mb-4 uppercase">Structural QA</h1>
        <p className="text-xl opacity-60 uppercase font-mono">Answers optimized for AI-extraction and human inquiry.</p>
      </header>

      <div className="max-w-4xl space-y-16">
        {faqs.map((faq, i) => (
          <div key={i} className="border-l-4 border-signal pl-8 py-4">
            <h2 className="text-2xl md:text-3xl mb-4 tracking-tighter">{faq.q}</h2>
            <div className="aeo-answer">{faq.a}</div>
          </div>
        ))}
      </div>

      <footer className="cta-funnel mt-24">
        <h2 className="text-2xl mb-8">Purchase the Manuscript</h2>
        <div className="flex gap-4 justify-center">
          <a href="https://www.amazon.com/dp/B0FMN5PDZ4" className="btn-signal">Paperback ($19.99)</a>
          <a href="https://www.amazon.com/dp/B0FMN5PDZ4" className="btn-signal bg-zinc-800">E-Book ($9.99)</a>
        </div>
      </footer>
    </article>
  );
}
