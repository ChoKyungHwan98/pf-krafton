import os
import re
import requests
from urllib.parse import quote
import sys

# Force UTF-8 for Windows console
if sys.stdout.encoding != 'utf-8':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

BASE_DIR = r"c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전"
IMAGE_DIR = os.path.join(BASE_DIR, "public", "images", "games")
DATA_DIR = os.path.join(BASE_DIR, "src", "data", "games")

# Batch 2: Recovery + Next 10
BATCH_2 = [
    "엘든 링", "활협전", "산나비", "Katana ZERO", "Goose Goose Duck",
    "Goat Simulator", "60 Seconds!", "7 Days to End with You",
    "A Way Out", "Baldur's Gate 3"
]

def sanitize(title):
    clean = re.sub(r'[\\/*?:"<>|]', "", title)
    return clean.replace(" ", "_").replace(":", "").replace("!", "").lower()

def get_steam_appid(title):
    # Manual Mapping for known failures
    MANUAL_MAP = {
        "엘든 링": "1245620",
        "산나비": "1562700",
        "활협전": "1859910"
    }
    if title in MANUAL_MAP:
        return MANUAL_MAP[title]

    # Try multiple variations for search
    queries = [title]
    if " - " in title: queries.append(title.split(" - ")[0])
    
    for q in queries:
        url = f"https://store.steampowered.com/api/storesearch/?term={quote(q)}&l=korean&cc=KR"
        try:
            res = requests.get(url, timeout=10).json()
            if res.get('total', 0) > 0:
                return res['items'][0]['id']
        except Exception:
            pass
    return None

def process_batch(batch):
    for title in batch:
        safe_name = sanitize(title) + ".jpg"
        path = os.path.join(IMAGE_DIR, safe_name)
        
        # [DUPLICATE CHECK] Skip if already exists and is not tiny
        if os.path.exists(path) and os.path.getsize(path) > 5000:
            print(f"Skipping (Already exists): {title}")
            continue

        print(f"Processing: {title}")
        appid = get_steam_appid(title)
        if appid:
            img_url = f"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/{appid}/header.jpg"
            try:
                res = requests.get(img_url, timeout=10)
                if res.status_code == 200:
                    with open(path, 'wb') as f:
                        f.write(res.content)
                    print(f"  [SUCCESS] Downloaded {safe_name}")
                    update_db(title, f"./images/games/{safe_name}")
            except Exception as e:
                print(f"  [ERROR] {title}: {e}")
        else:
            print(f"  [SKIP] Could not find Steam AppID for {title}")

def update_db(title, img_path):
    for filename in ["console.ts", "pc.ts"]:
        filepath = os.path.join(DATA_DIR, filename)
        if not os.path.exists(filepath): continue
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        pattern = r'\{[^{}]*"title":\s*"' + re.escape(title) + r'"[^{}]*\}'
        match = re.search(pattern, content)
        if match:
            game_obj = match.group(0)
            if '"image":' in game_obj:
                new_obj = re.sub(r'"image":\s*"[^"]*"', f'"image": "{img_path}"', game_obj)
            else:
                new_obj = game_obj.rstrip(" }") + f', "image": "{img_path}"' + " }"
            
            new_content = content.replace(game_obj, new_obj)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"  [DB UPDATED] {title}")

if __name__ == "__main__":
    process_batch(BATCH_2)
