import csv
import os
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import textwrap

def convert_fast_canvas(tsv_path, pdf_path, is_verses=False, lines_per_chunk=30000):
    part_num = 1
    current_pdf = pdf_path.replace('.pdf', f'_part_{part_num}.pdf')
    c = canvas.Canvas(current_pdf)
    # Register Arial for Greek polytonic support
    font_path = "C:\\Windows\\Fonts\\arial.ttf"
    if os.path.exists(font_path):
        pdfmetrics.registerFont(TTFont('Arial', font_path))
        c.setFont("Arial", 9)
    else:
        c.setFont("Helvetica", 9)
        
    y = 800
    line_count = 0
    with open(tsv_path, "r", encoding="utf-8") as f:
        reader = csv.reader(f, delimiter="\t")
        for row in reader:
            line_count += 1
            if line_count % 10000 == 0:
                print(f"[{current_pdf}] Processed {line_count} lines...")
            
            if is_verses and len(row) >= 2:
                line_str = f"{row[0]}: {row[1]}"
            else:
                line_str = " | ".join(row)
                
            lines = textwrap.wrap(line_str, width=110)
            for line in lines:
                c.drawString(30, y, line)
                y -= 11
                if y < 40:
                    c.showPage()
                    if os.path.exists(font_path):
                        c.setFont("Arial", 9)
                    else:
                        c.setFont("Helvetica", 9)
                    y = 800
            
            if is_verses:
                y -= 5

            # Chunk Splitting
            if line_count % lines_per_chunk == 0:
                c.save()
                print(f"Created {current_pdf}")
                part_num += 1
                current_pdf = pdf_path.replace('.pdf', f'_part_{part_num}.pdf')
                c = canvas.Canvas(current_pdf)
                if os.path.exists(font_path):
                    c.setFont("Arial", 9)
                else:
                    c.setFont("Helvetica", 9)
                y = 800

    c.save()
    print(f"Created {current_pdf}")

# We only need to regenerate morphgnt since the others succeeded.
# convert_fast_canvas("sblgnt_verses_from_xml.tsv", "sblgnt_verses_from_xml.pdf", is_verses=True)
convert_fast_canvas("morphgnt_sblgnt_combined.tsv", "morphgnt_sblgnt_combined.pdf", is_verses=False)
# convert_fast_canvas("oshb_tokens.tsv", "oshb_tokens.pdf", is_verses=False)
