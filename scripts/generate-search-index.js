const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Minimal version of wiki.ts logic in JS
function getFilesFromDir(dir) {
  const contentPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(contentPath)) return [];

  const walk = (currentDir) => {
    let results = [];
    const list = fs.readdirSync(currentDir);

    list.forEach(file => {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);

      if (stat && stat.isDirectory()) {
        results = results.concat(walk(filePath));
      } else if (file.endsWith('.md')) {
        results.push(filePath);
      }
    });

    return results;
  };

  return walk(contentPath);
}

function parseContentFile(fullPath) {
  const slug = path.basename(fullPath, '.md');
  const rawContent = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(rawContent);

  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    category: data.category || 'General',
    content: content.trim().slice(0, 5000), // Limit content size for index
    url: `/wiki/${slug}` // Simplistic URL, will be fixed by client if needed
  };
}

const nodes = getFilesFromDir('content/wiki').map(parseContentFile);
const searchData = nodes.map(n => ({
  slug: n.slug,
  title: n.title,
  description: n.description,
  category: n.category,
  content: n.content,
  url: n.url
}));

fs.writeFileSync(path.join(process.cwd(), 'public/search-data.json'), JSON.stringify(searchData));
console.log('Search index generated at public/search-data.json');
