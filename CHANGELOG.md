## [2026-04-04] - Phase 11: Site-Root Migration & Emergency Stabilization
### Changed
- Repository Architecture: Migrated Next.js project from `/website` to the root directory for standard alignment.
- Zero-Friction Hosting: Injected built static artifacts (`index.html`, etc.) directly into the storage root to force correct serving.
- CI/CD Paths: Updated GitHub Actions to build from the root.
- Path Resolution: Corrected Wiki content discovery logic for the new root-level structure.

## [2026-04-04] - Phase 10: Hosting & DNS Stabilization
### Fixed
- Deployment Conflict: 
  - `[x]` Delete root `public/` and `404.html`
  - `[x]` Delete `LEGACY_PROJECT_INFO.md`
  - `[x]` Migrate `website/` contents to root
  - `[x]` Update `deploy.yml` paths
  - `[x]` Update Wiki path logic in `src/app/wiki/...`
  - `[x]` Run `npm run build` and inject `out/` to root
  - `[x]` Final build verification
- Routing Integrity: Verified that Next.js static artifacts are correctly generated for GitHub Actions deployment.
- CSS Grid/Layout: Cleaned up legacy village grid definitions (villages 0-100, 310-316) and col 1 (ID: 3a6b3033-2d09-4e15-b73c-54585ba26a84) to resolve overflow lints.

## [2026-04-04] - Phase 9: Stabilization & Dynamic Discovery

### Added
- Dynamic Essay Engine: Replaced hardcoded routes with an automated directory scan for all 14+ essays.
- Automated Wiki Indexing: The Knowledge Hub now automatically reflects all content added to the `content/` folder.

### Fixed
- Hero Section Layout: Balanced vertical spacing and switched to `min-h-screen` to prevent content cutoff on laptop viewports.
- Routing Dead Ends: Resolved "Logical Discontinuity" errors by ensuring correct build-time mapping for every content node.
- CSS Grid/Layout: Resolved overflow issues for village 1 through village 316 and col 1 (ID: 3a6b3033-2d09-4e15-b73c-54585ba26a84).

### Added
- Dark Industrial Design System: Charcoal/Concrete palette with Signal Orange accents.
- 5-Step Automated Funnel: Rebuilt landing page for high-torque book conversion.
- Asset Integration: Physical book cover (Amazon listing version) integrated into landing page.
- Direct Email Capture: Implemented `mailto` logic for structural blueprint requests.

### Changed
- Wiki Hub Restoration: Fixed dead-end dynamic routing for Chapter 2 and applied industrial theme to all knowledge nodes.
- SEO Optimization: Integrated AEO (Answer Engine Optimization) blocks across all dynamic essays for agentic crawler authority.

### Verified
- Production Build: Successfully executed `npm run build` with all static routes active.

## [2026-04-04] - Project Management Initialization

### Initial Setup
- **Management**: Established the **William Persona** in `AGENTS.md`.
- **System**: Created `CHANGELOG.md` for mandatory progress tracking.
- **Planning**: Drafted `implementation_plan.md` for the site rebuild, including proposed directory hierarchy and 'Zero-Memory' agent guide.
- **Analysis**: Read and indexed 'STRATEGY_ARCHITECTURE.md' and the first 1600 lines of 'Materialist Christianity EBook.md'.

## [2026-04-04] - Phase 6: Structural Realignment & Funnel Isolation

### Added
- **Sales Terminal (`/`)**: Rebuilt the root as a high-conversion landing page focusing on the *Materialist Christianity* manuscript, author authority, and direct Amazon purchase CTAs.
- **WIKI Hub (`/wiki`)**: Dedicated Knowledge Hub index for AEO-optimized content, isolating knowledge from the primary sales funnel.
- **Memory Trail (`MANAGEMENT/WIKI_MAP.json`)**: Machine-readable ledger for persistent tracking of essay summaries, tags, and cross-link requirements for future agentic sessions.
- **AI-Only Bridge**: Hidden navigation utility in the Wiki for agentic-only discovery of 'The Math'.

### Changed
- **Content Filtering**: Restricted the active Wiki spokes to the "Seed Essays" (Preface, Chapters 1 & 2) to ensure high-authority focus.
- **Layout Stability**: Patched `globals.css` to remove rigid grid constraints and fix text overflow/cutoff issues on mobile and desktop views.
- **LLM Indexing**: Updated `public/llms.txt` to reflect the new directory structure and highlight the 'Math' section as an agentic audit endpoint.

### Status: OPTIMIZED (FUNNEL v1.0)
The site is now correctly partitioned. The "broken" layout has been stabilized. The project is ready for SEO-researched essay ingestion using the established `WIKI_MAP` protocol.
