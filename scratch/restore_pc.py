import os

def restore_pc_full():
    path = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\src\data\games\pc.ts'
    
    PC_GAMES_LIST = [
        ("ARC Raiders", "Embark Studios", "Tactical FPS"),
        ("Counter-Strike: Global Offensive", "Valve", "Tactical FPS"),
        ("Deadlock", "Valve", "MOBA Shooter"),
        ("FC온라인", "EA Sports/Nexon", "Sports (Football)"),
        ("PUBG: 배틀그라운드", "KRAFTON", "Battle Royale"),
        ("Team Fortress 2", "Valve", "Hero Shooter"),
        ("osu!", "ppy", "Rhythm/Action"),
        ("검은사막", "Pearl Abyss", "Hack and Slash MMORPG"),
        ("귀혼", "Mgame", "MMORPG"),
        ("그랜드체이스", "KOG", "Action RPG"),
        ("던전앤파이터", "Nexon", "Belt-scrolling Action RPG"),
        ("로블록스", "Roblox Corporation", "Metaverse Platform"),
        ("로스트아크", "Smilegate RPG", "Hack and Slash MMORPG"),
        ("리그 오브 레전드", "Riot Games", "MOBA"),
        ("마블 라이벌즈", "NetEase Games", "Hero Shooter"),
        ("메이플스토리", "Nexon", "2D Side-scrolling MMORPG"),
        ("메이플스토리 월드", "Nexon", "Platform"),
        ("발로란트", "Riot Games", "Tactical FPS"),
        ("에버플래닛", "Nexon", "MMORPG"),
        ("이터널 리턴", "Nimble Neuron", "Battle Royale"),
        ("스타크래프트 2", "Blizzard", "RTS"),
        ("오버워치", "Blizzard", "Hero Shooter"),
        ("포트리스 2", "CCR", "Turn-based Artillery"),
        ("바람의나라", "Nexon", "MMORPG"),
        ("서든어택", "Nexon GT", "FPS"),
        ("카트라이더: 드리프트", "Nexon", "Kart Racing"),
        ("크레이지아케이드", "Nexon", "Casual Puzzle"),
        ("테일즈위버", "Nexon", "MMORPG"),
        ("클로저스", "Nadic Games", "Action RPG"),
        ("워크래프트 3", "Blizzard", "RTS"),
        ("배틀라이트", "Stunlock Studios", "MOBA"),
        ("버블슈터", "Various", "Casual Puzzle"),
        ("버블파이터", "Nexon", "Third-person Shooter"),
        ("봄버맨 온라인", "Hudson Soft", "Action"),
        ("뿌까 퍼니레이스", "Various", "Racing"),
        ("서머너즈 워: 크로니클", "Com2uS", "MMORPG"),
        ("서유기전 온라인", "Mgame", "MMORPG"),
        ("슈퍼바이브", "Theorycraft Games", "MOBA Shooter"),
        ("스타크래프트", "Blizzard", "RTS"),
        ("얍카", "Various", "Action RPG"),
        ("에어라이더", "Nexon", "Racing"),
        ("엑스틸", "NCSoft", "Action"),
        ("엘소드", "KOG", "Action RPG"),
        ("열혈강호", "Mgame", "MMORPG"),
        ("우뿌", "Various", "Action"),
        ("워헤이븐", "Nexon", "Action"),
        ("웜즈 온라인", "Team17", "Turn-based Strategy"),
        ("윈드슬레이어", "Various", "MMORPG"),
        ("전략적 팀 전투", "Riot Games", "Auto Battler"),
        ("커츠펠", "KOG", "Action RPG"),
        ("케로로파이터", "Various", "Action"),
        ("쿵야 어드벤처", "Netmarble", "MMORPG"),
        ("큐플레이", "Nexon", "Social Puzzle"),
        ("크레이지레이싱 카트라이더", "Nexon", "Racing"),
        ("톰 클랜시의 레인보우 식스 시즈", "Ubisoft", "Tactical FPS"),
        ("패스 오브 엑자일 2", "Grinding Gear Games", "Action RPG"),
        ("프리프", "Gala Lab", "MMORPG"),
        ("피구왕 마시마로", "Various", "Sports"),
        ("하스스톤", "Blizzard", "CCG"),
        ("하이퍼유니버스", "Cwiggl", "Action MOBA"),
        ("히어로즈 오브 더 스톰", "Blizzard", "MOBA"),
        ("마법학교 아르피아", "NCSoft", "RPG"),
        ("마법학교 아스티넬", "NCSoft", "RPG"),
        ("믹스마스터", "Various", "MMORPG"),
        ("바우트", "Various", "Action"),
        ("아크 레이더스", "Embark Studios", "Co-op Shooter"),
        ("라테일", "HappyTuk", "MMORPG"),
        ("디지몬 RPG", "MoveGames", "MMORPG"),
        ("디지몬 온라인", "Bandai", "MMORPG"),
        ("로스트사가", "Valofe", "Action"),
        ("검은사막", "Pearl Abyss", "MMORPG"),
        ("FC온라인", "EA Sports", "Sports")
    ]

    content = "import type { GameHistoryItem } from '../../types';\n\n"
    content += "export const PC_GAMES: GameHistoryItem[] = [\n"
    items = []
    for i, (title, company, genre) in enumerate(PC_GAMES_LIST):
        items.append(f'  {{ "id": "pc-{i}", "category": "Pc", "genre": "{genre}", "title": "{title}", "company": "{company}" }}')
    content += ",\n".join(items) + "\n];\n"
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("PC Database Restored (72 items)")

if __name__ == "__main__":
    restore_pc_full()
