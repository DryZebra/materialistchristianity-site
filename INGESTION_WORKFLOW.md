# The Forensic Ingestion Protocol

- **Current State**: Phase 11 complete. 61 core wiki nodes materialized and functional.
- **Source Material**: Located in `docs/sources/`. Use the *Materialist Christianity* EBook as the primary truth source.
- **Protocol**: 
  1. Audit `NODE_REGISTRY.md` before ingestion.
  2. Use `scripts/` for any data processing or asset scans.

## 1. The Metadata Standard (Frontmatter)
Every `.md` file placed in the `/content` directory **MUST** begin with a YAML block. Copy this template:

```yaml
---
title: "The Title of the Essay"
description: "A machine-readable 1-2 sentence summary for Search Agents (AEO)."
category: "The Axioms"
tags: ["foundations", "materialism", "survival"]
related: ["slug-of-related-essay", "another-slug"]
---
```

### Valid Categories
Use these categories to ensure the Hub groups your work correctly:
- `The Axioms`: Foundational principles and declarations.
- `Mechanics`: The technical physics of materialist belief.
- `Praxis`: Real-world applications and behavioral forensics.
- `Historical Materialism`: Records and audits of the past.

## 2. Ingestion Workflow
When you are ready to add a new essay, follow this exact sequence:

1.  **Drop the File**: Save your `.md` file into the `/content` folder.
2.  **Assign Coordinates**: Ensure the `slug` (filename) is consistent (e.g., `04_labor_value.md`).
3.  **Audit the Metadata**: Ensure the `tags` and `category` match your existing taxonomy.
4.  **Initiate the Pour**: Run a new build. The engine will automatically:
    -   Create a new categorized section in the Wiki Hub (if the category is new).
    -   Generate a high-authority AEO header for search engines.
    -   Link the essay to all items listed in the `related` field.

## Ingestion Setup
Before beginning a content wave, ensure the environment is calibrated:
- **Registry Check**: Ensure the target node exists in `NODE_REGISTRY.md`.
- **Source Access**: Refer to the master manuscript in `docs/sources/Materialist Christianity EBook.md`.

## 3. Maintenance Ethics
- **Zero Dead Ends**: Never link to a `related` slug that does not exist in `/content`.
- **AEO Precision**: Keep descriptions factual and structural. Avoid marketing fluff.
- **Node Consistency**: Maintain a 1:1 relationship between behavior (the text) and structure (the metadata).

---
*Authored by the William Engine.*
