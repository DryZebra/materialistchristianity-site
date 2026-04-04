import csv
import os

def generate_optimized_txt(tsv_path, num_chunks=4):
    with open(tsv_path, 'r', encoding='utf-8') as f:
        reader = csv.reader(f, delimiter='\t')
        header = next(reader, None)
        
        lines = []
        for row in reader:
            if len(row) < 10: 
                continue
            # Row mapping: book_num(0) book(1) chapter(2) verse(3) pos(4) morph(5) surface_punct(6) surface(7) normalized(8) lemma(9)
            # Example format: Matt 1:1 N- ----NSF- Βίβλος Βίβλος βίβλος βίβλος
            # This condenses the line from 19 words down to exactly 9 words.
            opt_line = f"{row[1]} {row[2]}:{row[3]} {row[4]} {row[5]} {row[6]} {row[7]} {row[8]} {row[9]}"
            lines.append(opt_line)
            
    chunk_size = (len(lines) // num_chunks) + 1
    
    for i in range(num_chunks):
        start = i * chunk_size
        end = start + chunk_size
        chunk_lines = lines[start:end]
        if not chunk_lines: 
            break
        
        out_name = f"morphgnt_optimized_part_{i+1}.txt"
        with open(out_name, 'w', encoding='utf-8') as out:
            out.write("\n".join(chunk_lines))
        print(f"Created {out_name} with {len(chunk_lines)} lines (~{len(chunk_lines) * 9} words).")

if __name__ == "__main__":
    generate_optimized_txt("morphgnt_sblgnt_combined.tsv", num_chunks=4)
