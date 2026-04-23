import os
import requests

def download_steam_precision():
    output_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\public\images\games'
    
    # [정밀 타격 대상 - Steam AppID]
    STEAM_BATCH = {
        "dark_souls_1": "570940",
        "dark_souls_2": "236430",
        "dark_souls_3": "374320",
        "blasphemous": "774361",
        "enshrouded": "1203620",
        "ib": "1901370",
        "inscryption": "1092790",
        "payday_2": "218620",
        "nidhogg": "94400",
        "omori": "1150690",
        "muse_dash": "774181",
        "gta_v": "271590",
        "for_honor": "304390",
        "frostpunk": "323190",
        "a_way_out": "1222700"
    }

    print("Starting Steam Precision Download (Batch 1)...")
    
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
    download_steam_precision()
