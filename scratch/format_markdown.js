const fs = require('fs');

const text = fs.readFileSync('scratch/pdf_fixed.txt', 'utf-8');

const lines = text.split('\n');
let cleaned = [];
let buffer = "";

function isHeading(line) {
    if (line.startsWith('Part') || line.toUpperCase() === line || (line.length < 60 && !line.endsWith('.') && !line.endsWith(','))) {
        return true;
    }
    return false;
}

for (let line of lines) {
    line = line.trim();
    if (!line) {
        if (buffer) {
            cleaned.push(buffer);
            buffer = "";
        }
        cleaned.push("");
        continue;
    }
    
    if (isHeading(line) && !buffer) {
        cleaned.push("## " + line);
        continue;
    }
    
    if (buffer) {
        if (line[0] && line[0].toUpperCase() === line[0] && ['.', '?', '!', ':', '"', "'"].includes(buffer[buffer.length - 1])) {
            buffer += " " + line;
        } else {
            if (buffer[buffer.length - 1] === '-') {
                buffer = buffer.slice(0, -1) + line;
            } else {
                buffer += " " + line;
            }
        }
    } else {
        buffer = line;
    }
}

if (buffer) {
    cleaned.push(buffer);
}

let finalText = cleaned.join('\n');
finalText = finalText.replace(/\n{3,}/g, '\n\n');

const frontmatter = `---
title: "The Political Economy of the Biblical Text: A Materialist Critique"
description: "A comprehensive materialist critique of Bible translation, capital, and market capture."
category: "Ideological Resistance"
tags: [KJV, capitalism, translation, materialist, commodity, critique]
status: "Final"
---

# The Political Economy of the Biblical Text: A Materialist Critique of Translation, Capital, and Market Capture

`;

fs.writeFileSync('content/wiki/ideological-resistance/capitalism_and_bible_translation_critique.md', frontmatter + finalText);
console.log("Formatted and saved.");
