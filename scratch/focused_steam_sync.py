import os
import re
import requests
from urllib.parse import quote
import sys
import time

if sys.stdout.encoding != 'utf-8':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

BASE_DIR = r"c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전"
IMAGE_DIR = os.path.join(BASE_DIR, "public", "images", "games")
DATA_DIR = os.path.join(BASE_DIR, "src", "data", "games")

def sanitize(title):
    clean = re.sub(r'[\\/*?:"<>|]', "", title)
    return clean.replace(" ", "_").replace(":", "").replace("!", "").lower()

def download_steam_art(title):
    # Try multiple search variations using Steam's suggestion API
    search_queries = [title]
    if " - " in title: search_queries.append(title.split(" - ")[0])
    if ": " in title: search_queries.append(title.split(": ")[0])
    
    for query in search_queries:
        try:
            # Steam's suggestion API is very good at matching even localized names
            search_url = f"https://store.steampowered.com/api/storesearch/?term={quote(query)}&l=korean&cc=KR"
            res = requests.get(search_url, timeout=10).json()
            
            if res.get('total', 0) > 0:
                # Pick the best match (first one)
                item = res['items'][0]
                appid = item['id']
                
                # Official Header Capsule
                img_url = f"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/{appid}/header.jpg"
                
                safe_name = sanitize(title) + ".jpg"
                path = os.path.join(IMAGE_DIR, safe_name)
                
                img_res = requests.get(img_url, timeout=10)
                if img_res.status_code == 200:
                    with open(path, 'wb') as f:
                        f.write(img_res.content)
                    return f"./images/games/{safe_name}"
        except: pass
    return None

def process_file(filename):
    filepath = os.path.join(DATA_DIR, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    pattern = r'\{[^{}]*\}'
    games = re.findall(pattern, content)
    
    updated_content = content
    for game_str in games:
        title_match = re.search(r'"title":\s*"([^"]+)"', game_str)
        if not title_match: continue
        title = title_match.group(1)
        
        print(f"Checking Steam for: {title}...")
        img_path = download_steam_art(title)
        
        if img_path:
            print(f"  [FOUND & DOWNLOADED] {title}")
            if '"image":' in game_str:
                new_game_str = re.sub(r'"image":\s*"[^"]*"', f'"image": "{img_path}"', game_str)
            else:
                new_game_str = game_str.rstrip(" }") + f', "image": "{img_path}"' + " }"
            updated_content = updated_content.replace(game_str, new_game_str)
        else:
            print(f"  [SKIP] Not on Steam or not found: {title}")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(updated_content)

if __name__ == "__main__":
    print("Starting Focused Steam Image Sync...")
    process_file("console.ts")
    process_file("pc.ts")
    print("Steam Sync Complete.")
