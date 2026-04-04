import fs from 'fs';
import path from 'path';

const rawAssetsDir = 'c:\\Users\\ezrab\\OneDrive - Durham Technical Community College\\Desktop\\MCS\\materialistchristianity-site\\raw_assets';
const files = fs.readdirSync(rawAssetsDir).filter(f => f.startsWith('conversations-') && f.endsWith('.json'));

const keywords = [
  'materialist', 'christianity', 'dialectic', 'marx', 'economics', 'bible', 
  'scripture', 'forensic', 'brutalist', 'capitalism', 'labor', 'axiom', 
  'aeo', 'seo', 'electrician', 'industrial', 'testimony', 'creed'
];

const ledger = [];

files.forEach(file => {
  const filePath = path.join(rawAssetsDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  data.forEach((conv, index) => {
    const title = (conv.title || '').toLowerCase();
    const matchesKeyword = keywords.some(k => title.includes(k));
    
    if (matchesKeyword) {
      // Find long messages that might be essays
      let potentialEssayCount = 0;
      let contextSnippet = '';
      
      const mapping = conv.mapping || {};
      Object.values(mapping).forEach(node => {
        const parts = node.message?.content?.parts || [];
        parts.forEach(part => {
          if (typeof part === 'string' && part.length > 1000) {
            potentialEssayCount++;
            if (!contextSnippet) contextSnippet = part.substring(0, 200).replace(/\n/g, ' ') + '...';
          }
        });
      });

      ledger.push({
        file,
        title: conv.title,
        id: conv.conversation_id || conv.id,
        essaysFound: potentialEssayCount,
        snippet: contextSnippet
      });
    }
  });
});

fs.writeFileSync('c:\\Users\\ezrab\\OneDrive - Durham Technical Community College\\Desktop\\MCS\\materialistchristianity-site\\docs\\sources\\ESSAY_LEDGER.json', JSON.stringify(ledger, null, 2));
console.log(`Filtered down to ${ledger.length} high-value conversations.`);
