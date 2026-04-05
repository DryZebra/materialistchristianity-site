import os
import re
import json

ARCHIVE_DIR = "raw_assets"
NODE_DIR = "docs/archive/knowledge_db/nodes"

def calculate_line_number(file_path, search_pattern):
    """
    Very basic line number calculator for a pattern in a file.
    In a real forensic scenario, we'd want to be more precise with JSON structure,
    but the user is already referencing 'Line Numbers' from standard file viewers.
    """
    matches = []
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            for i, line in enumerate(f, 1):
                if re.search(search_pattern, line, re.IGNORECASE):
                    matches.append((i, line.strip()))
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
    return matches

def map_concept(concept_name, pattern):
    print(f"Mapping concept: {concept_name} with pattern: {pattern}")
    results = []
    
    # Get all conversation files
    files = [f for f in os.listdir(ARCHIVE_DIR) if f.startswith("conversations-") and f.endswith(".json")]
    files.sort()
    
    for filename in files:
        file_path = os.path.join(ARCHIVE_DIR, filename)
        findings = calculate_line_number(file_path, pattern)
        for line_num, context in findings:
            results.append({
                "archive": filename,
                "line": line_num,
                "context": context
            })
            
    return results

if __name__ == "__main__":
    # Test with 'Rem'
    rem_findings = map_concept("Rem", r"\bRem\b")
    for f in rem_findings[:10]: # Print first 10
        print(f"[{f['archive']}:{f['line']}] {f['context'][:100]}...")
