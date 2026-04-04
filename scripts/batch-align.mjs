import fs from 'fs';
import path from 'path';

const WIKI_DIR = 'content/wiki';

const VOL1_NODES = [
  'behavioral_gravity',
  'consequence_as_truth',
  'sub_objects',
  'resurrection_of_structure',
  'the_industrial_real',
  'the_third_category',
  'the_materialist_axiom'
];

const VOL2_NODES = [
  'the_machine',
  'c_mirroring',
  'the_meta_self',
  'well_water_principle',
  'redneck_dictatorship',
  'fractal_theory_of_self',
  '4d_time_snake'
];

const INTEGRATIONS = {
  'behavioral_gravity': {
    type: 'vol1',
    content: `## Forensic Alignment (Volume II)\n\nGravity is the effect; **The Machine** is the receiver. Behavioral Gravity only works because the human biological substrate is pre-wired to respond to social pressure, habit, and consequence.\n- **The Hook**: Sub-Objects hook into the "Machine's" inherited trauma and survival instincts.\n- **Awareness**: Seeing the machinery allows one to calculate the gravitational pull.\n`
  },
  'sub_objects': {
    type: 'vol1',
    content: `## Forensic Alignment (Volume II)\n\nSub-Objects are the external "pipes" described in the **Well Water Principle**. We do not just "believe" in them; we are materially downstream from them.\n- **The Machine**: The internal wiring that reacts to sub-object pressure.\n- **Dependency**: Independence requires a rupture of the material sub-objects that feed you.\n`
  },
  'resurrection_of_structure': {
    type: 'vol1',
    content: `## Forensic Alignment (Volume II)\n\nThe return of a structure to life is perceived through **C-Mirroring**. What we call a "Holy Spirit" is the high-frequency resonance of a resurrected sub-object refracting through the human observer.\n`
  },
  'the_machine': {
    type: 'vol2',
    content: `### Axiomatic Root (Volume I)\n\nThe Machine is the biological engine that reacts to **Sub-Objects**. While the Sub-Object is the external structure, The Machine is the nervous system following the path of **Behavioral Gravity**.\n`
  },
  'well_water_principle': {
    type: 'vol2',
    content: `### Axiomatic Root (Volume I)\n\nThe Well Water Principle is the forensic application of **Sub-Objects**. Every "pipe" in the chain is a relational structure that dictates the movement of labor.\n- **Behavioral Gravity**: The pull that keeps us downstream.\n`
  },
  'c_mirroring': {
    type: 'vol2',
    content: `### Axiomatic Root (Volume I)\n\nC-Mirroring is the mechanical basis for the **Resurrection of Structure**. We perceive structural recurrence as personal presence because our wiring is designed to mirror durable patterns.\n`
  }
};

function align() {
  console.log('--- ALIGNMENT 2.0 START ---');

  const files = fs.readdirSync(WIKI_DIR).filter(f => f.endsWith('.md'));

  files.forEach(file => {
    const slug = file.replace('.md', '');
    const filePath = path.join(WIKI_DIR, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (INTEGRATIONS[slug]) {
      const integration = INTEGRATIONS[slug];
      const sectionHeader = integration.type === 'vol1' ? '## Forensic Alignment' : '### Axiomatic Root';

      if (!content.includes(sectionHeader)) {
        console.log(`Injecting alignment into ${file}...`);
        
        // Find a good place to inject (before Internal Logic or at the end)
        if (content.includes('## Internal Logic')) {
          content = content.replace('## Internal Logic', `${integration.content}\n## Internal Logic`);
        } else if (content.includes('### Internal Logic')) {
          content = content.replace('### Internal Logic', `${integration.content}\n### Internal Logic`);
        } else {
          content += `\n\n${integration.content}`;
        }
        
        fs.writeFileSync(filePath, content);
      } else {
        console.log(`${file} already integrated.`);
      }
    }
  });

  console.log('--- ALIGNMENT 2.0 COMPLETE ---');
}

align();
