'use client';

import { useState } from 'react';
import Link from 'next/link';

interface AuditResult {
  title: string;
  frictionScore: number;
  diagnosis: string;
  solution: string;
  wikiSlug: string;
  wikiCategory: string;
  wikiTitle: string;
  chapterRecommendation: string;
}

const AUDIT_DATA: Record<string, Record<string, AuditResult>> = {
  deconstruction: {
    multistory: {
      title: 'Hypocritical System Fracture & Performance Strain',
      frictionScore: 84,
      diagnosis: 'You are attempting to maintain loyalty to an institutional structure that demands mental assent while rewarding behavior that violates physical reality. This split creates continuous internal voltage leakage.',
      solution: 'Cease defending broken institutional claims. Stand on observable material consequence. Goodness does not depend on institutional approval; it depends on physical continuity.',
      wikiSlug: 'reconstruction-after-collapse',
      wikiCategory: '05-life-mechanics',
      wikiTitle: 'Reconstruction After Collapse',
      chapterRecommendation: 'Chapter 7: The Bible as Moral Capital & Chapter 8: Christianity as Dominant Moral Form'
    },
    unspoken: {
      title: 'Structural Guilt & Trajectory Drift',
      frictionScore: 76,
      diagnosis: 'You have been taught to view errors (hamartia) as permanent stains on your soul requiring medieval shame. This keeps your focus trapped in past failure rather than physical course correction.',
      solution: 'Treat hamartia as a simple ballistic misalignment. Adjust your vector, apply grace as error-correction lubricant, and return to productive labor.',
      wikiSlug: 'thermodynamics-of-sin',
      wikiCategory: '02-thermodynamics',
      wikiTitle: 'The Thermodynamics of Sin',
      chapterRecommendation: 'Chapter 1: What Is Real? & Chapter 4: Morality as Labor Value'
    },
    exploitation: {
      title: 'Moral Extraction & Unreturned Energy',
      frictionScore: 89,
      diagnosis: 'You have poured labor, loyalty, and care into a religious or social structure that extracted your energy without returning motion. The structure burned you out.',
      solution: 'Recognize profit and extraction in their physical form. Stop feeding unreturned energy into parasitic systems. Reinvest your labor into small-scale, high-trust community loops.',
      wikiSlug: 'labor-vs-profit',
      wikiCategory: '03-labor-and-torque',
      wikiTitle: 'Labor vs. Profit: Production and Extraction',
      chapterRecommendation: 'Chapter 4: Morality as Labor Value & Chapter 9: Capital and Trust'
    },
    isolated: {
      title: 'Social Atomization After Faith Rupture',
      frictionScore: 81,
      diagnosis: 'In walking away from hypocritical dogma, you lost the physical gathering, shared rhythms, and mutual aid of community. You are floating in the void.',
      solution: 'Re-enter physical community without accepting magical dogma. Join a union, build a 15-man shop culture, or participate in local shared rhythms where people look out for one another.',
      wikiSlug: 'trust-as-commodity',
      wikiCategory: '03-labor-and-torque',
      wikiTitle: 'Trust as Infrastructure',
      chapterRecommendation: 'Chapter 5: Trust as Universal Commodity Form'
    }
  },
  anxiety: {
    multistory: {
      title: 'Maximum Thermodynamic Narrative Heat',
      frictionScore: 92,
      diagnosis: 'You are managing multiple conflicting stories for different people (work, family, self). Your brain is spending 60%+ of its daily energy monitoring leaks and defending performance.',
      solution: 'Enforce the Single Narrative Protocol (N_narratives = 1). Collapse your life into one transparent, plumb reality. The internal heat drops to zero instantly.',
      wikiSlug: 'eliminating-anxiety',
      wikiCategory: '05-life-mechanics',
      wikiTitle: 'The Physics of Eliminating Anxiety',
      chapterRecommendation: 'Chapter 2: Motion Is Real, Not Things & Epilogue: Still Walking'
    },
    unspoken: {
      title: 'Cognitive Voltage Leakage',
      frictionScore: 82,
      diagnosis: 'You are carrying unspoken financial, relational, or personal debt. You are attempting to borrow energy from tomorrow to cover today\'s friction.',
      solution: 'Stop borrowing voltage. Lay down the debt, state the facts plainly, and accept physical boundary conditions.',
      wikiSlug: 'truth-as-continuity',
      wikiCategory: '01-axioms',
      wikiTitle: 'Truth as Continuity',
      chapterRecommendation: 'Chapter 3: Object, Subject, Sub-Object'
    },
    exploitation: {
      title: 'Over-Burdened System Fatigue',
      frictionScore: 88,
      diagnosis: 'You are carrying heavy loads for people or systems that offer zero return motion. Your system is vibrating near structural failure.',
      solution: 'Establish physical boundary conditions. Say no to extractive demands and protect your capacity for real, necessary labor.',
      wikiSlug: 'physical-boundary-condition',
      wikiCategory: '01-axioms',
      wikiTitle: 'The Physical Boundary Condition',
      chapterRecommendation: 'Chapter 4: Morality as Labor Value'
    },
    isolated: {
      title: 'Unanchored Vibration in Isolation',
      frictionScore: 79,
      diagnosis: 'A body operating in total isolation begins to collapse inward. Without shared physical labor and feedback, anxiety amplifies.',
      solution: 'Ground yourself in daily physical work. Work with your hands, sweep the floor, wire the circuit, and reconnect with real people.',
      wikiSlug: 'matter-precedes-hierarchy',
      wikiCategory: '01-axioms',
      wikiTitle: 'Matter Precedes Hierarchy',
      chapterRecommendation: 'Chapter 1: What Is Real?'
    }
  },
  labor: {
    multistory: {
      title: 'Corporate Performance & Bureaucratic Friction',
      frictionScore: 85,
      diagnosis: 'Your workplace rewards slick talk, middle-management optics, and posturing over real, necessary labor.',
      solution: 'Ground your dignity in the physical work you perform, not in executive approval. Build solidarity with the crew on the shop floor.',
      wikiSlug: 'labor-vs-profit',
      wikiCategory: '03-labor-and-torque',
      wikiTitle: 'Labor vs. Profit: Production and Extraction',
      chapterRecommendation: 'Chapter 4: Morality as Labor Value & Chapter 5: Trust'
    },
    unspoken: {
      title: 'Low-Trust Workplace Corrosion',
      frictionScore: 87,
      diagnosis: 'Your shop or company suffers from lack of transparency, hidden mistakes, and defensive finger-pointing.',
      solution: 'Build predictable behavioral standards. Admit errors immediately, tag out faulty equipment, and establish high-trust capital through action.',
      wikiSlug: 'trust-as-commodity',
      wikiCategory: '03-labor-and-torque',
      wikiTitle: 'Trust as Infrastructure',
      chapterRecommendation: 'Chapter 5: Trust as Universal Commodity Form'
    },
    exploitation: {
      title: 'Vampiric Profit Extraction',
      frictionScore: 94,
      diagnosis: 'Your labor is generating immense value, but absentee owners or corporate executives siphon away the motion, leaving the crew burned out and tools broken.',
      solution: 'Understand profit as physical energy drain. Organize with your union, demand fair return motion, and protect your crew.',
      wikiSlug: 'labor-vs-profit',
      wikiCategory: '03-labor-and-torque',
      wikiTitle: 'Labor vs. Profit',
      chapterRecommendation: 'Chapter 9: Capital and Trust: Parallel Histories'
    },
    isolated: {
      title: 'Isolated Craftsman Strain',
      frictionScore: 77,
      diagnosis: 'Working alone without a crew or union backstop leaves you vulnerable to client manipulation and market volatility.',
      solution: 'Join a trade network or union hall. Establish shared standards and non-extractive mutual aid.',
      wikiSlug: 'trust-as-commodity',
      wikiCategory: '03-labor-and-torque',
      wikiTitle: 'Trust as Infrastructure',
      chapterRecommendation: 'Chapter 5: Trust as Universal Commodity Form'
    }
  },
  secular: {
    multistory: {
      title: 'Secular Intellectual Drift',
      frictionScore: 73,
      diagnosis: 'You rejected religious magic years ago, but debate, rationalism, and consumerism have left you feeling disconnected from moral depth.',
      solution: 'Realize that moral laws are not magical decrees, but empirical survival technologies carved by 2,000 years of working-class history.',
      wikiSlug: 'physical-boundary-condition',
      wikiCategory: '01-axioms',
      wikiTitle: 'The Physical Boundary Condition',
      chapterRecommendation: 'Chapter 7: The Bible as Moral Capital'
    },
    unspoken: {
      title: 'Atheist Cynicism Trap',
      frictionScore: 78,
      diagnosis: 'You fell into secular nihilism—deciding that because there is no magic sky daddy, nothing has value or ultimate meaning.',
      solution: 'Meaning is not an abstract theory; it is the physical byproduct of labor energy expended for the social good.',
      wikiSlug: 'reconstruction-after-collapse',
      wikiCategory: '05-life-mechanics',
      wikiTitle: 'Reconstruction After Collapse',
      chapterRecommendation: 'Chapter 10: The Sub-Objectual Dialectic'
    },
    exploitation: {
      title: 'Commodified Existence Strain',
      frictionScore: 86,
      diagnosis: 'Late-capitalist culture has turned your time, relationships, and attention into commodities to be bought and sold.',
      solution: 'Reclaim non-extractive spaces. Participate in shared rhythms (like Sunday gathering or union meetings) where nothing is being sold.',
      wikiSlug: 'truth-as-continuity',
      wikiCategory: '01-axioms',
      wikiTitle: 'Truth as Continuity',
      chapterRecommendation: 'Chapter 11: Toward a Moral Communism'
    },
    isolated: {
      title: 'Nihilistic Atomization',
      frictionScore: 82,
      diagnosis: 'Living as an isolated individual in a commodified world has drained your motivation and focus.',
      solution: 'Engage in predictable physical labor and covenant loyalty. Walk the path of continuity.',
      wikiSlug: 'matter-precedes-hierarchy',
      wikiCategory: '01-axioms',
      wikiTitle: 'Matter Precedes Hierarchy',
      chapterRecommendation: 'Chapter 1: What Is Real? & Epilogue'
    }
  }
};

