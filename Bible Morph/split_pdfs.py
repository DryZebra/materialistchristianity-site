import os
from pypdf import PdfReader, PdfWriter

def split_pdf(input_pdf_path, chunk_size=500):
    reader = PdfReader(input_pdf_path)
    total_pages = len(reader.pages)
    
    base_name = os.path.splitext(input_pdf_path)[0]
    
    for i in range(0, total_pages, chunk_size):
        writer = PdfWriter()
        chunk_pages = reader.pages[i:i + chunk_size]
        
        for page in chunk_pages:
            writer.add_page(page)
            
        part_num = (i // chunk_size) + 1
        output_filename = f"{base_name}_part_{part_num}.pdf"
        
        with open(output_filename, "wb") as out_pdf:
            writer.write(out_pdf)
            
        print(f"Created {output_filename} ({len(chunk_pages)} pages)")

pdfs_to_split = [
    "sblgnt_verses_from_xml.pdf", 
    "morphgnt_sblgnt_combined.pdf", 
    "oshb_tokens.pdf"
]

for pdf in pdfs_to_split:
    if os.path.exists(pdf):
        print(f"Splitting {pdf}...")
        split_pdf(pdf)
    else:
        print(f"Error: {pdf} not found.")
