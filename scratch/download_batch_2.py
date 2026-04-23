import os
import requests

def download_batch_2():
    output_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\public\images\games'
    
    # [Steam AppID 데이터]
    STEAM_DATA = {
        "rust": "252490", "the_forest": "242760", "terraria": "105600", "spiral_knights": "99900",
        "muse_dash": "774181", "omori": "1150690", "payday_2": "218620", "djmax_respect_v": "960170",
        "danganronpa_1": "413410", "danganronpa_2": "413420", "danganronpa_v3": "567640",
        "frostpunk": "323190", "for_honor": "304390", "gta_v": "271590", "helldivers_2": "553850",
        "lethal_company": "1966720", "v_rising": "1604030", "borderlands_2": "49520", "borderlands_3": "397540"
    }

    # [Nintendo/Direct URL 데이터]
    DIRECT_URLS = {
        "zelda_botw": "https://media.rawg.io/media/screenshots/3c4/3c4a8f6b1994def75e73e1cb64624e7f.jpg",
        "zelda_skyward": "https://media.rawg.io/media/screenshots/135/135535ee17029445286f19f25b875a3c.jpg",
        "zelda_ocarina": "https://media.rawg.io/media/screenshots/aff/aff922f4dfbc562ab31b5b924adbfe93.jpg",
        "mario_odyssey": "https://media.rawg.io/media/screenshots/a38/a38e8c2161eb6c3c233b0488a3c2d5f1.jpg",
        "mario_64": "https://media.rawg.io/media/screenshots/935/935f6b91408417d45f508ead25a2a720.jpg",
        "pokemon_sv": "https://media.rawg.io/media/screenshots/581/5816076624f9bfebae7395cacae23ad3.jpg",
        "pokemon_ss": "https://media.rawg.io/media/screenshots/a4c/a4c6d591c61e6cc9fc67581fceab23ad.jpg",
        "animal_crossing": "https://media.rawg.io/media/screenshots/9a4/9a4d01a14309324d83d34918582c6af4.jpg"
    }

    print("Starting Batch 2 download...")
    
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
    download_batch_2()
