import fs from 'fs';
import path from 'path';

const rawAssetsDir = 'c:\\Users\\ezrab\\OneDrive - Durham Technical Community College\\Desktop\\MCS\\materialistchristianity-site\\raw_assets';
const files = fs.readdirSync(rawAssetsDir).filter(f => f.startsWith('conversations-') && f.endsWith('.json'));

const ledger = [];

files.forEach(file => {
  const filePath = path.join(rawAssetsDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  data.forEach((conv, index) => {
    if (conv.title) {
      ledger.push({
        file,
        index,
        title: conv.title,
        id: conv.conversation_id || conv.id
      });
    }
  });
});

fs.writeFileSync('c:\\Users\\ezrab\\OneDrive - Durham Technical Community College\\Desktop\\MCS\\materialistchristianity-site\\tmp\\title_summary.json', JSON.stringify(ledger, null, 2));
console.log(`Extracted ${ledger.length} titles.`);
