import os

def tsv_to_txt_chunks(tsv_path, lines_per_chunk=30000):
    part_num = 1
    out_file = None
    line_count = 0
    base_name = os.path.splitext(tsv_path)[0]
    
    with open(tsv_path, 'r', encoding='utf-8') as f:
        for line in f:
            if line_count % lines_per_chunk == 0:
                if out_file:
                    out_file.close()
                out_name = f"{base_name}_txt_part_{part_num}.txt"
                out_file = open(out_name, 'w', encoding='utf-8')
                part_num += 1
                print(f"Writing to {out_name}...")
            
            # Replace tabs with ' | ' to match NotebookLM-friendly flat structure
            out_file.write(line.replace('\t', ' | '))
            line_count += 1
            
        if out_file:
            out_file.close()
    
    print(f"Finished splitting {tsv_path} into {part_num - 1} text chunks.")

if __name__ == "__main__":
    tsv_to_txt_chunks("morphgnt_sblgnt_combined.tsv", lines_per_chunk=30000)
