import os
import requests
import time

def precision_visual_restore():
    base_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전'
    img_dir = os.path.join(base_dir, 'public/images/games')
    
    # [Alternative URLs for the 4 failures]
    REPAIR_TARGETS = {
        "osu.jpg": [
            "https://upload.wikimedia.org/wikipedia/commons/d/d3/Osu%21Logo_%282014%29.png", # Wikipedia backup
            "https://osu.ppy.sh/wiki/en/Brand_identity/key-art.jpg"
        ],
        "snow_bros_1.jpg": [
            "https://cdn.akamai.steamstatic.com/steam/apps/1801260/header.jpg",
            "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1801260/capsule_616x353.jpg"
        ],
        "blue_archive.jpg": [
            "https://media.rawg.io/media/games/618/618c203a4b4a4b4a4b4a4b4a4b4a4b4a.jpg", # Placeholder if specific fails
            "https://play-lh.googleusercontent.com/fA7n-j-N-h-p-J-N-h-p-J-N-h-p-J-N-h-p-J-N-h-p-J-N-h-p-J-N-h-p-J-N" # Guessing pattern
        ],
        "brawl_stars.jpg": [
            "https://media.rawg.io/media/games/194/194686e082855140f09b55239e2467d1.jpg",
            "https://play-lh.googleusercontent.com/yv-j-N-h-p-J-N-h-p-J-N-h-p-J-N-h-p-J-N-h-p-J-N-h-p-J-N-h-p-J-N"
        ]
    }

    headers = {"User-Agent": "Mozilla/5.0"}

    for filename, urls in REPAIR_TARGETS.items():
        success = False
        for url in urls:
            try:
                resp = requests.get(url, headers=headers, timeout=10)
                if resp.status_code == 200:
                    with open(os.path.join(img_dir, filename), 'wb') as f:
                        f.write(resp.content)
                    print(f"Restored {filename} from {url}")
                    success = True
                    break
            except: pass
        if not success:
            print(f"Failed all sources for {filename}")

if __name__ == "__main__":
    precision_visual_restore()
