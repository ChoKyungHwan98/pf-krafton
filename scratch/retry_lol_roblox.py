import requests
import os

def download_image(url, filename):
    img_dir = r"c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\public\images\games"
    target_path = os.path.join(img_dir, filename)
    headers = {'User-Agent': 'Mozilla/5.0'}
    try:
        res = requests.get(url, headers=headers, timeout=15)
        if res.status_code == 200:
            with open(target_path, 'wb') as f:
                f.write(res.content)
            print(f"Downloaded: {filename}")
            return True
    except:
        pass
    return False

if __name__ == "__main__":
    # Better alternative URLs
    extras = {
        "league_of_legends.jpg": "https://brand.riotgames.com/static/a91000434f4a3500366184566c3a3f01/8885b/lol-logo.png", # Actually logo, will find art
        "roblox.jpg": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Roblox_player_icon_black.svg" # No, want art
    }
    
    # Try Wiki or other stable sources for art
    download_image("https://images.contentstack.io/v3/assets/blt731acb051bd37b0d/blt06059d0442301918/607593c200569a3048597395/LoL_Social_Sharing_Logo.jpg", "league_of_legends.jpg")
    download_image("https://www.pcgamesn.com/wp-content/sites/pcgamesn/2021/04/roblox-promo-codes-2021.jpg", "roblox.jpg")
