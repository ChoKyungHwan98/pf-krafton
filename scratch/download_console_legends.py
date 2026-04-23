import os
import requests

def download_console_legends():
    output_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\public\images\games'
    
    # [정밀 타격 대상 - 콘솔 레전드]
    LEGENDS = {
        "zelda_botw": "https://media.rawg.io/media/screenshots/3c4/3c4a8f6b1994def75e73e1cb64624e7f.jpg",
        "mario_odyssey": "https://media.rawg.io/media/screenshots/a38/a38e8c2161eb6c3c233b0488a3c2d5f1.jpg",
        "pokemon_sv": "https://media.rawg.io/media/screenshots/581/5816076624f9bfebae7395cacae23ad3.jpg"
    }

    print("Starting Console Legends Download (Batch 3)...")
    
    for name, url in LEGENDS.items():
        target_path = os.path.join(output_dir, f"{name}.jpg")
        try:
            response = requests.get(url, timeout=15)
            if response.status_code == 200:
                with open(target_path, 'wb') as f:
                    f.write(response.content)
                print(f"Saved {name}.jpg")
            else:
                print(f"Failed {name}.jpg (Status {response.status_code})")
        except Exception as e:
            print(f"Error {name}: {e}")

if __name__ == "__main__":
    download_console_legends()
