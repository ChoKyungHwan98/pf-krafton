import os
import requests

def download_remastered_key_arts():
    output_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\public\images\games'
    
    # [방금 찾아낸 검증된 공식 키 아트 URL]
    REMASTER_URLS = {
        "muse_dash": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/774171/capsule_616x353.jpg",
        "metaphor": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2679460/capsule_616x353.jpg",
        "animal_crossing": "https://picfiles.alphacoders.com/190/thumb-1920-19051.jpg",
        "metal_slug_3": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/250180/capsule_616x353.jpg",
        "mario_64": "https://images.alphacoders.com/681/681347.jpg",
        "mario_odyssey": "https://images.alphacoders.com/865/865483.jpg",
        "zelda_ocarina": "https://images.alphacoders.com/226/226759.jpg",
        "zelda_botw": "https://i.redd.it/9n05b6u1o34x.jpg",
        "zelda_skyward": "https://images.alphacoders.com/137/137647.jpg",
        "pokemon_ss": "https://images.alphacoders.com/106/1060625.jpg",
        "pokemon_sv": "https://images.alphacoders.com/122/1223559.jpg"
    }

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    print("Starting Remastered Key Art download...")
    
    for name, url in REMASTER_URLS.items():
        target_path = os.path.join(output_dir, f"{name}.jpg")
        try:
            # 기존 이미지 삭제 후 재다운로드
            if os.path.exists(target_path):
                os.remove(target_path)
                
            response = requests.get(url, headers=headers, timeout=15)
            if response.status_code == 200:
                with open(target_path, 'wb') as f:
                    f.write(response.content)
                print(f"Successfully remastered {name}.jpg")
            else:
                print(f"Failed {name}.jpg (Status {response.status_code})")
        except Exception as e:
            print(f"Error {name}: {e}")

if __name__ == "__main__":
    download_remastered_key_arts()
