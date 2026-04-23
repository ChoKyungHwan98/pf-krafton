import os
import json
import re

def analyze_visual_gaps():
    base_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전'
    files = {
        "PC": 'src/data/games/pc.ts',
        "Mobile": 'src/data/games/mobile.ts',
        "Console": 'src/data/games/console.ts'
    }
    
    missing = {"PC": [], "Mobile": [], "Console": []}
    
    for cat, rel_path in files.items():
        full_path = os.path.join(base_dir, rel_path)
        if not os.path.exists(full_path): continue
        
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Split by individual objects { ... }
        # Note: This is a simple heuristic.
        parts = re.findall(r'\{[^{}]*?"title":\s*"(.*?)"[^{}]*?\}', content, re.DOTALL)
        
        # Now find titles that don't have "image" in their specific object block
        for title in parts:
            # Find the specific block for this title again to check for image
            # We need to be careful with titles that might be substrings.
            block_pattern = rf'\{{[^{{}}]*?"title":\s*"{re.escape(title)}"[^{{}}]*?\}}'
            match = re.search(block_pattern, content, re.DOTALL)
            if match and '"image":' not in match.group(0):
                missing[cat].append(title)

    print(f"Analysis Complete.")
    print(f"Missing PC: {len(missing['PC'])}")
    print(f"Missing Mobile: {len(missing['Mobile'])}")
    print(f"Missing Console: {len(missing['Console'])}")
    
    with open(os.path.join(base_dir, 'scratch/missing_images.json'), 'w', encoding='utf-8') as f:
        json.dump(missing, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    analyze_visual_gaps()
