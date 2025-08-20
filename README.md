# MaterialistChristianity.org

Static site for **Vestnik of the Light** — a fast hub linking to the book, Substack, TikTok, Twitter, Payhip guides, and PayPal donations.

## Deploy (GitHub Pages)

1. Create a repo (public is fine). Example: `materialistchristianity-site`.
2. Add files in repo root:
   - `index.html`
   - `styles.css`
   - `CNAME` (contains `MaterialistChristianity.org`)
   - `/assets/banner.jpg` (your banner) and optional `/assets/pfp.jpg` (avatar)
3. Push to `main`.
4. Settings → Pages → Source: **Deploy from a branch**, Branch: `main` / `/root`.
5. Under **Custom domain**, enter `MaterialistChristianity.org` and save.
6. DNS at registrar:
   - Apex A records → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - `www` CNAME → `<your-username>.github.io`
7. In Pages, enable **Enforce HTTPS** after the cert appears.

## Replace placeholders
- Put your book-cover art (no text) as `/assets/banner.jpg`.
- Optionally add `/assets/pfp.jpg` for the round avatar; otherwise it hides.
- If you have a Substack subdomain (e.g., `vestnikofthelight.substack.com`), uncomment the iframe embed to show a subscribe box.

