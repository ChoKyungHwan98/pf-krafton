import os

def fix_image_paths_dot_relative():
    base_path = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전'
    path = os.path.join(base_path, 'src/data/games/console.ts')

    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 모든 형태의 이전 경로를 ./images/games/ 로 정규화
    import re
    # "/game-designer-portfolio/images/games/" -> "./images/games/"
    content = content.replace('"/game-designer-portfolio/images/games/', '"./images/games/')
    # "/images/games/" -> "./images/games/"
    content = content.replace('"/images/games/', '"./images/games/')
    # "images/games/" (슬래시 없는 경우) -> "./images/games/"
    content = content.replace('"images/games/', '"./images/games/')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("Image paths fixed to dot-relative (./images/games/).")

if __name__ == "__main__":
    fix_image_paths_dot_relative()
