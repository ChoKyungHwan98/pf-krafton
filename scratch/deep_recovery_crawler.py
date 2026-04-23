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

def download(url, filename):
    try:
        path = os.path.join(IMAGE_DIR, filename)
        if os.path.exists(path) and os.path.getsize(path) > 10000:
            return True
        res = requests.get(url, timeout=20, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'})
        if res.status_code == 200:
            with open(path, 'wb') as f:
                f.write(res.content)
            return True
    except: pass
    return False

def deep_search_image(title, category):
    # Try different search engines / archives
    query = quote(f"{title} {category} official key art feature graphic")
    search_url = f"https://www.bing.com/images/search?q={query}"
    try:
        res = requests.get(search_url, timeout=15, headers={'User-Agent': 'Mozilla/5.0'})
        soup = BeautifulSoup(res.text, 'html.parser')
        # Find first image in Bing results
        img_link = soup.select_one('a.iusc')
        if img_link:
            import json
            m = json.loads(img_link.get('m', '{}'))
            return m.get('murl')
    except: pass
    return None

def get_failed_games():
    failed = []
    for filename in ["pc.ts", "console.ts", "mobile.ts"]:
        path = os.path.join(DATA_DIR, filename)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        pattern = r'\{[^{}]*\}'
        games_str = re.findall(pattern, content)
        for g_str in games_str:
            title_match = re.search(r'"title":\s*"([^"]+)"', g_str)
            cat_match = re.search(r'"category":\s*"([^"]+)"', g_str)
            if title_match and cat_match:
                title = title_match.group(1)
                safe_name = sanitize(title) + ".jpg"
                img_path = os.path.join(IMAGE_DIR, safe_name)
                if not os.path.exists(img_path) or os.path.getsize(img_path) < 5000:
                    failed.append({'title': title, 'category': cat_match.group(1)})
    return failed

if __name__ == "__main__":
    failed_games = get_failed_games()
    print(f"Games to recover: {len(failed_games)}")
    
    for game in failed_games:
        title = game['title']
        print(f"Recovering: {title}...")
        url = deep_search_image(title, game['category'])
        if url:
            if download(url, sanitize(title) + ".jpg"):
                print(f"  [RECOVERED] {title}")
            else:
                print(f"  [STILL FAILED] {title}")
        time.sleep(1) # Be gentle to the server

    print("Recovery Process Complete.")
