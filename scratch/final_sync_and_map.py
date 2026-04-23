import os
import requests
import re

def final_sync_and_map():
    output_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\public\images\games'
    path = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\src\data\games\console.ts'

    # [마지막 정밀 타격 - Top Items]
    TOP_ITEMS = {
        "among_us": "945360",
        "elden_ring": "1245620"
    }

    print("Downloading top items...")
    for name, appid in TOP_ITEMS.items():
        url = f"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/{appid}/capsule_616x353.jpg"
        target_path = os.path.join(output_dir, f"{name}.jpg")
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                with open(target_path, 'wb') as f:
                    f.write(response.content)
                print(f"Saved {name}.jpg")
        except: pass

    # [전체 매핑 사전]
    IMG_MAP = {
        "Among Us": "/images/games/among_us.jpg",
        "엘든 링": "/images/games/elden_ring.jpg",
        "DARK SOULS: REMASTERED": "/images/games/dark_souls_1.jpg",
        "DARK SOULS II": "/images/games/dark_souls_2.jpg",
        "DARK SOULS III": "/images/games/dark_souls_3.jpg",
        "젤다의 전설 브레스 오브 더 와일드": "/images/games/zelda_botw.jpg",
        "슈퍼 마리오 오디세이": "/images/games/mario_odyssey.jpg",
        "포켓몬스터 스칼렛": "/images/games/pokemon_sv.jpg",
        "Blasphemous": "/images/games/blasphemous.jpg",
        "Enshrouded": "/images/games/enshrouded.jpg",
        "Ib": "/images/games/ib.jpg",
        "Inscryption": "/images/games/inscryption.jpg",
        "PAYDAY 2": "/images/games/payday_2.jpg",
        "Nidhogg": "/images/games/nidhogg.jpg",
        "OMORI": "/images/games/omori.jpg",
        "Muse Dash": "/images/games/muse_dash.jpg",
        "GTA V": "/images/games/gta_v.jpg",
        "For Honor": "/images/games/for_honor.jpg",
        "Frostpunk": "/images/games/frostpunk.jpg",
        "A Way Out": "/images/games/a_way_out.jpg",
        "Snow Bros. 2: With New Elves": "/images/games/snow_bros_2.jpg",
        "Danganronpa: Trigger Happy Havoc": "/images/games/danganronpa_1.jpg",
        "Danganronpa 2: Goodbye Despair": "/images/games/danganronpa_2.jpg",
        "Danganronpa V3: Killing Harmony": "/images/games/danganronpa_v3.jpg",
        "Borderlands 2": "/images/games/borderlands_2.jpg",
        "Borderlands 3": "/images/games/borderlands_3.jpg",
        "Lethal Company": "/images/games/lethal_company.jpg",
        "Helldivers 2": "/images/games/helldivers_2.jpg",
        "V Rising": "/images/games/v_rising.jpg",
        "Cyberpunk 2077": "/images/games/cyberpunk_2077.jpg"
    }

    print("Mapping to database...")
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    for line in lines:
        if '"id": "console-' in line:
            # 타이틀 추출
            title_match = re.search(r'"title": "(.*?)"', line)
            if title_match:
                title = title_match.group(1)
                if title in IMG_MAP:
                    img_path = IMG_MAP[title]
                    # 이미지 필드 교체 또는 추가
                    if '"image":' in line:
                        line = re.sub(r', "image": ".*?"', f', "image": "{img_path}"', line)
                    else:
                        line = line.replace(' }', f', "image": "{img_path}" }}')
            new_lines.append(line)
        else:
            new_lines.append(line)

    with open(path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)

    print("Final Sync and Mapping Complete.")

if __name__ == "__main__":
    final_sync_and_map()
