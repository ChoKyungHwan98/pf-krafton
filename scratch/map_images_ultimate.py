import os
import re

def map_console_images_ultimate():
    base_path = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전'
    path = os.path.join(base_path, 'src/data/games/console.ts')
    
    # [이미지 매핑 사전 - 최종 통합]
    IMG_MAP = {
        # Steam & Major
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
        "Sid Meier's Civilization V": "/images/games/civilization_v.jpg",
        "Rust": "/images/games/rust.jpg",
        "The Forest": "/images/games/the_forest.jpg",
        "Terraria": "/images/games/terraria.jpg",
        "Spiral Knights": "/images/games/spiral_knights.jpg",
        "Muse Dash": "/images/games/muse_dash.jpg",
        "OMORI": "/images/games/omori.jpg",
        "PAYDAY 2": "/images/games/payday_2.jpg",
        "DJMAX RESPECT V": "/images/games/djmax_respect_v.jpg",
        "Danganronpa 2: Goodbye Despair": "/images/games/danganronpa_2.jpg",
        "Danganronpa V3: Killing Harmony": "/images/games/danganronpa_v3.jpg",
        "Danganronpa: Trigger Happy Havoc": "/images/games/danganronpa_1.jpg",
        "Frostpunk": "/images/games/frostpunk.jpg",
        "For Honor": "/images/games/for_honor.jpg",
        "GTA V": "/images/games/gta_v.jpg",
        "Helldivers 2": "/images/games/helldivers_2.jpg",
        "Lethal Company": "/images/games/lethal_company.jpg",
        "V Rising": "/images/games/v_rising.jpg",
        "Borderlands 2": "/images/games/borderlands_2.jpg",
        "Borderlands 3": "/images/games/borderlands_3.jpg",
        # Arcade & Fighting
        "철권 7": "/images/games/tekken_7.jpg",
        "더 킹 오브 파이터즈 XV": "/images/games/kof_xv.jpg",
        "킹 오브 파이터즈 98": "/images/games/kof_98.jpg",
        "메탈슬러그": "/images/games/metal_slug_1.jpg",
        "메탈슬러그 2": "/images/games/metal_slug_2.jpg",
        "메탈슬러그 3": "/images/games/metal_slug_3.jpg",
        "메타포: 리판타지오": "/images/games/metaphor.jpg",
        # Nintendo
        "젤다의 전설 브레스 오브 더 와일드": "/images/games/zelda_botw.jpg",
        "젤다의 전설 스카워드 소드": "/images/games/zelda_skyward.jpg",
        "젤다의 전설 시간의 오카리나": "/images/games/zelda_ocarina.jpg",
        "슈퍼 마리오 오디세이": "/images/games/mario_odyssey.jpg",
        "슈퍼 마리오 64": "/images/games/mario_64.jpg",
        "포켓몬스터 스칼렛": "/images/games/pokemon_sv.jpg",
        "포켓몬스터 소드": "/images/games/pokemon_ss.jpg",
        "놀러오세요 동물의 숲": "/images/games/animal_crossing.jpg"
    }

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
                    # 기존 image 필드 제거 (정규식 사용)
                    line = re.sub(r', "image": ".*?"', '', line)
                    line = line.replace(' }', f', "image": "{img_path}" }}')
            new_lines.append(line)
        else:
            new_lines.append(line)

    with open(path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)

    print("Ultimate Console Image Mapping Complete.")

if __name__ == "__main__":
    map_console_images_ultimate()
