const fs = require('fs');
const path = require('path');

const nodes = [
  // The Axioms
  { slug: 'reality_as_motion', title: 'Reality as Motion', category: 'The Axioms', desc: 'Existence is defined by consequence and change, not by static form.' },
  { slug: 'the_industrial_real', title: 'The Industrial Real', category: 'The Axioms', desc: 'What is real is what exerts force and makes us act, even in isolation.' },
  { slug: 'behavioral_gravity', title: 'Behavioral Gravity', category: 'The Axioms', desc: 'The predictable pull that belief systems exert on human behavior.' },
  { slug: 'motion_in_isolation', title: 'Motion in Isolation', category: 'The Axioms', desc: 'Behavior that persists without observation is the proof of a structure\'s reality.' },
  { slug: 'the_third_category', title: 'The Third Category', category: 'The Axioms', desc: 'The space between Objects (mass) and Subjects (minds) where social reality lives.' },
  { slug: 'consequence_as_truth', title: 'Consequence as Truth', category: 'The Axioms', desc: 'Truth is not what is said, but the track left by a motion over time.' },
  { slug: 'forensic_analysis_survival', title: 'Forensic Analysis', category: 'The Axioms', desc: 'The method of analyzing human belief systems only as they manifest in survival behaviors.' },
  { slug: 'materialism_behavioral_science', title: 'Materialist Christianity', category: 'The Axioms', desc: 'Christianity treated as a material behavioral science rather than a metaphysical theory.' },

  // Mechanics
  { slug: 'sub_objects', title: 'Sub-Objects', category: 'Mechanics', desc: 'Relational, durable structures that organize human behavior (laws, money, rituals).' },
  { slug: 'sub_object_resonance', title: 'Sub-Object Resonance', category: 'Mechanics', desc: 'The field of pressure and expectation that surrounds a shared social structure.' },
  { slug: 'the_haunted_object', title: 'The Haunted Object', category: 'Mechanics', desc: 'An object that carries the instructions of the dead via repeated behavioral patterns.' },
  { slug: 'entropy_and_synthesis', title: 'Entropy and Synthesis', category: 'Mechanics', desc: 'The breakdown of old structures (entropy) and their recombination into new forms (synthesis).' },
  { slug: 'gmorknicity', title: 'Gmorknicity', category: 'Mechanics', desc: 'The parasitic capture and reversal of a symbol\'s moral motion.' },
  { slug: 'the_commodity_form', title: 'The Commodity Form', category: 'Mechanics', desc: 'Objects whose value arises from their place in a social process rather than their use.' },
  { slug: 'constructed_resonance', title: 'Constructed Resonance', category: 'Mechanics', desc: 'Resonance crafted by branding and logos; dependent on constant belief reinforcement.' },
  { slug: 'reinforced_resonance', title: 'Reinforced Resonance', category: 'Mechanics', desc: 'Resonance maintained by institutional repetition and enforced participation.' },
  { slug: 'emergent_resonance', title: 'Emergent Resonance', category: 'Mechanics', desc: 'Resonance that arises naturally from universal human experiences (grief, hunger).' },
  { slug: 'antagonistic_resonance', title: 'Antagonistic Resonance', category: 'Mechanics', desc: 'Resonance born in rupture and contradiction; survives through conflict and survival.' },
  { slug: 'subject_dependent_resonance', title: 'Subject-Dependent Resonance', category: 'Mechanics', desc: 'Resonance that collapses if the observer stops believing in its narrative.' },
  { slug: 'subject_independent_resonance', title: 'Subject-Independent Resonance', category: 'Mechanics', desc: 'Resonance that reappears whenever the material conditions of its origin return.' },

  // Praxis
  { slug: 'moral_labor', title: 'Moral Labor', category: 'Praxis', desc: 'The expenditure of life-time to test, repair, and maintain moral structures.' },
  { slug: 'maintenance_vs_preservation', title: 'Maintenance vs. Preservation', category: 'Praxis', desc: 'Holding a structure\'s function (maintenance) versus merely holding its form (preservation).' },
  { slug: 'rupture', title: 'Rupture', category: 'Praxis', desc: 'The necessary breaking of fossilized structures to restore living motion.' },
  { slug: 'dignity_structural', title: 'Dignity (Structural)', category: 'Praxis', desc: 'A condition earned when survival is carried with consequence and trust.' },
  { slug: 'faith_as_residue', title: 'Faith as Residue', category: 'Praxis', desc: 'What remains of motion after collapse; labor that refuses to stop when reward vanishes.' },
  { slug: 'conscious_responsibility', title: 'Conscious Responsibility', category: 'Praxis', desc: 'The refusal to follow inherited structures without testing their consequence.' },
  { slug: 'premature_structure', title: 'Premature Structure', category: 'Praxis', desc: 'The danger of formalizing a movement before its core motion has been tested.' },
  { slug: 'local_vs_public_trust', title: 'Local vs. Public Trust', category: 'Praxis', desc: 'The difference between trust earned in direct labor and trust performed for a collective image.' },

  // The Theological Form
  { slug: 'the_bible_as_sediment', title: 'The Bible as Sediment', category: 'The Theological Form', desc: 'A record of moral pressure and survival organized over centuries of rupture.' },
  { slug: 'canon_as_pressure', title: 'Canon as Pressure', category: 'The Theological Form', desc: 'The assembly of texts prioritized not for clarity, but for their ability to hold under contradiction.' },
  { slug: 'christianity_dominant_form', title: 'Christianity as Dominant Form', category: 'The Theological Form', desc: 'A structure built to absorb its own collapse and return through resurrection.' },
  { slug: 'resurrection_structural', title: 'Resurrection (Structural)', category: 'The Theological Form', desc: 'The reactivation of a dead structure\'s motion through a new act of need or care.' },
  { slug: 'apostolic_motion', title: 'Apostolic Motion', category: 'The Theological Form', desc: 'The transmission of trust and labor across generations without central authority.' },
  { slug: 'the_brush_arbor', title: 'The Brush Arbor', category: 'The Theological Form', desc: 'The survival of authentic Christianity in the fields of the oppressed, away from empire.' },
  { slug: 'ritualized_coherence', title: 'Ritualized Coherence', category: 'The Theological Form', desc: 'The use of habit and repetition to stabilize a community across generational memory loss.' },
  { slug: 'structural_succession', title: 'Structural Succession', category: 'The Theological Form', desc: 'The methodology of handing off a living motion to the next generation without hollowing it.' },

  // The Materialist Critique
  { slug: 'capital_as_vampire', title: 'Capital as Vampire', category: 'The Materialist Critique', desc: 'A structure that siphons living labor and trust without returning motion.' },
  { slug: 'liberalism_as_wardrobe', title: 'Liberalism as Wardrobe', category: 'The Materialist Critique', desc: 'A system of euphemisms that dresses exploitation in the language of freedom.' },
  { slug: 'corrupted_memory', title: 'Corrupted Memory', category: 'The Materialist Critique', desc: 'Remembering a symbol without honoring the labor or consequence it once represented.' },
  { slug: 'the_hollow_ritual', title: 'The Hollowed Ritual', category: 'The Materialist Critique', desc: 'A ceremony that continues to move bodies but no longer coordinates trust or survival.' },

  // The Future
  { slug: 'moral_communism', title: 'Moral Communism', category: 'The Future', desc: 'The collective management and distribution of moral capital without extraction.' },
  { slug: 'sub_objectual_dialectic', title: 'Sub-Objectual Dialectic', category: 'The Future', desc: 'The process of structures failing, inverting, and being synthesized into new forms.' },
  { slug: 'non_extractive_labor', title: 'Non-Extractive Labor', category: 'The Future', desc: 'Labor that returns its consequence directly to the participants rather than a central vault.' }
];

const outputDir = path.join(process.cwd(), 'content/wiki');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

nodes.forEach(node => {
  const content = `---
title: "${node.title}"
description: "${node.desc}"
category: "${node.category}"
tags: ["core"]
related: []
---

[OPERATIONAL STANDBY: CONTENT PENDING FORENSIC INGESTION]
`;
  fs.writeFileSync(path.join(outputDir, `${node.slug}.md`), content);
  console.log(`Generated: ${node.slug}.md`);
});
