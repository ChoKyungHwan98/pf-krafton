import os
import re
import sys

# Force UTF-8 output
if sys.stdout.encoding != 'utf-8':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

BASE_DIR = r"c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전"
DATA_DIR = os.path.join(BASE_DIR, "src", "data", "games")

def sanitize(title):
    # Standardize filename based on title
    clean = re.sub(r'[\\/*?:"<>|]', "", title)
    return clean.replace(" ", "_").replace(":", "").replace("!", "").lower()

def map_images(filename):
    filepath = os.path.join(DATA_DIR, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Match individual game objects
    pattern = r'\{[^{}]*\}'
    games = re.findall(pattern, content)
    
    updated_content = content
    for game_str in games:
        # Extract title strictly
        title_match = re.search(r'"title":\s*"([^"]+)"', game_str)
        if not title_match: continue
        title = title_match.group(1)
        
        safe_name = sanitize(title) + ".jpg"
        expected_path = f"./images/games/{safe_name}"
        
        # Check if "image" property exists
        if '"image":' in game_str:
            # Update existing image path to standardized one
            new_game_str = re.search(r'(\{.*)"image":\s*"[^"]*"(.*\})', game_str, re.DOTALL)
            if new_game_str:
                replaced_str = re.sub(r'"image":\s*"[^"]*"', f'"image": "{expected_path}"', game_str)
                updated_content = updated_content.replace(game_str, replaced_str)
        else:
            # Add missing image property
            # Find the position before the closing brace
            replaced_str = game_str.rstrip()
            if replaced_str.endswith("}"):
                replaced_str = replaced_str[:-1].rstrip()
                if not replaced_str.endswith(","):
                    replaced_str += ","
                replaced_str += f' "image": "{expected_path}" }}'
                updated_content = updated_content.replace(game_str, replaced_str)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(updated_content)

print("Starting Final Database Mapping...")
map_images("pc.ts")
map_images("console.ts")
map_images("mobile.ts")
print("Mapping Complete.")
