import os

def clean_snow_bros():
    path = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\src\data\games\console.ts'
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    seen_1 = False
    seen_2 = False
    
    for line in lines:
        if '"title":' in line:
            # Snow Bros 2
            if "Snow Bros. 2" in line or "스노우브라더스 2" in line:
                if not seen_2:
                    line = line.replace("Snow Bros. 2: With New Elves", "스노우 브라더스 2")
                    new_lines.append(line)
                    seen_2 = True
                continue
            # Snow Bros 1
            if "Snow Bros" in line or "스노우브라더스" in line:
                if not seen_1:
                    line = line.replace("Snow Bros", "스노우 브라더스 1").replace("스노우브라더스", "스노우 브라더스 1")
                    # Clean up double title if both exist
                    if '"title": "스노우 브라더스 1 1"' in line:
                         line = line.replace('"title": "스노우 브라더스 1 1"', '"title": "스노우 브라더스 1"')
                    new_lines.append(line)
                    seen_1 = True
                continue
        new_lines.append(line)

    with open(path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("Snow Bros cleaned and renamed.")

if __name__ == "__main__":
    clean_snow_bros()
