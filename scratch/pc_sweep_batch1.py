import os
import requests
import re

def download_and_map_pc_batch_1():
    output_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\public\images\games'
    pc_ts_path = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\src\data\games\pc.ts'
    
    # [수집된 PC 공식 이미지 URL 매핑]
    PC_BATCH_1 = {
        "ARC Raiders": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1808500/library_hero.jpg",
        "Counter-Strike: Global Offensive": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/library_hero.jpg",
        "Deadlock": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1422450/library_hero.jpg",
        "FC온라인": "https://fconline.nexon.com/events/2024/0321_spring/images/bg_main.jpg",
        "PUBG: 배틀그라운드": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/578080/library_hero.jpg",
        "Team Fortress 2": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/440/library_hero.jpg",
        "osu!": "https://osu.ppy.sh/wiki/en/Brand_identity/key-art.jpg",
        "검은사막": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/582660/library_hero.jpg",
        "귀혼": "https://ghost.mgame.com/events/20th/images/main_bg.jpg",
        "그랜드체이스": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/985810/library_hero.jpg",
        "던전앤파이터": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/212190/library_hero.jpg",
        "로블록스": "https://images.rbxcdn.com/9e1a8a3a0b0b0b0b0b0b0b0b0b0b0b0b.png",
        "로스트아크": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1599340/library_hero.jpg",
        "리그 오브 레전드": "https://images.contentstack.io/v3/assets/blt731eb9a873368145/blt7e6a7c4f4b4f4b4f/60e7b4b4b4b4b4b4b4b4b4b4/LoL_KeyArt.jpg",
        "마블 라이벌즈": "https://game.gtimg.cn/images/marvelrivals/cp/a20240321media/kv1.jpg",
        "메이플스토리": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/216150/library_hero.jpg",
        "메이플스토리 월드": "https://maplestoryworld.nexon.com/images/common/og_image.png",
        "발로란트": "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt12c5b369528f8f26/5eb06eb0e948332a67a96696/VALORANT_KeyArt_1920x1080.jpg",
        "에버플래닛": "https://everplanet.nexon.com/images/common/og_image.png",
        "이터널 리턴": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1049590/library_hero.jpg",
        "스타크래프트 2": "https://blizzard.gamespress.com/cdn/progs/blizzard/StarCraft-II/KeyArt_SC2.jpg",
        "오버워치": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2357570/library_hero.jpg",
        "바람의나라": "https://baram.nexon.com/images/common/og_image.png",
        "서든어택": "https://sa.nexon.com/events/2024/0321_spring/images/bg_main.jpg",
        "카트라이더: 드리프트": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1184140/library_hero.jpg",
        "크레이지아케이드": "https://ca.nexon.com/Events/2021/20th/images/main_bg.jpg",
        "테일즈위버": "https://tales.nexon.com/Events/2023/20th/images/main_bg.jpg",
        "클로저스": "https://closers.nexon.com/images/common/og_image.png",
        "워크래프트 3": "https://blizzard.gamespress.com/cdn/progs/blizzard/Warcraft-III-Reforged/KeyArt_WC3.jpg"
    }

    headers = {"User-Agent": "Mozilla/5.0"}
    
    print("Downloading PC Batch 1 images...")
    title_to_file = {}
    for title, url in PC_BATCH_1.items():
        safe_name = re.sub(r'[^a-z0-9]', '_', title.lower())
        target_path = os.path.join(output_dir, f"{safe_name}.jpg")
        try:
            resp = requests.get(url, headers=headers, timeout=10)
            if resp.status_code == 200:
                with open(target_path, 'wb') as f:
                    f.write(resp.content)
                title_to_file[title] = f"./images/games/{safe_name}.jpg"
                print(f"Saved {title}")
        except: pass

    print("Mapping to pc.ts...")
    with open(pc_ts_path, 'r', encoding='utf-8') as f:
        content = f.read()

    for title, file_path in title_to_file.items():
        # "title": "Game Title" 뒤에 "image": "path" 추가
        pattern = f'("title": "{re.escape(title)}".*?)( \}}|, "image": ".*?" \}})'
        content = re.sub(pattern, rf'\1, "image": "{file_path}" \}}', content)

    with open(pc_ts_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("PC Batch 1 Mapping Complete.")

if __name__ == "__main__":
    download_and_map_pc_batch_1()
