# William Engine: Lab Manifest

This document records the purpose and status of all diagnostic and maintenance scripts within the `william-engine/lab` directory.

## Core Content Management

| Tool | Purpose | Status |
| :--- | :--- | :--- |
| `validate-links.mjs` | Performs a global connectivity audit, matching slugs to physical file paths. | **STABLE** |
| `generate_content_map.js` | Generates the `src/lib/content_map.ts` used by the Next.js frontend. | **STABLE** |
| `heal-links.mjs` | **Systemic Healer**: Automatically corrects link prefixes (nodes/essays/bible) and redirects archived nodes. | **NEW** / **SHARPENING** |
| `sanitize-content.mjs` | Strips formulaic branding and prescriptive language from wiki nodes. | **STABLE** |

## Archival & Synthesis

| Tool | Purpose | Status |
| :--- | :--- | :--- |
| `audit-knowledge-graph.mjs` | Analyzes for orphans and dead-ends in the knowledge map. | **EXPERIMENTAL** |
| `batch-align.mjs` | Performs mass-alignment of Biblical nodes to the forensic lexicon. | **STABLE** |
| `sync-db.mjs` | Synchronizes local markdown content with the persistent operational database. | **STABLE** |

## Protocol & Verification

| Tool | Purpose | Status |
| :--- | :--- | :--- |
| `validate-testimony.mjs` | Verifies the "Atheist Axiom" alignment across the corpus. | **STABLE** |
| `global_categorical_repair.js` | Force-repairs system-level routing errors. | **STABLE** |

---
**Seed Registry**: All archival seeds for these tools are located in `william-engine/archive/map.json`.
**Conversational Filter**: All automated suggestions from `heal-links.mjs` must be filtered through `archives/raw_assets/conversations-xxx.json` before execution.
