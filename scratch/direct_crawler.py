import os
import re
import requests
from bs4 import BeautifulSoup
from urllib.parse import quote
import concurrent.futures
import sys

# Force UTF-8 output
if sys.stdout.encoding != 'utf-8':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

BASE_DIR = r"c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전"
IMAGE_DIR = os.path.join(BASE_DIR, "public", "images", "games")
DATA_DIR = os.path.join(BASE_DIR, "src", "data", "games")

if not os.path.exists(IMAGE_DIR):
    os.makedirs(IMAGE_DIR)

def sanitize(title):
    clean = re.sub(r'[\\/*?:"<>|]', "", title)
    return clean.replace(" ", "_").replace(":", "").replace("!", "").lower()

def download(url, filename):
    try:
        path = os.path.join(IMAGE_DIR, filename)
        # Skip if already exists and looks like a real image
        if os.path.exists(path) and os.path.getsize(path) > 5000:
            return True
            
        res = requests.get(url, timeout=15, headers={'User-Agent': 'Mozilla/5.0'})
        if res.status_code == 200:
            with open(path, 'wb') as f:
                f.write(res.content)
            return True
    except:
        pass
    return False

def scrape_steam(title):
    try:
        search_url = f"https://store.steampowered.com/search/?term={quote(title)}"
        res = requests.get(search_url, timeout=15, headers={'User-Agent': 'Mozilla/5.0'})
        soup = BeautifulSoup(res.text, 'html.parser')
        
        # Find first result
        first_result = soup.select_one('a.search_result_row')
        if first_result:
            img_tag = first_result.select_one('img')
            if img_tag and 'src' in img_tag.attrs:
                img_url = img_tag['src'].split('?')[0]
                # Try to get larger capsule
                if 'capsule_sm_120' in img_url:
                    img_url = img_url.replace('capsule_sm_120', 'capsule_616x353')
                return img_url
    except:
        pass
    return None

def scrape_playstore(title):
    try:
        # Search play store (proxy search via Google or direct search if possible)
        search_url = f"https://play.google.com/store/search?q={quote(title)}&c=apps"
        res = requests.get(search_url, timeout=15, headers={'User-Agent': 'Mozilla/5.0'})
        soup = BeautifulSoup(res.text, 'html.parser')
        
        # Look for the first app link
        first_link = soup.select_one('a[href*="/store/apps/details"]')
        if first_link:
            # We would normally go deeper, but often the search page has thumbnails
            img_tag = first_link.select_one('img')
            if img_tag and 'src' in img_tag.attrs:
                return img_tag['src'].split('=')[0] # Get full res base
    except:
        pass
    return None

def process_game(game_data):
    title = game_data['title']
    category = game_data['category']
    safe_name = sanitize(title) + ".jpg"
    
    print(f"Crawling: {title}...")
    
    img_url = None
    if category in ["Pc", "Console"]:
        img_url = scrape_steam(title)
    elif category == "Mobile":
        img_url = scrape_playstore(title)
        
    if img_url:
        if download(img_url, safe_name):
            return f"[SUCCESS] {title}"
    
    return f"[FAILED] {title}"

def get_all_games():
    all_games = []
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
                all_games.append({
                    'title': title_match.group(1),
                    'category': cat_match.group(1)
                })
    return all_games

if __name__ == "__main__":
    games = get_all_games()
    print(f"Total games to process: {len(games)}")
    
    # Use ThreadPoolExecutor for faster direct downloads
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        results = list(executor.map(process_game, games))
        
    for res in results:
        if "[FAILED]" in res:
            print(res)
    
    print("Direct Scrape & Download Complete.")
