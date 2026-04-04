const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function getAllWikiNodes() {
  const contentPath = path.join(process.cwd(), 'content');
  console.log('Content Path:', contentPath);
  if (!fs.existsSync(contentPath)) {
    console.log('Content path does not exist');
    return [];
  }

  const getFilesRecursively = (dir) => {
    let files = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        files = [...files, ...getFilesRecursively(fullPath)];
      } else if (item.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
    return files;
  };

  const filePaths = getFilesRecursively(contentPath);
  console.log('File Paths Found:', filePaths.length);
  
  return filePaths.map(fullPath => {
    const slug = path.basename(fullPath, '.md');
    const rawContent = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(rawContent);
    return {
      slug,
      title: data.title,
      category: data.category
    };
  });
}

const nodes = getAllWikiNodes();
console.log('Nodes Found:', nodes.length);
console.log('Sample Node:', nodes.find(n => n.slug === 'gmorknicity'));
