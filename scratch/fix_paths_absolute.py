import os

def fix_image_paths_absolute():
    base_path = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전'
    path = os.path.join(base_path, 'src/data/games/console.ts')

    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # "images/games/" -> "/game-designer-portfolio/images/games/" (베이스 경로 포함 절대 경로로 변경)
    # 먼저 기존에 잘못된 경로가 있을 수 있으니 정규화
    content = content.replace('"/game-designer-portfolio/images/games/', '"images/games/')
    content = content.replace('"/images/games/', '"images/games/')
    
    new_content = content.replace('"images/games/', '"/game-designer-portfolio/images/games/')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print("Image paths fixed to absolute with base path (/game-designer-portfolio/).")

if __name__ == "__main__":
    fix_image_paths_absolute()
