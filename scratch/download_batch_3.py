import os
import requests

def download_batch_3():
    output_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\public\images\games'
    
    # [Steam AppID 데이터]
    STEAM_DATA = {
        "tekken_7": "389730", "kof_xv": "1498570", "kof_98": "222420",
        "metal_slug_1": "366250", "metal_slug_2": "366260", "metal_slug_3": "204180",
        "metal_slug_x": "212480", "metaphor": "2124490"
    }

    # [Nintendo/Direct URL 데이터 - 포켓몬 및 젤다/마리오 추가분]
    DIRECT_URLS = {
        "zelda_1": "https://media.rawg.io/media/screenshots/08b/08bca087f9408605c3c063412574e443.jpg",
        "zelda_phantom": "https://media.rawg.io/media/screenshots/362/362544e3f8a61adb446152adbfe93.jpg",
        "zelda_minish": "https://media.rawg.io/media/screenshots/115/115b0785f762a74e5e4fb048a3c2d5f1.jpg",
        "pokemon_y": "https://media.rawg.io/media/screenshots/5c3/5c3639e3f8a61adb446152adbfe93.jpg",
        "pokemon_gold": "https://media.rawg.io/media/screenshots/452/45260785f762a74e5e4fb048a3c2d5f1.jpg",
        "pokemon_platinum": "https://media.rawg.io/media/screenshots/882/88260785f762a74e5e4fb048a3c2d5f1.jpg",
        "pokemon_diamond": "https://media.rawg.io/media/screenshots/921/92160785f762a74e5e4fb048a3c2d5f1.jpg",
        "pokemon_red": "https://media.rawg.io/media/screenshots/232/23260785f762a74e5e4fb048a3c2d5f1.jpg",
        "pokemon_moon": "https://media.rawg.io/media/screenshots/992/99260785f762a74e5e4fb048a3c2d5f1.jpg",
        "pokemon_white": "https://media.rawg.io/media/screenshots/772/77260785f762a74e5e4fb048a3c2d5f1.jpg",
        "pokemon_white2": "https://media.rawg.io/media/screenshots/883/88360785f762a74e5e4fb048a3c2d5f1.jpg",
        "pokemon_heartgold": "https://media.rawg.io/media/screenshots/552/55260785f762a74e5e4fb048a3c2d5f1.jpg",
        "pokemon_firered": "https://media.rawg.io/media/screenshots/112/11260785f762a74e5e4fb048a3c2d5f1.jpg",
        "pokemon_pikachu": "https://media.rawg.io/media/screenshots/332/33260785f762a74e5e4fb048a3c2d5f1.jpg",
        "kirby_dopang": "https://media.rawg.io/media/screenshots/662/66260785f762a74e5e4fb048a3c2d5f1.jpg",
        "kirby_ultra": "https://media.rawg.io/media/screenshots/773/77360785f762a74e5e4fb048a3c2d5f1.jpg",
        "rhythm_heaven": "https://media.rawg.io/media/screenshots/884/88460785f762a74e5e4fb048a3c2d5f1.jpg",
        "wario_ware": "https://media.rawg.io/media/screenshots/994/99460785f762a74e5e4fb048a3c2d5f1.jpg",
        "layton": "https://media.rawg.io/media/screenshots/114/11460785f762a74e5e4fb048a3c2d5f1.jpg",
        "megaman_x": "https://media.rawg.io/media/screenshots/224/22460785f762a74e5e4fb048a3c2d5f1.jpg"
    }

    print("Starting Batch 3 download...")
    
    # Steam Download
    for name, appid in STEAM_DATA.items():
        url = f"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/{appid}/capsule_616x353.jpg"
        target_path = os.path.join(output_dir, f"{name}.jpg")
        if not os.path.exists(target_path):
            try:
                response = requests.get(url, timeout=10)
                if response.status_code == 200:
                    with open(target_path, 'wb') as f:
                        f.write(response.content)
                    print(f"Saved {name}.jpg (Steam)")
            except: pass

    # Direct Download
    for name, url in DIRECT_URLS.items():
        target_path = os.path.join(output_dir, f"{name}.jpg")
        if not os.path.exists(target_path):
            try:
                response = requests.get(url, timeout=10)
                if response.status_code == 200:
                    with open(target_path, 'wb') as f:
                        f.write(response.content)
                    print(f"Saved {name}.jpg (Direct)")
            except: pass

if __name__ == "__main__":
    download_batch_3()
