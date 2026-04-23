import os
import requests

def download_steam_images():
    output_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\public\images\games'
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # [AppID 매핑 데이터]
    STEAM_DATA = {
        "among_us": "945360",
        "elden_ring": "1245620",
        "kingdom_come_2": "1771300",
        "legend_of_mortal": "1859910",
        "pvz": "3590",
        "hollow_knight": "367520",
        "slay_the_spire": "646570",
        "vampire_survivors": "1794680",
        "portal_2": "620",
        "l4d2": "550",
        "sanabi": "1562700",
        "papers_please": "239030",
        "undertale": "391540",
        "katana_zero": "460950",
        "goose_goose_duck": "1568590",
        "goat_simulator": "265990",
        "lies_of_p": "1627720",
        "sekiro": "814380",
        "palworld": "1623730",
        "baldurs_gate_3": "1086940",
        "cyberpunk_2077": "1091500",
        "monster_hunter_world": "582010",
        "civilization_v": "8930"
    }

    print(f"Starting download to: {output_dir}")
    
    for name, appid in STEAM_DATA.items():
        url = f"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/{appid}/capsule_616x353.jpg"
        target_path = os.path.join(output_dir, f"{name}.jpg")
        
        try:
            print(f"Downloading {name} (AppID: {appid})...")
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                with open(target_path, 'wb') as f:
                    f.write(response.content)
                print(f"Successfully saved {name}.jpg")
            else:
                print(f"Failed to download {name} (Status: {response.status_code})")
        except Exception as e:
            print(f"Error downloading {name}: {e}")

if __name__ == "__main__":
    download_steam_images()
