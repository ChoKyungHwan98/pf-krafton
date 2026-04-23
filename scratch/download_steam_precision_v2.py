import os
import requests

def download_steam_precision_batch_2():
    output_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\public\images\games'
    
    # [정밀 타격 대상 - Steam AppID]
    STEAM_BATCH = {
        "dnf_duel": "1422450",
        "snow_bros_2": "2702010",
        "snow_bros_original": "1801260",
        "danganronpa_1": "413410",
        "danganronpa_2": "413420",
        "danganronpa_v3": "567640",
        "borderlands_2": "49520",
        "borderlands_3": "397540",
        "lethal_company": "1966720",
        "helldivers_2": "553850",
        "v_rising": "1604030",
        "cyberpunk_2077": "1091500"
    }

    print("Starting Steam Precision Download (Batch 2)...")
    
    for name, appid in STEAM_BATCH.items():
        url = f"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/{appid}/capsule_616x353.jpg"
        target_path = os.path.join(output_dir, f"{name}.jpg")
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
    download_steam_precision_batch_2()
