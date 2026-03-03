#!/usr/bin/env python3
"""Validate /maintenance-log/<slug> links in markdown files resolve to existing pages."""

from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
MAINT_DIR = ROOT / "maintenance-log"

LINK_RE = re.compile(r"\]\(/maintenance-log/([a-z0-9\-]+)(?:/)?(?:#[^)]+)?\)")


def existing_slugs() -> set[str]:
    return {p.stem for p in MAINT_DIR.glob("*.md") if p.name != "index.md"}


def markdown_files() -> list[Path]:
    return [
        p for p in ROOT.rglob("*.md")
        if ".git" not in p.parts
    ]


def main() -> int:
    slugs = existing_slugs()
    missing: list[tuple[str, str]] = []

    for md in markdown_files():
        rel = md.relative_to(ROOT)
        text = md.read_text(encoding="utf-8")
        for match in LINK_RE.finditer(text):
            slug = match.group(1)
            if slug not in slugs:
                missing.append((str(rel), slug))

    if missing:
        print("Broken /maintenance-log links found:")
        for file_path, slug in missing:
            print(f"- {file_path}: /maintenance-log/{slug}")
        return 1

    print("All /maintenance-log/<slug> links resolve to markdown pages.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
