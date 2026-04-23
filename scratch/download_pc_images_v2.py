import os
import requests

def download_pc_images_v2():
    output_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\public\images\games'
    
    # [Steam AppID 기반 - 고화질 캡슐]
    STEAM_PC = {
        "pubg": "578080",
        "lost_ark": "1599340",
        "black_desert": "582660",
        "dungeon_fighter": "495910",
        "maplestory": "216150",
        "kartrider_drift": "1184140",
        "overwatch": "2357570"
    }

    # [공식 CDN/검증된 URL 기반]
    DIRECT_PC = {
        "lol": "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt783685e13589b940/5eb26d2e07174e30018a994c/ss_f192b10495f4e15f8a0029b359f5187e1f4094e0.jpg", # LoL Official
        "valorant": "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltb9067b45f1b5f639/5eb26f3001f31f1396a84f3e/ss_0267c76840d21659a997970d47345f06168e390c.jpg", # Valorant Official
        "starcraft_2": "https://static.wikia.nocookie.net/starcraft/images/2/20/StarCraft_II_Legacy_of_the_Void_cinematic_landscape.jpg",
        "fc_online": "https://media.rawg.io/media/screenshots/08b/08bca087f9408605c3c063412574e443.jpg",
        "hots": "https://static.wikia.nocookie.net/heroesofthestorm/images/e/e9/Heroes_of_the_Storm_Cinematic_Art.jpg"
    }

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    print("Starting PC images download v2...")
    
    # Steam
    for name, appid in STEAM_PC.items():
        url = f"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/{appid}/capsule_616x353.jpg"
        target_path = os.path.join(output_dir, f"{name}.jpg")
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                with open(target_path, 'wb') as f:
                    f.write(response.content)
                print(f"Saved {name}.jpg (Steam)")
        except: pass

    # Direct
    for name, url in DIRECT_PC.items():
        target_path = os.path.join(output_dir, f"{name}.jpg")
        try:
            response = requests.get(url, headers=headers, timeout=15)
            if response.status_code == 200:
                with open(target_path, 'wb') as f:
                    f.write(response.content)
                print(f"Saved {name}.jpg (Direct)")
            else:
                print(f"Failed {name}.jpg (Status {response.status_code})")
        except: pass

if __name__ == "__main__":
    download_pc_images_v2()
