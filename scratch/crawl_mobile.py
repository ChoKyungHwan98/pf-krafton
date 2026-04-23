import os
import requests
import re

def crawl_mobile_images():
    output_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\public\images\games'
    mobile_ts_path = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\src\data\games\mobile.ts'
    
    # [패키지 명 매핑]
    PACKAGES = {
        "브롤스타즈": "com.supercell.brawlstars",
        "블루아카이브": "com.nexon.bluearchive",
        "원신": "com.miHoYo.GenshinImpact",
        "명일방주": "com.YoStarEN.Arknights",
        "쿠키런: 킹덤": "com.devsisters.ck",
        "클래시 로얄": "com.supercell.clashroyale",
        "클래시 오브 클랜": "com.supercell.clashofclans",
        "AFK 아레나": "com.lilithgame.hgame.gp",
        "림버스 컴퍼니": "com.ProjectMoon.LimbusCompany",
        "Pokémon GO": "com.nianticlabs.pokemongo",
        "Pokémon Sleep": "jp.pokemon.pokemonsleep",
        "Pokémon Masters EX": "com.dena.a12026418"
    }

    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"}
    
    print("Crawling Mobile Feature Graphics...")
    title_to_file = {}
    for title, pkg in PACKAGES.items():
        url = f"https://play.google.com/store/apps/details?id={pkg}"
        try:
            resp = requests.get(url, headers=headers, timeout=10)
            if resp.status_code == 200:
                # Find feature graphic URL in the page source
                # Usually it's in a meta tag or a specific img tag
                # Pattern: https://play-lh.googleusercontent.com/...=w1024-h500
                img_match = re.search(r'https://play-lh\.googleusercontent\.com/[^"\' ]+=w[0-9]+-h[0-9]+', resp.text)
                if img_match:
                    img_url = img_match.group(0).split('=')[0] + "=w1024-h500"
                    
                    safe_name = re.sub(r'[^a-z0-9]', '_', title.lower())
                    target_path = os.path.join(output_dir, f"{safe_name}.jpg")
                    
                    img_resp = requests.get(img_url, headers=headers, timeout=10)
                    if img_resp.status_code == 200:
                        with open(target_path, 'wb') as f:
                            f.write(img_resp.content)
                        title_to_file[title] = f"./images/games/{safe_name}.jpg"
                        print(f"Saved {title}")
        except Exception as e:
            print(f"Error {title}: {e}")

    print("Mapping to mobile.ts...")
    with open(mobile_ts_path, 'r', encoding='utf-8') as f:
        content = f.read()

    for title, file_path in title_to_file.items():
        pattern = f'("title": "{re.escape(title)}".*?)( \}}|, "image": ".*?" \}})'
        content = re.sub(pattern, rf'\1, "image": "{file_path}" \}}', content)

    with open(mobile_ts_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Mobile Mapping Complete.")

if __name__ == "__main__":
    crawl_mobile_images()
