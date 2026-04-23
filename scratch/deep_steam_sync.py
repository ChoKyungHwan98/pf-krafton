import os
import re
import requests
from bs4 import BeautifulSoup
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

def get_steam_appid_via_search(title):
    # Use Bing search to find the steam app page
    query = quote(f"{title} steam store")
    url = f"https://www.bing.com/search?q={query}"
    try:
        res = requests.get(url, timeout=10, headers={'User-Agent': 'Mozilla/5.0'})
        # Find store.steampowered.com/app/XXXXXX
        match = re.search(r'store\.steampowered\.com/app/(\d+)', res.text)
        if match:
            return match.group(1)
    except: pass
    return None

def download_steam_art(title):
    appid = get_steam_appid_via_search(title)
    if appid:
        img_url = f"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/{appid}/header.jpg"
        safe_name = sanitize(title) + ".jpg"
        path = os.path.join(IMAGE_DIR, safe_name)
        
        try:
            res = requests.get(img_url, timeout=10)
            if res.status_code == 200:
                with open(path, 'wb') as f:
                    f.write(res.content)
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
        # Only process those that don't have a valid high-quality image yet
        title_match = re.search(r'"title":\s*"([^"]+)"', game_str)
        if not title_match: continue
        title = title_match.group(1)
        
        safe_name = sanitize(title) + ".jpg"
        local_path = os.path.join(IMAGE_DIR, safe_name)
        
        if not os.path.exists(local_path) or os.path.getsize(local_path) < 10000:
            print(f"Deep Searching Steam for: {title}...")
            img_path = download_steam_art(title)
            if img_path:
                print(f"  [SUCCESS] {title}")
                if '"image":' in game_str:
                    new_game_str = re.sub(r'"image":\s*"[^"]*"', f'"image": "{img_path}"', game_str)
                else:
                    new_game_str = game_str.rstrip(" }") + f', "image": "{img_path}"' + " }"
                updated_content = updated_content.replace(game_str, new_game_str)
            else:
                print(f"  [NOT FOUND] {title}")
            time.sleep(1) # Rate limit

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(updated_content)

if __name__ == "__main__":
    print("Starting Deep Steam AppID Resolution Sync...")
    process_file("console.ts")
    process_file("pc.ts")
    print("Deep Sync Complete.")
