import os
import json
import re

console_ts_path = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\src\data\games\console.ts'
images_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\public\images\games'
output_json = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\scratch\missing_console_games.json'

def get_console_games():
    with open(console_ts_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    match = re.search(r'export const CONSOLE_GAMES: GameHistoryItem\[\] = \[(.*?)\];', content, re.DOTALL)
    if not match:
        return []
    
    array_content = match.group(1)
    games = []
    # Using a more robust split for the TS objects
    items = re.findall(r'\{(.*?)\}', array_content, re.DOTALL)
    for item in items:
        # Extract title and image manually to avoid JSON parse errors with trailing commas etc
        title_m = re.search(r'"title":\s*"(.*?)"', item)
        image_m = re.search(r'"image":\s*"(.*?)"', item)
        if title_m and image_m:
            games.append({
                "title": title_m.group(1),
                "image_path": image_m.group(1),
                "filename": os.path.basename(image_m.group(1))
            })
    return games

def main():
    games = get_console_games()
    existing_images = os.listdir(images_dir)
    
    missing = []
    for game in games:
        if game['filename'] not in existing_images:
            missing.append(game)
            
    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump(missing, f, ensure_ascii=False, indent=2)
    
    print(f"Found {len(missing)} missing console games. List saved to {output_json}")

if __name__ == '__main__':
    main()
