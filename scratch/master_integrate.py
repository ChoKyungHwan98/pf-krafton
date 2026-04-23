import os
import re

def master_integrate():
    base_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전'
    img_dir = os.path.join(base_dir, 'public/images/games')
    
    files = [
        os.path.join(base_dir, 'src/data/games/pc.ts'),
        os.path.join(base_dir, 'src/data/games/mobile.ts'),
        os.path.join(base_dir, 'src/data/games/console.ts')
    ]
    
    # Get all available image filenames
    available_imgs = set(os.listdir(img_dir))
    
    def get_safe_filename(title):
        title = title.lower()
        title = re.sub(r'[^a-z0-9]', '_', title)
        title = title.strip('_')
        # Handle the Pok_mon case (re.sub turned é into _)
        # Actually, if the file is "pok_mon_go.jpg", and title is "Pokémon GO",
        # the safe name will be "pok_mon_go". Perfect.
        return title

    mapped_count = 0
    
    for fpath in files:
        if not os.path.exists(fpath): continue
        with open(fpath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        new_lines = []
        for line in lines:
            title_match = re.search(r'"title":\s*"(.*?)"', line)
            if title_match:
                title = title_match.group(1)
                safe_name = get_safe_filename(title)
                img_file = f"{safe_name}.jpg"
                
                if img_file in available_imgs:
                    # If image field missing or different, update/add it
                    img_path = f"./images/games/{img_file}"
                    if '"image":' in line:
                        line = re.sub(r'"image":\s*".*?"', f'"image": "{img_path}"', line)
                    else:
                        line = re.sub(r'\s*\},?', f', "image": "{img_path}" }},', line)
                    mapped_count += 1
            
            new_lines.append(line)
            
        with open(fpath, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)

    print(f"Master Integration Complete. Total mapped/updated: {mapped_count}")

if __name__ == "__main__":
    master_integrate()
