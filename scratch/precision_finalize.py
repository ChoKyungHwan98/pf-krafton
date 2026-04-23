import os
import re

def precision_finalize():
    base_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전'
    img_dir = os.path.join(base_dir, 'public/images/games')
    
    # [수동 고정 매핑]
    MANUAL_MAP = {
        "Goat Simulator": "goat_simulator.jpg",
        "스노우 브라더스 1": "snow_bros_1.jpg",
        "스노우 브라더스 2": "snow_bros_2.jpg",
        "브롤스타즈": "brawl_stars.jpg",
        "블루아카이브": "blue_archive.jpg",
        "원신": "genshin_impact.jpg"
    }
    
    files = [
        os.path.join(base_dir, 'src/data/games/pc.ts'),
        os.path.join(base_dir, 'src/data/games/mobile.ts'),
        os.path.join(base_dir, 'src/data/games/console.ts')
    ]
    
    available_imgs = set(os.listdir(img_dir))
    
    def get_safe_filename(title):
        t = title.lower()
        t = re.sub(r'[^a-z0-9]', '_', t)
        return t.strip('_')

    for fpath in files:
        if not os.path.exists(fpath): continue
        with open(fpath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        new_lines = []
        for line in lines:
            title_match = re.search(r'"title":\s*"(.*?)"', line)
            if title_match:
                title = title_match.group(1)
                
                img_file = None
                if title in MANUAL_MAP:
                    img_file = MANUAL_MAP[title]
                else:
                    safe = get_safe_filename(title)
                    if safe and f"{safe}.jpg" in available_imgs:
                        img_file = f"{safe}.jpg"
                
                if img_file and img_file in available_imgs:
                    img_path = f"./images/games/{img_file}"
                    if '"image":' in line:
                        line = re.sub(r'"image":\s*".*?"', f'"image": "{img_path}"', line)
                    else:
                        line = re.sub(r'\s*\},?', f', "image": "{img_path}" }},', line)
            
            new_lines.append(line)
            
        with open(fpath, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)

    print("Final Precision Mapping Complete.")

if __name__ == "__main__":
    precision_finalize()
