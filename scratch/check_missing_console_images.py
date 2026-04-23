import os
import json
import re

console_ts_path = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\src\data\games\console.ts'
images_dir = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\public\images\games'

def get_console_games():
    with open(console_ts_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract the array content using regex
    match = re.search(r'export const CONSOLE_GAMES: GameHistoryItem\[\] = \[(.*?)\];', content, re.DOTALL)
    if not match:
        print("Could not find CONSOLE_GAMES array")
        return []
    
    array_content = match.group(1)
    # Simple regex to find objects. This is a bit fragile but should work for this structure.
    # { "id": "...", "title": "...", "image": "..." }
    games = []
    for m in re.finditer(r'\{(.*?)\}', array_content):
        obj_str = '{' + m.group(1) + '}'
        try:
            # Replace single quotes or unquoted keys if necessary, but here they seem to be valid JSON
            game = json.loads(obj_str)
            games.append(game)
        except:
            # Fallback for slightly malformed JSON in TS
            title_match = re.search(r'"title":\s*"(.*?)"', obj_str)
            image_match = re.search(r'"image":\s*"(.*?)"', obj_str)
            if title_match and image_match:
                games.append({"title": title_match.group(1), "image": image_match.group(1)})
    
    return games

def main():
    games = get_console_games()
    existing_images = os.listdir(images_dir)
    
    missing = []
    for game in games:
        img_name = os.path.basename(game['image'])
        if img_name not in existing_images:
            missing.append(game)
            
    print(f"Total Console Games: {len(games)}")
    print(f"Missing Images: {len(missing)}")
    for m in missing[:20]:
        print(f"- {m['title']} (Expected: {os.path.basename(m['image'])})")
    if len(missing) > 20:
        print(f"... and {len(missing) - 20} more.")

if __name__ == '__main__':
    main()
