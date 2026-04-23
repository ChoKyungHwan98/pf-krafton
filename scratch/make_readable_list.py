import os
import re

def generate_professional_list():
    base_path = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전'
    paths = {
        "PC": os.path.join(base_path, "src/data/games/pc.ts"),
        "Mobile": os.path.join(base_path, "src/data/games/mobile.ts"),
        "Console/Steam": os.path.join(base_path, "src/data/games/console.ts")
    }

    output = ["# 🎮 Gaming DNA: Professional Experience Audit\n"]
    output.append("**총 366개의 게임에 대한 정식 명칭, 개발사 및 장르 전수 조사가 완료되었습니다.**\n")

    for cat, path in paths.items():
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # 객체별 데이터 추출
            items = []
            # 간단한 정규식으로 title, company, genre 추출
            matches = re.findall(r'\{\s*\"id\":.*?\"genre\":\s*\"(.*?)\".*?\"title\":\s*\"(.*?)\".*?\"company\":\s*\"(.*?)\"\s*\}', content, re.DOTALL)
            
            output.append(f"## 🏛️ {cat} ({len(matches)}개)")
            output.append("| No. | Title | Company | Genre |")
            output.append("| :--- | :--- | :--- | :--- |")
            
            for i, (genre, title, company) in enumerate(matches):
                output.append(f"| {i+1} | **{title}** | {company} | {genre} |")
            
            output.append("\n---\n")

    final_path = os.path.join(base_path, 'scratch/Gaming_DNA_Final_Readable.md')
    with open(final_path, 'w', encoding='utf-8') as f:
        f.write("\n".join(output))

    print(f"전문가용 리스트가 생성되었습니다: {final_path}")

if __name__ == "__main__":
    generate_professional_list()
