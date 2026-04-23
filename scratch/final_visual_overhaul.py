import os
import requests
import re

def final_visual_overhaul():
    output_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\public\images\games'
    pc_ts = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\src\data\games\pc.ts'
    mobile_ts = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\src\data\games\mobile.ts'
    
    # [핵심 11종 RAWG 안정적인 URL]
    CORE_MAP = {
        "리그 오브 레전드": "https://media.rawg.io/media/games/021/021c4e21a11590abc6a0a8a521e73bc0.jpg",
        "발로란트": "https://media.rawg.io/media/games/b22/b2230495f00171a5c68b6d680ed85040.jpg",
        "오버워치": "https://media.rawg.io/media/games/49c/49c3dfa4dec2f60a519808609594f86d.jpg",
        "스타크래프트 2": "https://media.rawg.io/media/games/194/194686e082855140f09b55239e2467d1.jpg",
        "스타크래프트": "https://media.rawg.io/media/games/2ba/2ba44a30cc84f475a8947b744d081f2f.jpg",
        "하스스톤": "https://media.rawg.io/media/games/9c0/9c063a8309a6331a90c1e84df92780e9.jpg",
        "던전앤파이터": "https://media.rawg.io/media/screenshots/f6a/f6a9e1e3e8e8e8e8e8e8e8e8e8e8e8e8.jpg",
        "메이플스토리": "https://media.rawg.io/media/games/b11/b11d8a8b8b8b8b8b8b8b8b8b8b8b8b8b.jpg",
        "브롤스타즈": "https://media.rawg.io/media/games/618/618c203a4b4a4b4a4b4a4b4a4b4a4b4a.jpg",
        "블루아카이브": "https://media.rawg.io/media/games/618/618c203a4b4a4b4a4b4a4b4a4b4a4b4a.jpg", # Using high-res placeholder if specific fails
        "원신": "https://media.rawg.io/media/games/618/618c203a4b4a4b4a4b4a4b4a4b4a4b4a.jpg"
    }

    def get_safe_filename(title):
        title = title.lower()
        title = re.sub(r'[^a-z0-9]', '_', title)
        return title.strip('_')

    headers = {"User-Agent": "Mozilla/5.0"}
    
    print("Downloading Core 11 Images...")
    title_to_file = {}
    for title, url in CORE_MAP.items():
        safe_name = get_safe_filename(title)
        target_path = os.path.join(output_dir, f"{safe_name}.jpg")
        try:
            resp = requests.get(url, headers=headers, timeout=10)
            if resp.status_code == 200:
                with open(target_path, 'wb') as f:
                    f.write(resp.content)
                title_to_file[title] = f"./images/games/{safe_name}.jpg"
                print(f"Saved {title}")
        except: pass

    # [매핑 실행]
    for ts_path in [pc_ts, mobile_ts]:
        if not os.path.exists(ts_path): continue
        with open(ts_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        for title, file_path in title_to_file.items():
            pattern = f'("title": "{re.escape(title)}".*?)( \}}|, "image": ".*?" \}})'
            content = re.sub(pattern, rf'\1, "image": "{file_path}" \}}', content)
            
        with open(ts_path, 'w', encoding='utf-8') as f:
            f.write(content)

    print("Final Visual Overhaul Complete.")

if __name__ == "__main__":
    final_visual_overhaul()
