const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'volume_ii_text.txt');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const chapters = [];
let currentChapter = null;

const chapterPatterns = [
  { name: "Introduction: The Completed Draft", start: "Introduction: The Completed Draft" },
  { name: "Chapter 1: What Volume II Is", start: "Chapter 1: What Volume II Is" },
  { name: "Chapter 2: What Volume I Said", start: "Chapter 2: What Volume I Said" },
  { name: "Chapter 3: Why a Second Volume Was Necessary", start: "Chapter 3: Why a Second Volume Was Necessary" },
  { name: "Chapter 4: THE DEATH OF ANIMISM", start: "Chapter 4: THE DEATH OF ANIMISM" },
  { name: "Chapter 5: THE FIRST COGNITIVE REVERSAL", start: "Chapter 5: THE FIRST COGNITIVE REVERSAL" },
  { name: "Chapter 6: THE SECOND COGNITIVE REVERSAL", start: "Chapter 6: THE SECOND COGNITIVE REVERSAL" },
  { name: "Chapter 7: THE FRACTAL THEORY OF PERSONALITY", start: "Chapter 7: THE FRACTAL THEORY OF PERSONALITY" },
  { name: "Chapter 8: PROOF = OUR", start: "Chapter 8: PROOF = OUR" },
  { name: "Chapter 9: RELATIONSHIP AS REVELATION", start: "Chapter 9: RELATIONSHIP AS REVELATION" },
  { name: "Chapter 10: THE 4D TIME SNAKE", start: "Chapter 10: THE 4D TIME SNAKE" },
  { name: "Chapter 11: THE ENTROPIC DANCE", start: "Chapter 11: THE ENTROPIC DANCE" },
  { name: "Chapter 12: CONTINUITY AS TRUTH", start: "Chapter 12: CONTINUITY AS TRUTH" },
  { name: "Chapter 13: THE WELL WATER PRINCIPLE", start: "Chapter 13: THE WELL WATER PRINCIPLE" },
  { name: "Chapter 14: The Christian Substrate Thesis", start: "Chapter 14: The Christian Substrate Thesis" },
  { name: "Chapter 15: Christianity Under Empire", start: "Chapter 15: Christianity Under Empire" },
  { name: "Chapter 16: The Book That Never Burns", start: "Chapter 16: The Book That Never Burns" },
  { name: "Chapter 17: The Reverse Destiny Moment", start: "Chapter 17: The Reverse Destiny Moment" },
  { name: "Chapter 18: Angel Granted Incarnation", start: "Chapter 18: Angel Granted Incarnation" },
  { name: "Epilogue: One Glad Morning", start: "Epilogue: One Glad Morning" }
];

lines.forEach((line, lineIdx) => {
  const trimmed = line.trim();
  const pattern = chapterPatterns.find(p => trimmed.toUpperCase() === p.start.toUpperCase() || trimmed.includes(p.start));
  
  if (pattern) {
    if (currentChapter) {
      currentChapter.endLine = lineIdx;
    }
    currentChapter = {
      name: pattern.name,
      startLine: lineIdx + 1,
      paragraphs: []
    };
    chapters.push(currentChapter);
  }
  
  if (currentChapter) {
    currentChapter.paragraphs.push(line);
  }
});

if (currentChapter) {
  currentChapter.endLine = lines.length;
}

const report = chapters.map(ch => {
  const chText = ch.paragraphs.join('\n');
  const wordCount = chText.split(/\s+/).filter(w => w.length > 0).length;
  const charCount = chText.length;
  
  return {
    name: ch.name,
    startLine: ch.startLine,
    endLine: ch.endLine,
    words: wordCount,
    chars: charCount
  };
});

fs.writeFileSync(
  path.join(__dirname, 'volume_ii_chapters_report.json'),
  JSON.stringify(report, null, 2),
  'utf8'
);

console.log('--- VOLUME II CHAPTERS ---');
report.forEach(ch => {
  console.log(`- [${ch.words} words] ${ch.name} (Lines ${ch.startLine}-${ch.endLine})`);
});
