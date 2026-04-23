import os

def map_console_images():
    base_path = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전'
    path = os.path.join(base_path, 'src/data/games/console.ts')
    
    # [이미지 매핑 사전]
    IMG_MAP = {
        "Among Us": "/images/games/among_us.jpg",
        "엘든 링": "/images/games/elden_ring.jpg",
        "Kingdom Come: Deliverance II": "/images/games/kingdom_come_2.jpg",
        "활협전": "/images/games/legend_of_mortal.jpg",
        "Plants vs. Zombies": "/images/games/pvz.jpg",
        "Hollow Knight": "/images/games/hollow_knight.jpg",
        "Slay the Spire": "/images/games/slay_the_spire.jpg",
        "Vampire Survivors": "/images/games/vampire_survivors.jpg",
        "Portal 2": "/images/games/portal_2.jpg",
        "Left 4 Dead 2": "/images/games/l4d2.jpg",
        "산나비": "/images/games/sanabi.jpg",
        "Papers, Please": "/images/games/papers_please.jpg",
        "Undertale": "/images/games/undertale.jpg",
        "Katana ZERO": "/images/games/katana_zero.jpg",
        "Goose Goose Duck": "/images/games/goose_goose_duck.jpg",
        "Goat Simulator": "/images/games/goat_simulator.jpg",
        "P의 거짓": "/images/games/lies_of_p.jpg",
        "SEKIRO: SHADOWS DIE TWICE": "/images/games/sekiro.jpg",
        "Palworld": "/images/games/palworld.jpg",
        "Baldur's Gate 3": "/images/games/baldurs_gate_3.jpg",
        "Cyberpunk 2077": "/images/games/cyberpunk_2077.jpg",
        "몬스터 헌터: 월드": "/images/games/monster_hunter_world.jpg",
        "Sid Meier's Civilization V": "/images/games/civilization_v.jpg"
    }

    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    for line in lines:
        if '"id": "console-' in line:
            # 타이틀 추출
            title_part = line.split('"title": "')[1].split('"')[0]
            if title_part in IMG_MAP:
                img_path = IMG_MAP[title_part]
                # 이미지 필드 추가 (기존에 없을 경우)
                if '"image":' not in line:
                    line = line.replace(' }', f', "image": "{img_path}" }}')
            new_lines.append(line)
        else:
            new_lines.append(line)

    with open(path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)

    print("Console Image Mapping Complete.")

if __name__ == "__main__":
    map_console_images()
