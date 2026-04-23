import os

def fix_image_paths():
    base_path = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전'
    path = os.path.join(base_path, 'src/data/games/console.ts')

    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # "/images/games/" -> "images/games/" (상대 경로로 변경)
    new_content = content.replace('"/images/games/', '"images/games/')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print("Image paths fixed to relative (removed leading slash).")

if __name__ == "__main__":
    fix_image_paths()
