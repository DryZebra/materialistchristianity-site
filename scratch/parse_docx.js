const fs = require('fs');
const path = require('path');

const xmlPath = path.join(__dirname, 'temp_vol2', 'word', 'document.xml');
if (!fs.existsSync(xmlPath)) {
  console.error("Error: document.xml not found at " + xmlPath);
  process.exit(1);
}
const xmlContent = fs.readFileSync(xmlPath, 'utf8');

// Regex-based parsing of w:p and w:t.
// Each w:p is a paragraph. Inside it, w:t elements contain the actual text strings.
const paragraphRegex = /<w:p(?:\s[^>]*)?>([\s\S]*?)<\/w:p>/g;
const textRegex = /<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g;

let paragraphs = [];
let match;
while ((match = paragraphRegex.exec(xmlContent)) !== null) {
  const pContent = match[1];
  let pText = '';
  let tMatch;
  // Reset lastIndex for the inner regex
  textRegex.lastIndex = 0;
  while ((tMatch = textRegex.exec(pContent)) !== null) {
    pText += tMatch[1];
  }
  // Decode HTML entities if any
  pText = pText
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
  
  paragraphs.push(pText);
}

const outputPath = path.join(__dirname, 'volume_ii_text.txt');
fs.writeFileSync(outputPath, paragraphs.join('\n\n'), 'utf8');
console.log('Successfully extracted ' + paragraphs.length + ' paragraphs to ' + outputPath);
