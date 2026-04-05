import re
import os

def segment_ebook(file_path, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Define chapter headers with ID anchors
    chapters = [
        (r"# \*\*Author’s Note\*\* \{#author’s-note\}", "00_authors_note.md"),
        (r"# \*\*Preface:\*\* \{#preface:\}", "01_preface.md"),
        (r"# \*\*Chapter 1: What Is Real\?\*\* \{#chapter-1:-what-is-real\?\}", "02_ch1_what_is_real.md"),
        (r"# \*\*Chapter 2: Motion Is Real, Not Things\*\* \{#chapter-2:-motion-is-real,-not-things\}", "03_ch2_motion_not_things.md"),
        (r"# \*\*Chapter 3: Object, Subject, Sub-Object\*\* \{#chapter-3:-object,-subject,-sub-object\}", "04_ch3_object_subject_subobject.md"),
        (r"# \*\*Chapter 4: Morality as Labor Value\*\* \{#chapter-4:-morality-as-labor-value\}", "05_ch4_morality_as_labor.md"),
        (r"# \*\*Chapter 5: Trust as the Universal Commodity Form\*\* \{#chapter-5:-trust-as-the-universal-commodity-form\}", "06_ch5_trust_commodity.md"),
        (r"# \*\*Chapter 6: Sub-Object Resonance and Gmorknicity\*\* \{#chapter-6:-sub-object-resonance-and-gmorknicity\}", "07_ch6_subobject_resonance.md"),
        (r"# \*\*Chapter 7: The Bible as Moral Capital\*\* \{#chapter-7:-the-bible-as-moral-capital\}", "08_ch7_bible_moral_capital.md"),
        (r"# \*\*Chapter 8: Christianity as the Dominant Moral Form\*\* \{#chapter-8:-christianity-as-the-dominant-moral-form\}", "09_ch8_christianity_dominant_form.md"),
        (r"# \*\*Chapter 9: Capital and Trust: Parallel Histories\*\* \{#chapter-9:-capital-and-trust:-parallel-histories\}", "10_ch9_capital_trust_histories.md"),
        (r"# \*\*Chapter 10: The Sub-Objectual Dialectic\*\* \{#chapter-10:-the-sub-objectual-dialectic\}", "11_ch10_subobjectual_dialectic.md"),
        (r"# \*\*Chapter 11: Toward a Moral Communism\*\* \{#chapter-11:-toward-a-moral-communism\}", "12_ch11_moral_communism.md"),
        (r"# \*\*Epilogue: Still Walking\*\* \{#epilogue:-still-walking\}", "13_epilogue.md"),
    ]

    # Find the positions of each header
    positions = []
    for pattern, filename in chapters:
        match = re.search(pattern, content)
        if match:
            positions.append((match.start(), filename))
        else:
            print(f"Warning: Could not find chapter {pattern}")

    # Sort positions just in case
    positions.sort()

    for i in range(len(positions)):
        start = positions[i][0]
        filename = positions[i][1]
        
        # End is the start of the next chapter or end of file
        end = positions[i+1][0] if i+1 < len(positions) else len(content)
        
        chapter_content = content[start:end].strip()
        
        output_path = os.path.join(output_dir, filename)
        with open(output_path, 'w', encoding='utf-8') as sf:
            sf.write(chapter_content)
        print(f"Created {output_path}")

if __name__ == "__main__":
    file_path = r"c:\Users\ezrab\OneDrive - Durham Technical Community College\Desktop\MCS\materialistchristianity-site\Materialist Christianity EBook.md"
    output_dir = r"c:\Users\ezrab\OneDrive - Durham Technical Community College\Desktop\MCS\materialistchristianity-site\content"
    segment_ebook(file_path, output_dir)
