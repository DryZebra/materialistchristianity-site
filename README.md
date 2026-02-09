# MaterialistChristianity.org

Static site for **Materialist Christianity** — a finite recognition library that directs readers to the book for full explanations.

## Deploy (GitHub Pages)

1. Create a repo (public is fine). Example: `materialistchristianity-site`.
2. Add files in repo root:
   - `index.html`
   - `styles.css`
   - `CNAME` (contains `MaterialistChristianity.org`)
3. Push to `main`.
4. Settings → Pages → Source: **Deploy from a branch**, Branch: `main` / `/root`.
5. Under **Custom domain**, enter `MaterialistChristianity.org` and save.
6. DNS at registrar:
   - Apex A records → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - `www` CNAME → `<your-username>.github.io`
7. In Pages, enable **Enforce HTTPS** after the cert appears.

## Replace placeholders
- Add the canonical Amazon URL in `/docs/LINKS.md` and replace `#amazon-link` references.

## Changelog
- Reframed the site around the book-first architecture in `/docs/SITE_INTENT.md`, removing social/feed focus and aligning the homepage to recognition → confidence → direction.
- Added a book hub, concepts library, concept pages, and a simple 404 page to create a finite recognition library with explicit pointers back to the book.
- Simplified styling for readability while keeping the existing visual tone.
