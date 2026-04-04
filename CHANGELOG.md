# Changelog - Materialist Christianity Site

All notable changes to this project will be documented in this file. This is a mandatory protocol to ensure persistence across AI agent sessions.

## [2026-04-04] - Project Management Initialization

### Initial Setup
- **Management**: Established the **William Persona** in `AGENTS.md`.
- **System**: Created `CHANGELOG.md` for mandatory progress tracking.
- **Planning**: Drafted `implementation_plan.md` for the site rebuild, including proposed directory hierarchy and 'Zero-Memory' agent guide.
- **Analysis**: Read and indexed 'Designing Antigravity SEO Book Prompt.md' and the first 1600 lines of 'Materialist Christianity EBook.md'.

## [2026-04-04] - Phase 4 Completion

### Added
- Created the final deployment pipeline in `.github/workflows/deploy.yml` with automated Node.js build and static export.
- Verified production readiness with a successful local static build in `/website/out`.

### Changed
- **Dismantled Legacy Facade**: Deleted the root `index.html` (Polsia iframe mirror).
- Reconfigured GitHub Pages to host the new Next.js 16 project from the `/website/out` directory.

### Status: PRODUCTION READY
The structural rebuild is complete. To finalize the deployment, the current changes must be pushed to the `main` branch.
