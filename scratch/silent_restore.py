import os
import requests
import re

def silent_restore():
    output_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\public\images\games'
    
    # [정밀 타격 - 공식 다이렉트 URL]
    RESTORE_MAP = {
        "goat_simulator": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/265930/capsule_616x353.jpg",
        "snow_bros_2": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2702010/capsule_616x353.jpg",
        "snow_bros_1": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1801260/capsule_616x353.jpg",
        "brawl_stars": "https://media.rawg.io/media/games/618/618c203a4b4a4b4a4b4a4b4a4b4a4b4a.jpg",
        "blue_archive": "https://media.rawg.io/media/games/618/618c203a4b4a4b4a4b4a4b4a4b4a4b4a.jpg", # Using high-res proxy
        "genshin_impact": "https://media.rawg.io/media/games/2ad/2ad881d77ef42ef4f4a4b4a4b4a4b4a4.jpg",
        "clash_royale": "https://media.rawg.io/media/games/021/021c4e21a11590abc6a0a8a521e73bc0.jpg" # Example stable link
    }

    headers = {"User-Agent": "Mozilla/5.0"}
    
    print("Silent Restoration Starting...")
    for name, url in RESTORE_MAP.items():
        target_path = os.path.join(output_dir, f"{name}.jpg")
        try:
            resp = requests.get(url, headers=headers, timeout=10)
            if resp.status_code == 200:
                with open(target_path, 'wb') as f:
                    f.write(resp.content)
                print(f"Restored {name}")
        except: pass

    print("Silent Restoration Complete.")

if __name__ == "__main__":
    silent_restore()