export default function StructuralAuditTool() {
  const [strain, setStrain] = useState<string>('deconstruction');
  const [vector, setVector] = useState<string>('multistory');
  const [calculated, setCalculated] = useState<boolean>(false);

  const currentResult = AUDIT_DATA[strain]?.[vector] || AUDIT_DATA.deconstruction.multistory;

  return (
    <div className="bg-ash text-concrete p-6 md:p-12 border-8 border-concrete shadow-2xl max-w-4xl mx-auto">
      <div className="border-b-4 border-concrete pb-4 mb-8">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-signal font-black block mb-1">
          INTERACTIVE AUDIT ENGINE // MECHANICAL DIAGNOSIS
        </span>
        <h3 className="text-3xl md:text-5xl font-black uppercase italic leading-none">
          Run Your Structural Life Audit
        </h3>
        <p className="text-sm font-mono uppercase opacity-80 mt-2">
          Calculate your thermodynamic system friction and locate the exact physical solution.
        </p>
      </div>

      {/* INPUT STEPS */}
      <div className="space-y-8">
        {/* STEP 1 */}
        <div>
          <label className="block text-xs font-mono font-black uppercase tracking-widest text-signal mb-3">
            Step 1: Identify Your Primary Structural Strain
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => { setStrain('deconstruction'); setCalculated(false); }}
              className={`p-4 text-left border-4 font-mono text-xs uppercase font-bold transition-all ${
                strain === 'deconstruction' ? 'border-signal bg-concrete text-ash' : 'border-concrete bg-concrete/10 hover:border-signal'
              }`}
            >
              &gt; Deconstructing Faith / Church Hypocrisy
            </button>
            <button
              onClick={() => { setStrain('anxiety'); setCalculated(false); }}
              className={`p-4 text-left border-4 font-mono text-xs uppercase font-bold transition-all ${
                strain === 'anxiety' ? 'border-signal bg-concrete text-ash' : 'border-concrete bg-concrete/10 hover:border-signal'
              }`}
            >
              &gt; Chronic Anxiety & Overthinking
            </button>
            <button
              onClick={() => { setStrain('labor'); setCalculated(false); }}
              className={`p-4 text-left border-4 font-mono text-xs uppercase font-bold transition-all ${
                strain === 'labor' ? 'border-signal bg-concrete text-ash' : 'border-concrete bg-concrete/10 hover:border-signal'
              }`}
            >
              &gt; Workplace Exploitation & Burnout
            </button>
            <button
              onClick={() => { setStrain('secular'); setCalculated(false); }}
              className={`p-4 text-left border-4 font-mono text-xs uppercase font-bold transition-all ${
                strain === 'secular' ? 'border-signal bg-concrete text-ash' : 'border-concrete bg-concrete/10 hover:border-signal'
              }`}
            >
              &gt; Secular Nihilism / Loss of Meaning
            </button>
          </div>
        </div>

        {/* STEP 2 */}
        <div>
          <label className="block text-xs font-mono font-black uppercase tracking-widest text-signal mb-3">
            Step 2: Identify Your Current Behavioral Pattern
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => { setVector('multistory'); setCalculated(false); }}
              className={`p-4 text-left border-4 font-mono text-xs uppercase font-bold transition-all ${
                vector === 'multistory' ? 'border-signal bg-concrete text-ash' : 'border-concrete bg-concrete/10 hover:border-signal'
              }`}
            >
              &gt; Managing Multiple Conflicting Stories
            </button>
            <button
              onClick={() => { setVector('unspoken'); setCalculated(false); }}
              className={`p-4 text-left border-4 font-mono text-xs uppercase font-bold transition-all ${
                vector === 'unspoken' ? 'border-signal bg-concrete text-ash' : 'border-concrete bg-concrete/10 hover:border-signal'
              }`}
            >
              &gt; Carrying Unspoken Debt or Guilt
            </button>
            <button
              onClick={() => { setVector('exploitation'); setCalculated(false); }}
              className={`p-4 text-left border-4 font-mono text-xs uppercase font-bold transition-all ${
                vector === 'exploitation' ? 'border-signal bg-concrete text-ash' : 'border-concrete bg-concrete/10 hover:border-signal'
              }`}
            >
              &gt; Working Hard Without Return Motion
            </button>
            <button
              onClick={() => { setVector('isolated'); setCalculated(false); }}
              className={`p-4 text-left border-4 font-mono text-xs uppercase font-bold transition-all ${
                vector === 'isolated' ? 'border-signal bg-concrete text-ash' : 'border-concrete bg-concrete/10 hover:border-signal'
              }`}
            >
              &gt; Operating in Total Isolation
            </button>
          </div>
        </div>

        {/* CALCULATION ACTION */}
        {!calculated ? (
          <button
            onClick={() => setCalculated(true)}
            className="w-full cta-terminal bg-signal text-white font-black uppercase tracking-widest py-4 text-base"
          >
            Calculate System Friction & Diagnosis &rarr;
          </button>
        ) : (
          /* RESULT DISPLAY */
          <div className="bg-concrete text-ash p-6 md:p-8 border-l-[12px] border-signal space-y-6 mt-8 animate-fadeIn">
            <div className="flex justify-between items-start border-b border-ash/20 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-signal font-black block">AUDIT RESULT</span>
                <h4 className="text-2xl font-black uppercase italic">{currentResult.title}</h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase opacity-50 block">FRICTION INDEX</span>
                <span className="text-3xl font-black text-signal">{currentResult.frictionScore}%</span>
              </div>
            </div>

            <div>
              <h5 className="text-xs font-mono font-black uppercase text-signal mb-1">Mechanical Diagnosis:</h5>
              <p className="text-sm font-mono leading-relaxed opacity-90">{currentResult.diagnosis}</p>
            </div>

            <div>
              <h5 className="text-xs font-mono font-black uppercase text-signal mb-1">Physical Solution:</h5>
              <p className="text-sm font-mono leading-relaxed opacity-90">{currentResult.solution}</p>
            </div>

            <div className="pt-4 border-t border-ash/20 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div>
                <span className="text-[10px] font-mono uppercase opacity-50 block">RECOMMENDED WIKI NODE:</span>
                <Link
                  href={`/wiki/${currentResult.wikiCategory}/${currentResult.wikiSlug}`}
                  className="text-xs font-mono font-bold uppercase text-signal hover:underline"
                >
                  &gt; {currentResult.wikiTitle} &rarr;
                </Link>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase opacity-50 block">BOOK CHAPTER SOLUTION:</span>
                <span className="text-xs font-mono font-bold uppercase block">{currentResult.chapterRecommendation}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a
                href="https://www.amazon.com/dp/B0FMN5PDZ4"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-terminal bg-signal text-white font-black uppercase tracking-widest text-xs py-3 px-6 text-center flex-1"
              >
                Examine Book on Amazon ($19.99 / $9.99) &rarr;
              </a>
              <Link
                href="/read-chapter-1"
                className="cta-terminal bg-steel/40 text-ash border-ash font-black uppercase tracking-widest text-xs py-3 px-6 text-center flex-1"
              >
                Read Chapter 1 Free &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
