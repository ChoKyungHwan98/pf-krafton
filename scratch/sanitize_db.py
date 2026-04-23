import os
import re

def sanitize_db():
    base_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전'
    files = [
        'src/data/games/pc.ts',
        'src/data/games/mobile.ts',
        'src/data/games/console.ts'
    ]
    
    for rel_path in files:
        fpath = os.path.join(base_dir, rel_path)
        if not os.path.exists(fpath): continue
        
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Remove broken image paths
        # Pattern covers both , "image": ... and just "image": ...
        content = re.sub(r',?\s*"image":\s*"\./images/games/\.jpg"', '', content)
        # Also clean up double commas or trailing commas if any
        content = content.replace(',  }', ' }').replace(', }', ' }')
        
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)

    print("Sanitization Complete.")

if __name__ == "__main__":
    sanitize_db()
