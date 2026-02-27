document.addEventListener('DOMContentLoaded', () => {
  const mainContent = document.querySelector('main') || document.body;
  if (!mainContent) {
    return;
  }

  const wikiBasePath = '/maintenance-log/';
  const wikiPattern = /\[\[([^\[\]]+?)\]\]/g;
  const excludedTags = new Set(['A', 'SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'PRE']);

  function buildSlug(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function processNodes(titleMap) {
    const walker = document.createTreeWalker(mainContent, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue) {
          return NodeFilter.FILTER_REJECT;
        }

        const parent = node.parentElement;
        if (!parent || excludedTags.has(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }

        wikiPattern.lastIndex = 0;
        if (!wikiPattern.test(node.nodeValue)) {
          return NodeFilter.FILTER_REJECT;
        }

        wikiPattern.lastIndex = 0;

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

        const normalized = pageName.toLowerCase();
        const href = titleMap.get(normalized) || `${wikiBasePath}${buildSlug(pageName)}`;

        const link = document.createElement('a');
        link.href = href;
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
  }

  fetch('/search.json')
    .then(function (response) {
      return response.ok ? response.json() : [];
    })
    .then(function (data) {
      const titleMap = new Map();
      (Array.isArray(data) ? data : []).forEach(function (page) {
        if (page.title && page.url) {
          titleMap.set(page.title.toLowerCase(), page.url);
        }
      });
      processNodes(titleMap);
    })
    .catch(function () {
      processNodes(new Map());
    });
});
