import fs from 'fs';
import path from 'path';

const ESSAY_DIR = 'content/essays';
const WIKI_DIR = 'content/wiki';

const REDUNDANT_FILES = [
  path.join(ESSAY_DIR, 'the_well_water_principle.md'),
  path.join(ESSAY_DIR, 'the_redneck_dictatorship.md'),
  path.join(WIKI_DIR, 'fractal_theory_of_personality.md'),
  path.join(WIKI_DIR, 'the_timeline_paradox.md')
];

function purge() {
  console.log('--- TERMINAL PURGE START ---');
  REDUNDANT_FILES.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      console.log(`Deleting: ${filePath}`);
      fs.unlinkSync(filePath);
      console.log(`SUCCESS: ${filePath} erased.`);
    } else {
      console.warn(`SKIP: ${filePath} not found.`);
    }
  });
  console.log('--- TERMINAL PURGE COMPLETE ---');
}

purge();
