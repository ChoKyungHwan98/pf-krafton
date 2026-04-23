import os
import requests
from urllib.parse import quote

BASE_DIR = r"c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전"
IMAGE_DIR = os.path.join(BASE_DIR, "public", "images", "games")

# Specialized mapping for legacy/retro titles to ensure "Title Screens" or "Official Art"
LEGACY_MAP = {
    "메탈슬러그": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/366250/header.jpg",
    "메탈슬러그 2": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/366260/header.jpg",
    "메탈슬러그 3": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/204360/header.jpg",
    "메탈슬러그 4": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/427410/header.jpg",
    "메탈슬러그 7": "https://m.media-amazon.com/images/M/MV5BN2EyNjljNzEtNWFlMi00ZDEzLWE4MDctYmQzYzYwZjkzYmU2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    "슈퍼 마리오 64": "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1200/b_white/f_auto/q_auto/ncom/software/switch/70010000034440/e33d45e5461120286809c91638f296333c16f2c00216259d33b860b2d698e8f8",
    "슈퍼 마리오 오디세이": "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1200/b_white/f_auto/q_auto/ncom/ko_KR/games/switch/s/super-mario-odyssey-switch/hero",
    "젤다의 전설 브레스 오브 더 와일드": "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1200/b_white/f_auto/q_auto/ncom/ko_KR/games/switch/t/the-legend-of-zelda-breath-of-the-wild-switch/hero",
    "젤다의 전설 스카워드 소드": "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1200/b_white/f_auto/q_auto/ncom/ko_KR/games/switch/t/the-legend-of-zelda-skyward-sword-hd-switch/hero",
    "젤다의 전설 시간의 오카리나": "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1200/b_white/f_auto/q_auto/ncom/software/switch/70010000045053/6e64f3319036c0a006f1577953265851",
    "포켓몬스터 소드": "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1200/b_white/f_auto/q_auto/ncom/ko_KR/games/switch/p/pokemon-sword-switch/hero",
    "포켓몬스터 스칼렛": "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1200/b_white/f_auto/q_auto/ncom/ko_KR/games/switch/p/pokemon-scarlet-switch/hero",
    "닌자베이스볼배트맨": "https://www.giantbomb.com/a/uploads/scale_medium/0/2337/582313-ninja_baseball_bat_man_title.png",
    "스노우 브라더스 1": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1841360/header.jpg",
    "스노우 브라더스 2": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2424070/header.jpg"
}

def sanitize(title):
    return title.replace(" ", "_").replace(":", "").replace("!", "").lower()

for title, url in LEGACY_MAP.items():
    filename = f"{sanitize(title)}.jpg"
    path = os.path.join(IMAGE_DIR, filename)
    
    # Force redownload if it's a legacy title to ensure high quality official art
    print(f"Syncing Legacy Asset: {title}")
    try:
        res = requests.get(url, timeout=10, headers={'User-Agent': 'Mozilla/5.0'})
        if res.status_code == 200:
            with open(path, 'wb') as f:
                f.write(res.content)
            print(f"  [SUCCESS] {filename}")
    except Exception as e:
        print(f"  [ERROR] {title}: {e}")

print("Legacy Asset Sync Complete.")
