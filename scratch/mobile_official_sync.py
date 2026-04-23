import os
import requests
import re

def mobile_official_sync():
    base_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전'
    output_dir = os.path.join(base_dir, 'public/images/games')
    mobile_ts_path = os.path.join(base_dir, 'src/data/games/mobile.ts')
    
    # [방금 검색된 검증된 패키지 명]
    PACKAGES = {
        "데스티니 차일드": "com.linegames.dcglobal",
        "무기미도": "com.zygames.ptn.kr",
        "지구의 마지막 날: 생존": "zombie.survival.craft.z",
        "Pokémon GO": "com.nianticlabs.pokemongo",
        "Pokémon Sleep": "jp.pokemon.pokemonsleep",
        "Pokémon Masters EX": "com.dena.a12026418",
        "블루아카이브": "com.nexon.bluearchive",
        "명일방주": "com.YoStar.Arknights.kr",
        "쿠키런: 킹덤": "com.devsisters.ck",
        "전염병 주식회사": "com.miniclip.plagueinc",
        "AFK 아레나": "com.lilithgame.hgame.gp",
        "림버스 컴퍼니": "com.ProjectMoon.LimbusCompany",
        "붐비치": "com.supercell.boombeach",
        "스쿼드 버스터즈": "com.supercell.squad",
        "브롤스타즈": "com.supercell.brawlstars"
    }

    headers = {"User-Agent": "Mozilla/5.0"}
    title_to_file = {}
    
    print("Syncing Mobile Official Images...")
    for title, pkg in PACKAGES.items():
        # Scrape Play Store for feature graphic
        url = f"https://play.google.com/store/apps/details?id={pkg}"
        try:
            resp = requests.get(url, headers=headers, timeout=10)
            if resp.status_code == 200:
                # Direct pattern search
                match = re.search(r'https://play-lh\.googleusercontent\.com/[^"\' ]+=w[0-9]+-h[0-9]+', resp.text)
                if match:
                    img_url = match.group(0).split('=')[0] + "=w1024-h500"
                    
                    safe_name = re.sub(r'[^a-z0-9]', '_', title.lower()).strip('_')
                    target_path = os.path.join(output_dir, f"{safe_name}.jpg")
                    
                    img_resp = requests.get(img_url, headers=headers, timeout=10)
                    if img_resp.status_code == 200:
                        with open(target_path, 'wb') as f:
                            f.write(img_resp.content)
                        title_to_file[title] = f"./images/games/{safe_name}.jpg"
                        print(f"Saved {title}")
        except: pass

    # [Update Database]
    with open(mobile_ts_path, 'r', encoding='utf-8') as f:
        content = f.read()

    for title, file_path in title_to_file.items():
        # Ensure we don't have duplicates and use the correct pattern
        pattern = rf'(\{{[^{{}}]*?"title":\s*"{re.escape(title)}"[^{{}}]*?)(\s*\}},?)'
        replacement = rf'\1, "image": "{file_path}" \2'
        content = re.sub(pattern, replacement, content, flags=re.DOTALL)

    with open(mobile_ts_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Mobile Sync Complete.")

if __name__ == "__main__":
    mobile_official_sync()
