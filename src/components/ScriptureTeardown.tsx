'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ScriptureNode {
  ref: string;
  book: string;
  greekHebrew: string;
  traditional: string;
  materialist: string;
  teardown: string;
  axiomCategory: string;
  axiomSlug: string;
}

const SCRIPTURE_DATA: ScriptureNode[] = [
  {
    ref: 'Matthew 1:21',
    book: 'Gospel of Matthew',
    greekHebrew: 'αὐτὸς γὰρ σώσει τὸν λαὸν αὐτοῦ ἀπὸ τῶν ἁμαρτιῶν αὐτῶν',
    traditional: 'For he shall save his people from their sins.',
    materialist: 'For He will rescue his community from their systemic misalignments and self-destructive target failures.',
    teardown: 'Jesus is not presented as a courtroom attorney getting souls off divine legal charges. He is presented as a structural engineer restoring a community whose vector has drifted into physical failure.',
    axiomCategory: '04-verse-forensics',
    axiomSlug: 'exegesis-hamartia'
  },
  {
    ref: 'Hebrews 11:1',
    book: 'Epistle to the Hebrews',
    greekHebrew: 'ἔστιν δὲ πίστις ἐλπιζομένων ὑπόστασις, πραγμάτων ἔλεγχος οὐ βλεπομένων',
    traditional: 'Now faith is the substance of things hoped for, the evidence of things not seen.',
    materialist: 'Now pistis (loyalty) is the structural foundation (hypostasis - load-bearing footing) of things anticipated, the concrete demonstration (elenchos) of unmanifested real outcome.',
    teardown: 'Hypostasis is an ancient architectural term meaning the underlying footing carrying a stone wall. Faith is not a feeling in your head; it is the physical footing that holds weight before the building is finished.',
    axiomCategory: '04-verse-forensics',
    axiomSlug: 'exegesis-pistis'
  },
  {
    ref: 'Romans 6:23',
    book: 'Epistle to the Romans',
    greekHebrew: 'τὰ γὰρ ὀψώνια τῆς ἁμαρτίας θάνατος',
    traditional: 'For the wages of sin is death.',
    materialist: 'For the physical yield of unchecked friction and operational error is total mechanical seizure.',
    teardown: 'If an engine runs without oil, the pistons weld to the cylinder walls. Social systems die by the exact same physical law when deceit and extraction go uncorrected.',
    axiomCategory: '02-thermodynamics',
    axiomSlug: 'thermodynamics-of-sin'
  },
  {
    ref: 'Matthew 6:24',
    book: 'Gospel of Matthew',
    greekHebrew: 'Οὐ δύνασθε θεῷ δουλεύειν καὶ μαμωνᾷ',
    traditional: 'Ye cannot serve God and mammon.',
    materialist: 'You cannot simultaneously serve the Logos of Productive Labor and the Logic of Extractive Financial Accumulation.',
    teardown: 'Production and extraction are thermodynamically incompatible. Labor returns motion to the system; Mammon extracts value without returning motion.',
    axiomCategory: '03-labor-and-torque',
    axiomSlug: 'labor-vs-profit'
  },
  {
    ref: 'James 2:17',
    book: 'Epistle of James',
    greekHebrew: 'οὕτως καὶ ἡ πίστις, ἐὰν μὴ ἔχῃ ἔργα, νεκρά ἐστιν καθ\' ἑαυτήν',
    traditional: 'Even so faith, if it hath not works, is dead, being alone.',
    materialist: 'So also covenant loyalty, if it produces no physical labor (erga), is mechanically dead—a hollow declaration.',
    teardown: 'Words without labor are lorem ipsum. If your loyalty does not build local infrastructure, feed the hungry, or protect the crew, it has zero mass.',
    axiomCategory: '04-verse-forensics',
    axiomSlug: 'exegesis-pistis'
  },
  {
    ref: 'Mark 2:27',
    book: 'Gospel of Mark',
    greekHebrew: 'Τὸ σάββατον διὰ τὸν ἄνθρωπον ἐγένετο, οὐχ ὁ ἄνθρωπος διὰ τὸ σάββατον',
    traditional: 'The sabbath was made for man, and not man for the sabbath.',
    materialist: 'The structural rest cycle was engineered to preserve human labor hardware, not to force humans to serve an abstract institutional rule.',
    teardown: 'Matter precedes hierarchy. Human biological and social survival is primary; institutional rules are secondary tools.',
    axiomCategory: '01-axioms',
    axiomSlug: 'matter-precedes-hierarchy'
  }
];

