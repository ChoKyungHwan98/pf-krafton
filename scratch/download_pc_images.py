import os
import requests

def download_pc_images():
    output_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\public\images\games'
    
    # [검증된 PC 게임 고화질 URL]
    PC_URLS = {
        "lol": "https://images7.alphacoders.com/105/1054359.jpg",
        "overwatch": "https://images6.alphacoders.com/103/1037248.jpg",
        "valorant": "https://images7.alphacoders.com/108/1083901.jpg",
        "pubg": "https://images4.alphacoders.com/831/831626.jpg",
        "lost_ark": "https://images3.alphacoders.com/101/1018944.jpg",
        "black_desert": "https://images4.alphacoders.com/669/669464.jpg",
        "starcraft_2": "https://images3.alphacoders.com/131/1317765.jpg",
        "dungeon_fighter": "https://images8.alphacoders.com/513/513554.jpg",
        "maplestory": "https://www.nexon.com/maplestory/common/img/main/visual/main_visual_01.jpg",
        "fc_online": "https://media.rawg.io/media/screenshots/08b/08bca087f9408605c3c063412574e443.jpg", # Placeholder for FC
        "hots": "https://images4.alphacoders.com/611/611956.jpg",
        "kartrider_drift": "https://images.alphacoders.com/129/1297043.jpg",
        "sudden_attack": "https://media.rawg.io/media/screenshots/115/115b0785f762a74e5e4fb048a3c2d5f1.jpg"
    }

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    print("Starting PC images download...")
    
    for name, url in PC_URLS.items():
        target_path = os.path.join(output_dir, f"{name}.jpg")
        try:
            response = requests.get(url, headers=headers, timeout=15)
            if response.status_code == 200:
                with open(target_path, 'wb') as f:
                    f.write(response.content)
                print(f"Successfully saved {name}.jpg")
            else:
                print(f"Failed {name}.jpg (Status {response.status_code})")
        except Exception as e:
            print(f"Error {name}: {e}")

if __name__ == "__main__":
    download_pc_images()
