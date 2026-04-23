import requests
import json
import os
import time
import re
from urllib.parse import quote
import sys

# Ensure stdout handles UTF-8 for logging
if sys.platform == 'win32':
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.detach(), 'replace')

def get_steam_appid(title, mapping):
    # Check mapping first
    if title in mapping:
        val = mapping[title]
        return val if val != "None" else None

    # Try search suggest API
    suggest_url = f"https://store.steampowered.com/search/suggest?term={quote(title)}&f=games&cc=KR&l=korean"
    try:
        response = requests.get(suggest_url, timeout=10)
        if response.status_code == 200:
            match = re.search(r'data-ds-appid="(\d+)"', response.text)
            if match:
                return match.group(1)
    except:
        pass
    
    return None

def download_missing_console():
    missing_json = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\scratch\missing_console_games.json'
    mapping_json = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\scratch\steam_appids.json'
    output_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\public\images\games'
    
    with open(missing_json, 'r', encoding='utf-8') as f:
        games = json.load(f)
    
    mapping = {}
    if os.path.exists(mapping_json):
        with open(mapping_json, 'r', encoding='utf-8') as f:
            mapping = json.load(f)
    
    print(f"Starting download for {len(games)} games...")
    
    for game in games:
        title = game['title']
        filename = game['filename']
        target_path = os.path.join(output_dir, filename)
        
        if os.path.exists(target_path) and os.path.getsize(target_path) > 0:
            continue

        print(f"Processing: {title}...", flush=True)
        
        appid = get_steam_appid(title, mapping)
        if not appid:
            clean_title = re.sub(r'[:\-~].*', '', title).strip()
            if clean_title != title:
                appid = get_steam_appid(clean_title, mapping)

        if appid:
            img_urls = [
                f"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/{appid}/capsule_616x353.jpg",
                f"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/{appid}/header.jpg"
            ]
            
            success = False
            for img_url in img_urls:
                try:
                    img_res = requests.get(img_url, timeout=10)
                    if img_res.status_code == 200:
                        with open(target_path, 'wb') as f:
                            f.write(img_res.content)
                        print(f"  Success (AppID: {appid})")
                        success = True
                        break
                except:
                    pass
            
            if not success:
                print(f"  Failed to download image for AppID {appid}")
        else:
            print("  AppID not found")
        
        time.sleep(0.5)

if __name__ == "__main__":
    download_missing_console()
