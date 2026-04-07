# CLAUDE.md: Forensic Site Boot Protocol

## 🚨 MANDATORY INITIAL ACTION
Every agent/clone/contributor must read the **[Forensic Standards](file:///c:/Users/ezrab/OneDrive%20-%20Durham%20Technical%20Community%20College/Desktop/MCS/materialistchristianity-site/docs/intelligence/forensic_standards.md)** and **[Operational Lessons](file:///c:/Users/ezrab/OneDrive%20-%20Durham%20Technical%20Community%20College/Desktop/MCS/materialistchristianity-site/docs/intelligence/operational_lessons.md)** before modifying any file.

---

## 🏛️ Project Structure
- **[/src/](file:///c:/Users/ezrab/OneDrive%20-%20Durham%20Technical%20Community%20College/Desktop/MCS/materialistchristianity-site/src/)**: Application logic (Next.js/React).
- **[/content/wiki/mechanics/](file:///c:/Users/ezrab/OneDrive%20-%20Durham%20Technical%20Community%20College/Desktop/MCS/materialistchristianity-site/content/wiki/mechanics/)**: Prime Nodes (Axioms).
- **[/content/wiki/testimonies/](file:///c:/Users/ezrab/OneDrive%20-%20Durham%20Technical%20Community%20College/Desktop/MCS/materialistchristianity-site/content/wiki/testimonies/)**: Primary Essays.
- **[/docs/intelligence/](file:///c:/Users/ezrab/OneDrive%20-%20Durham%20Technical%20Community%20College/Desktop/MCS/materialistchristianity-site/docs/intelligence/)**: Behavioral standards and operational memory.

## 🛠️ Common Commands
- **Build**: `npm run build`
- **Quality Audit**: `node tools/validate-links.mjs`
- **Standard Audit**: `grep -r "In a Pure MC context" content/` (Check for regressions)

## ⚖️ Forensic Hardlines
1. **Physicality First**: All links MUST resolve to a physical `.md` filename.
2. **Recursive Logic**: All validation/structural scripts must be recursive.
3. **Plural Routing**: All routes use plural prefixes (`/wiki/nodes/`, `/wiki/essays/`).
