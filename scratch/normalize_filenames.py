import os
import json
import re

def to_snake_case(text):
    # Basic snake_case conversion for known games
    mapping = {
        "시벌리: 미디벌 워페어": "chivalry_medieval_warfare",
        "스노우 브라더스 1": "snow_bros_1",
        "스노우 브라더스 2": "snow_bros_2",
        "엘더스크롤 5: 스카이림": "skyrim",
        "역전재판 1": "ace_attorney_1",
        "역전재판 2": "ace_attorney_2",
        "역전재판 3": "ace_attorney_3",
        "역전재판 4": "ace_attorney_4",
        "역전검사 1": "miles_edgeworth_1",
        "오리와 눈먼 숲": "ori_and_the_blind_forest",
        "오리와 도깨비불": "ori_and_the_will_of_the_wisps",
        "철권 7": "tekken_7",
        "킹 오브 파이터즈 98": "kof_98",
        "킹덤컴 2": "kingdom_come_2",
        "팀파이트 매니저": "teamfight_manager",
        "펜티먼트": "pentiment",
        "DNF 듀얼": "dnf_duel",
        "P의 거짓": "lies_of_p",
        "Refind Self: 성격 진단 게임": "refind_self",
        "귀곡팔황": "tale_of_immortal",
        "기적의 분식집": "miracle_snack_shop",
        "대역전재판 -나루호도 류노스케의 모험-": "the_great_ace_attorney_1",
        "대역전재판2 -나루호도 류노스케의 각오-": "the_great_ace_attorney_2",
        "더 킹 오브 파이터즈 XV": "kof_xv",
        "동방홍룡동 ~ Unconnected Marketeers.": "touhou_18",
        "라이프 이즈 퓨달: MMO": "life_is_feudal_mmo",
        "렐름 오브 더 매드 갓": "rotmg",
        "스크리블너츠 언마스크드": "scribblenauts_unmasked",
        "스포어": "spore",
        "썸썸편의점": "some_some_convenience_store"
    }
    
    if text in mapping:
        return mapping[text]
    
    # Generic conversion
    res = text.lower()
    res = re.sub(r'[^a-z0-9\s]', '', res)
    res = res.replace(' ', '_')
    return res

def rename_and_update():
    base_path = r"c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전"
    img_dir = os.path.join(base_path, "public", "images", "games")
    data_dir = os.path.join(base_path, "src", "data", "games")
    
    # Scan console.ts
    console_ts = os.path.join(data_dir, "console.ts")
    with open(console_ts, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all image paths
    matches = re.findall(r'"title": "(.*?)".*?"image": "\./images/games/(.*?)\.jpg"', content, re.DOTALL)
    
    for title, old_filename in matches:
        new_filename = to_snake_case(title)
        if old_filename != new_filename:
            old_path = os.path.join(img_dir, old_filename + ".jpg")
            new_path = os.path.join(img_dir, new_filename + ".jpg")
            
            # Rename physical file if it exists
            if os.path.exists(old_path):
                print(f"Renaming {old_filename} -> {new_filename}")
                if os.path.exists(new_path):
                    os.remove(new_path)
                os.rename(old_path, new_path)
            
            # Update code
            content = content.replace(f'./images/games/{old_filename}.jpg', f'./images/games/{new_filename}.jpg')
    
    with open(console_ts, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated console.ts")

if __name__ == "__main__":
    rename_and_update()