export default function ScriptureTeardown() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const current = SCRIPTURE_DATA[selectedIdx];

  return (
    <div className="bg-concrete text-ash p-6 md:p-12 border-8 border-ash shadow-2xl max-w-5xl mx-auto">
      <div className="border-b-4 border-ash pb-4 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-signal font-black block mb-1">
            SCRIPTURAL FORENSICS // GREEK & HEBREW TEARDOWNS
          </span>
          <h3 className="text-3xl md:text-5xl font-black uppercase italic leading-none">
            Verse Mechanics Explorer
          </h3>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono uppercase opacity-50 block">6 Core Passages</span>
        </div>
      </div>

      {/* SELECTOR TABS */}
      <div className="flex flex-wrap gap-2 mb-8">
        {SCRIPTURE_DATA.map((item, idx) => (
          <button
            key={item.ref}
            onClick={() => setSelectedIdx(idx)}
            className={`px-4 py-3 font-mono text-xs uppercase font-bold border-2 transition-all ${
              selectedIdx === idx
                ? 'border-signal bg-signal text-white'
                : 'border-ash/30 bg-steel/10 text-ash hover:border-signal'
            }`}
          >
            {item.ref}
          </button>
        ))}
      </div>

      {/* VERSE DISPLAY */}
      <div className="space-y-8 bg-steel/10 p-6 md:p-10 border-l-[12px] border-signal">
        <div className="flex justify-between items-center border-b border-ash/20 pb-4">
          <h4 className="text-2xl md:text-4xl font-black uppercase italic text-signal">{current.ref}</h4>
          <span className="text-xs font-mono opacity-50 uppercase">{current.book}</span>
        </div>

        {/* GREEK / HEBREW */}
        <div>
          <span className="text-xs font-mono font-black uppercase text-signal block mb-1">Original Koine Text:</span>
          <p className="text-lg md:text-xl font-serif italic text-ash/90 bg-concrete/50 p-4 border border-ash/20">
            "{current.greekHebrew}"
          </p>
        </div>

        {/* COMPARISON GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-concrete p-5 border border-ash/20">
            <span className="text-xs font-mono font-black uppercase text-ash/50 block mb-2">Traditional Idealist Rendering:</span>
            <p className="text-sm font-mono opacity-70">"{current.traditional}"</p>
          </div>
          <div className="bg-concrete p-5 border-2 border-signal">
            <span className="text-xs font-mono font-black uppercase text-signal block mb-2">Materialist Mechanical Rendering:</span>
            <p className="text-sm font-mono font-bold text-ash">"{current.materialist}"</p>
          </div>
        </div>

        {/* TEARDOWN */}
        <div>
          <span className="text-xs font-mono font-black uppercase text-signal block mb-2">Forensic Mechanical Teardown:</span>
          <p className="text-base font-mono leading-relaxed opacity-90">{current.teardown}</p>
        </div>

        {/* ACTIONS */}
        <div className="pt-4 border-t border-ash/20 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <Link
            href={`/wiki/${current.axiomCategory}/${current.axiomSlug}`}
            className="text-xs font-mono font-bold uppercase text-signal hover:underline"
          >
            &gt; Read Full Exegesis Node ({current.axiomSlug}) &rarr;
          </Link>

          <div className="flex gap-3">
            <Link
              href="/thank-you-amazon?vol=1"
              className="cta-terminal bg-amber text-concrete font-black uppercase tracking-widest text-xs py-2.5 px-4 whitespace-nowrap"
            >
              Get Volume I &rarr;
            </Link>
            <Link
              href="/thank-you-amazon?vol=2"
              className="cta-terminal bg-signal text-white font-black uppercase tracking-widest text-xs py-2.5 px-4 whitespace-nowrap"
            >
              Get Volume II &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
