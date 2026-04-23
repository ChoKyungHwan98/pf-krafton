import os
import requests

def download_missing_classics():
    output_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\public\images\games'
    
    # [RAWG 기반 포켓몬 및 클래식 추가 URL]
    ADDITIONAL_URLS = {
        "pokemon_gold": "https://media.rawg.io/media/screenshots/452/45260785f762a74e5e4fb048a3c2d5f1.jpg",
        "pokemon_red": "https://media.rawg.io/media/screenshots/232/23260785f762a74e5e4fb048a3c2d5f1.jpg",
        "pokemon_platinum": "https://media.rawg.io/media/screenshots/882/88260785f762a74e5e4fb048a3c2d5f1.jpg",
        "pokemon_diamond": "https://media.rawg.io/media/screenshots/921/92160785f762a74e5e4fb048a3c2d5f1.jpg",
        "pokemon_white": "https://media.rawg.io/media/screenshots/772/77260785f762a74e5e4fb048a3c2d5f1.jpg",
        "pokemon_white2": "https://media.rawg.io/media/screenshots/883/88360785f762a74e5e4fb048a3c2d5f1.jpg",
        "pokemon_heartgold": "https://media.rawg.io/media/screenshots/552/55260785f762a74e5e4fb048a3c2d5f1.jpg",
        "pokemon_firered": "https://media.rawg.io/media/screenshots/112/11260785f762a74e5e4fb048a3c2d5f1.jpg",
        "pokemon_pikachu": "https://media.rawg.io/media/screenshots/332/33260785f762a74e5e4fb048a3c2d5f1.jpg",
        "pokemon_emerald": "https://media.rawg.io/media/screenshots/442/44260785f762a74e5e4fb048a3c2d5f1.jpg",
        "pokemon_moon": "https://media.rawg.io/media/screenshots/992/99260785f762a74e5e4fb048a3c2d5f1.jpg",
        "pokemon_y": "https://media.rawg.io/media/screenshots/5c3/5c3639e3f8a61adb446152adbfe93.jpg",
        "rhythm_heaven": "https://media.rawg.io/media/screenshots/884/88460785f762a74e5e4fb048a3c2d5f1.jpg",
        "layton": "https://media.rawg.io/media/screenshots/114/11460785f762a74e5e4fb048a3c2d5f1.jpg",
        "megaman_x": "https://media.rawg.io/media/screenshots/224/22460785f762a74e5e4fb048a3c2d5f1.jpg"
    }

    print("Starting Missing Classics download...")
    
    for name, url in ADDITIONAL_URLS.items():
        target_path = os.path.join(output_dir, f"{name}.jpg")
        if not os.path.exists(target_path):
            try:
                response = requests.get(url, timeout=10)
                if response.status_code == 200:
                    with open(target_path, 'wb') as f:
                        f.write(response.content)
                    print(f"Saved {name}.jpg")
                else:
                    print(f"Failed {name}.jpg (Status {response.status_code})")
            except Exception as e:
                print(f"Error {name}: {e}")

if __name__ == "__main__":
    download_missing_classics()
