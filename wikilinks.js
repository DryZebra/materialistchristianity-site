document.addEventListener('DOMContentLoaded', () => {
  const mainContent = document.querySelector('main');
  if (!mainContent) {
    return;
  }

  const wikiBasePath = '/maintenance-log/';
  const wikiPattern = /\[\[([^\[\]]+?)\]\]/g;
  const excludedTags = new Set(['A', 'SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'PRE']);

  const walker = document.createTreeWalker(mainContent, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !wikiPattern.test(node.nodeValue)) {
        return NodeFilter.FILTER_REJECT;
      }

      wikiPattern.lastIndex = 0;

      const parent = node.parentElement;
      if (!parent || excludedTags.has(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }

      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const textNodes = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  for (const textNode of textNodes) {
    const text = textNode.nodeValue;
    wikiPattern.lastIndex = 0;

    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    let match;

    while ((match = wikiPattern.exec(text)) !== null) {
      const [fullMatch, pageNameRaw] = match;
      const pageName = pageNameRaw.trim();
      const prefix = text.slice(lastIndex, match.index);

      if (prefix) {
        fragment.appendChild(document.createTextNode(prefix));
      }

      const slug = pageName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const link = document.createElement('a');
      link.href = `${wikiBasePath}${slug}`;
      link.className = 'wikilink';
      link.textContent = pageName;

      fragment.appendChild(link);
      lastIndex = match.index + fullMatch.length;
    }

    const suffix = text.slice(lastIndex);
    if (suffix) {
      fragment.appendChild(document.createTextNode(suffix));
    }

    textNode.parentNode.replaceChild(fragment, textNode);
  }
});
