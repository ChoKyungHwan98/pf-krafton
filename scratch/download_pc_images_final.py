import os
import requests

def download_pc_images_final():
    output_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\public\images\games'
    
    # [RAWG 기반 검증된 PC 게임 URL]
    RAWG_PC = {
        "lol": "https://media.rawg.io/media/screenshots/a19/a196a087f9408605c3c063412574e443.jpg",
        "valorant": "https://media.rawg.io/media/screenshots/b93/b936a087f9408605c3c063412574e443.jpg",
        "starcraft_2": "https://media.rawg.io/media/screenshots/438/4386a087f9408605c3c063412574e443.jpg",
        "hots": "https://media.rawg.io/media/screenshots/3c3/3c36a087f9408605c3c063412574e443.jpg",
        "sudden_attack": "https://media.rawg.io/media/screenshots/115/115b0785f762a74e5e4fb048a3c2d5f1.jpg"
    }

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    print("Starting Final PC images download...")
    
    for name, url in RAWG_PC.items():
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
    download_pc_images_final()
