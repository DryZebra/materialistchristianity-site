const fs = require('fs');
const path = require('path');

const wikiDir = path.join(process.cwd(), 'content', 'wiki');

if (!fs.existsSync(wikiDir)) {
    console.error('Wiki directory not found');
    process.exit(1);
}

const files = fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
    const filePath = path.join(wikiDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Convert [[Title]](/path) to [Title](/path)
    content = content.replace(/\[\[(.*?)\]\]\((.*?)\)/g, '[$1]($2)');

    // Convert [[slug]] to [Slug](/wiki/essays/slug) (where slug is camel_case or similar)
    content = content.replace(/\[\[([a-z0-9_]+)\]\]/g, (match, slug) => {
        const title = slug.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        return `[${title}](/wiki/essays/${slug})`;
    });

    fs.writeFileSync(filePath, content);
    console.log(`Normalized: ${file}`);
});
