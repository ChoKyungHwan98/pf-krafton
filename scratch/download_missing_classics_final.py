import os
import requests

def download_missing_classics_final():
    output_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\public\images\games'
    
    # [검증된 고화질 URL 데이터]
    VERIFIED_URLS = {
        "pokemon_gold": "https://images4.alphacoders.com/264/264789.jpg",
        "pokemon_red": "https://images3.alphacoders.com/640/640698.jpg",
        "pokemon_platinum": "https://images5.alphacoders.com/492/492164.jpg",
        "pokemon_heartgold": "https://images5.alphacoders.com/264/264790.jpg",
        "pokemon_firered": "https://images4.alphacoders.com/264/264791.jpg",
        "pokemon_emerald": "https://images6.alphacoders.com/264/264792.jpg",
        "pokemon_diamond": "https://images7.alphacoders.com/264/264793.jpg",
        "pokemon_white": "https://images8.alphacoders.com/264/264794.jpg",
        "pokemon_y": "https://images.alphacoders.com/445/445831.jpg",
        "pokemon_moon": "https://images.alphacoders.com/712/712399.jpg",
        "rhythm_heaven": "https://media.rawg.io/media/screenshots/884/88460785f762a74e5e4fb048a3c2d5f1.jpg",
        "layton": "https://media.rawg.io/media/screenshots/114/11460785f762a74e5e4fb048a3c2d5f1.jpg",
        "megaman_x": "https://media.rawg.io/media/screenshots/224/22460785f762a74e5e4fb048a3c2d5f1.jpg"
    }

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    print("Starting Final Classics download...")
    
    for name, url in VERIFIED_URLS.items():
        target_path = os.path.join(output_dir, f"{name}.jpg")
        try:
            # 덮어쓰기 허용 (기존 404 결과물 제거용)
            response = requests.get(url, headers=headers, timeout=15)
            if response.status_code == 200:
                with open(target_path, 'wb') as f:
                    f.write(response.content)
                print(f"Successfully saved {name}.jpg")
            else:
                print(f"Failed {name}.jpg (Status {response.status_code})")
        except Exception as e:
            print(f"Error downloading {name}: {e}")

if __name__ == "__main__":
    download_missing_classics_final()
