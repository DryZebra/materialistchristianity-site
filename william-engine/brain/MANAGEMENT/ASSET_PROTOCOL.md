# Asset Management Protocol (William Spec)

This document governs how assets are managed for the Materialist Christianity project to ensure structural efficiency and zero repository bloat.

## 1. The Local Archive (`/raw_assets`)
The `/raw_assets` directory is a **Local Only** tool. It contains the raw, uncompressed source materials (2000+ images/documents). 

> [!CAUTION]
> **NEVER** remove `/raw_assets/` from `.gitignore`. 
> **NEVER** attempt to synchronize the full archive with GitHub.

## 2. Mandatory Asset Workflow
Before adding any new external media, every agent MUST follow this protocol:

1.  **Search the Manifest**: Check `ASSET_MANIFEST.md` for existing relevant imagery or documents.
2.  **Selection**: Only move the **specific** file needed for the UI from `/raw_assets` to `website/public/media/`.
3.  **Optimization**: 
    *   Convert all images to `.webp` or `.avif`.
    *   Maximum file size for any single image: **200KB**.
    *   Maximum resolution: **1920px** width (unless a background beam requires more).
4.  **Minification**: Run all selected assets through a minification tool before committing to the repo.

## 3. Storage Constraints
The site is hosted on GitHub Pages (Static). Total repository size should ideally remain under **50MB** to ensure fast clone times and high-performance CDN delivery.

## 4. Verification
Periodically run the `scan_assets.py` script to update the manifest and ensure no dead weight has accumulated in the `website/public` directory.

---
*Built on stone. Motion is everything.*
