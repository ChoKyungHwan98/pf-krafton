import os
import re

def precision_map_fix():
    base_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전'
    
    # [핵심 11종 매핑 데이터]
    MAPPING = {
        "리그 오브 레전드": "./images/games/league_of_legends.jpg",
        "발로란트": "./images/games/valorant.jpg",
        "오버워치": "./images/games/overwatch.jpg",
        "스타크래프트 2": "./images/games/starcraft_2.jpg",
        "스타크래프트": "./images/games/starcraft.jpg",
        "하스스톤": "./images/games/hearthstone.jpg",
        "던전앤파이터": "./images/games/dungeon_and_fighter.jpg",
        "메이플스토리": "./images/games/maplestory.jpg",
        "브롤스타즈": "./images/games/brawl_stars.jpg",
        "블루아카이브": "./images/games/blue_archive.jpg",
        "원신": "./images/games/genshin_impact.jpg"
    }

    files = [
        os.path.join(base_dir, 'src/data/games/pc.ts'),
        os.path.join(base_dir, 'src/data/games/mobile.ts')
    ]

    for fpath in files:
        if not os.path.exists(fpath): continue
        with open(fpath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        new_lines = []
        for line in lines:
            # Fix the \ } issue first
            line = line.replace('\\}', '}')
            
            # Map images
            for title, img_path in MAPPING.items():
                if f'"title": "{title}"' in line:
                    # If image field already exists, replace it
                    if '"image":' in line:
                        line = re.sub(r'"image": ".*?"', f'"image": "{img_path}"', line)
                    else:
                        # Insert image field before the closing brace
                        line = re.sub(r'\s*\},?', f', "image": "{img_path}" }},', line)
                    break
            new_lines.append(line)
            
        with open(fpath, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)

    print("Precision Mapping and Syntax Fix Complete.")

if __name__ == "__main__":
    precision_map_fix()
