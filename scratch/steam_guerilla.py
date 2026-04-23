import os
import json
import requests
import re
import time

def steam_image_guerilla():
    base_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전'
    missing_path = os.path.join(base_dir, 'scratch/missing_images.json')
    output_dir = os.path.join(base_dir, 'public/images/games')
    
    if not os.path.exists(missing_path): return
    
    with open(missing_path, 'r', encoding='utf-8') as f:
        missing = json.load(f)

    # Combined list for PC and Console
    to_search = missing['PC'] + missing['Console']
    
    headers = {"User-Agent": "Mozilla/5.0"}
    mapped_count = 0
    
    print(f"Searching Steam for {len(to_search)} titles...")
    
    for title in to_search:
        # 1. Search Steam for the game to get AppID
        # Simple search API: https://store.steampowered.com/api/storesearch/?term=[TERM]&l=english&cc=US
        try:
            search_url = f"https://store.steampowered.com/api/storesearch/?term={requests.utils.quote(title)}&l=english&cc=US"
            resp = requests.get(search_url, headers=headers, timeout=10).json()
            
            if resp.get('total') > 0:
                best_match = resp['items'][0]
                appid = best_match['id']
                img_url = f"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/{appid}/capsule_616x353.jpg"
                
                safe_name = re.sub(r'[^a-z0-9]', '_', title.lower()).strip('_')
                target_path = os.path.join(output_dir, f"{safe_name}.jpg")
                
                # Download
                img_resp = requests.get(img_url, headers=headers, timeout=10)
                if img_resp.status_code == 200:
                    with open(target_path, 'wb') as f:
                        f.write(img_resp.content)
                    
                    # Update DB (PC or Console)
                    target_file = 'src/data/games/pc.ts' if title in missing['PC'] else 'src/data/games/console.ts'
                    db_path = os.path.join(base_dir, target_file)
                    
                    with open(db_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # More robust replacement
                    pattern = rf'(\{{[^{{}}]*?"title":\s*"{re.escape(title)}"[^{{}}]*?)(\s*\}},?)'
                    replacement = rf'\1, "image": "./images/games/{safe_name}.jpg" \2'
                    content = re.sub(pattern, replacement, content, flags=re.DOTALL)
                    
                    with open(db_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    
                    mapped_count += 1
                    print(f"Mapped {title} (AppID {appid})")
            
            time.sleep(0.5) # Avoid rate limiting
        except Exception as e:
            print(f"Error searching {title}: {e}")

    print(f"Steam Guerilla Complete. Mapped {mapped_count} images.")

if __name__ == "__main__":
    steam_image_guerilla()
