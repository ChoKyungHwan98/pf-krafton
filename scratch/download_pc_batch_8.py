import requests
import os
import re

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

def update_pc_ts(mapping):
    pc_ts = r"c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포$트폴리오-개선버전\src\data\games\pc.ts"
    # Actually fix the path - I see a typo in my thought but I'll use the correct one
    pc_ts = r"c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\src\data\games\pc.ts"
    
    with open(pc_ts, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for title, new_file in mapping.items():
        # Match both Korean and potentially existing English paths
        pattern = fr'"title": "{title}".*?"image": "\./images/games/(.*?)\.jpg"'
        content = re.sub(pattern, lambda m: m.group(0).replace(m.group(1), new_file.replace('.jpg', '')), content, flags=re.DOTALL)
    
    with open(pc_ts, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated pc.ts")

if __name__ == "__main__":
    batch = {
        "귀혼": ("https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1071420/capsule_616x353.jpg", "ghost_online.jpg"),
        "그랜드체이스": ("https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/985810/capsule_616x353.jpg", "grand_chase.jpg"),
        "던전앤파이터": ("https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/495910/capsule_616x353.jpg", "dungeon_and_fighter.jpg"),
        "로블록스": ("https://cms-assets.tutsplus.com/uploads/users/1631/posts/35832/image/Roblox-Logo.jpg", "roblox.jpg"),
        "로스트아크": ("https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1599340/capsule_616x353.jpg", "lost_ark.jpg"),
        "리그 오브 레전드": ("https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aali_0.jpg", "league_of_legends.jpg"), # Placeholder splash, will try to find better
        "마블 라이벌즈": ("https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2764370/capsule_616x353.jpg", "marvel_rivals.jpg"),
        "메이플스토리": ("https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/216150/capsule_616x353.jpg", "maplestory.jpg")
    }
    
    # Better LoL and Roblox URLs
    batch["리그 오브 레전드"] = ("https://images.contentstack.io/v3/assets/blt731acb051bd37b0d/blt06059d0442301918/607593c200569a3048597395/LoL_Social_Sharing_Logo.jpg", "league_of_legends.jpg")
    batch["로블록스"] = ("https://images.rbxcdn.com/f04c633a695d319e7a77e5d8a0110334.jpg", "roblox.jpg")

    file_mapping = {}
    for title, (url, filename) in batch.items():
        if download_image(url, filename):
            file_mapping[title] = filename
            
    update_pc_ts(file_mapping)
