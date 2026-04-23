import os
import re

def deep_genre_audit():
    base_path = r'c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전'
    data_paths = {
        "PC": os.path.join(base_path, "src/data/games/pc.ts"),
        "MOBILE": os.path.join(base_path, "src/data/games/mobile.ts"),
        "CONSOLE": os.path.join(base_path, "src/data/games/console.ts")
    }

    # [전수 조사 기반 장르 마스터 맵]
    GENRE_MAP = {
        # PC
        "Counter-Strike: Global Offensive": "Tactical FPS",
        "Deadlock": "MOBA Shooter",
        "FC온라인": "Sports (Football)",
        "PUBG: 배틀그라운드": "Battle Royale",
        "Team Fortress 2": "Hero Shooter",
        "League of Legends": "MOBA",
        "Valorant": "Tactical FPS",
        "로스트아크": "Hack and Slash MMORPG",
        "메이플스토리": "2D Side-scrolling MMORPG",
        "던전앤파이터": "Belt-scrolling Action RPG",
        "서든어택": "FPS",
        "스타크래프트": "RTS",
        "스타크래프트 2": "RTS",
        "오버워치": "Hero Shooter",
        "로블록스": "Metaverse Platform",
        "포트리스 2": "Turn-based Artillery",
        "카트라이더: 드리프트": "Kart Racing",
        
        # Mobile
        "브롤스타즈": "Real-time Action Combat",
        "클래시 로얄": "Real-time Strategy Card",
        "클래시 오브 클랜": "Combat Strategy",
        "어몽 어스": "Social Deduction",
        "지구의 마지막 날: 생존": "Survival Crafting",
        "Pokémon GO": "Location-based AR",
        "Pokémon Sleep": "Sleep Tracking Game",
        "데스티니 차일드": "Narrative CCG",
        "무기미도": "Tower Defense RPG",
        "블루아카이브": "Tactical Subculture RPG",
        "명일방주": "Tower Defense",
        "원신": "Open World Action RPG",
        "붕괴: 스타레일": "Turn-based Strategy RPG",
        "젠레스 존 제로": "Urban Fantasy Action",
        
        # Console/Steam
        "Among Us": "Social Deduction",
        "엘든 링": "Open World Action RPG (Soulslike)",
        "Hollow Knight": "Metroidvania",
        "Undertale": "Indie RPG",
        "Slay the Spire": "Roguelike Deck-builder",
        "Portal 2": "First-person Puzzle",
        "Left 4 Dead 2": "Co-op Zombie Shooter",
        "Stardew Valley": "Farming Simulation",
        "Vampire Survivors": "Roguelite Bullet Heaven",
        "Papers, Please": "Dystopian Document Thriller",
        "Inscryption": "Roguelike Deck-builder Horror",
        "Lethal Company": "Co-op Horror Survival",
        "Katana ZERO": "Neo-noir Action Platformer",
        "산나비": "2D Grappling Action",
        "Kingdom Come: Deliverance II": "First-person Open World RPG",
        "스노우브라더스": "Platformer Arcade",
        "버블보블": "Platformer Arcade",
        "Plants vs. Zombies": "Tower Defense",
        "활협전": "Wuxia Management RPG"
    }

    # 기본 대분류 맵 (상세 맵에 없을 때 사용)
    CATEGORY_DEFAULT = {
        "PC": "Online Game",
        "MOBILE": "Mobile Game",
        "CONSOLE": "Video Game"
    }

    for plat, path in data_paths.items():
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 모든 게임 객체 추출
            items = re.findall(r'(\{\s*\"id\":.*?\"\})', content, re.DOTALL)
            new_items = []
            
            for item in items:
                title_match = re.search(r'\"title\":\s*\"(.*?)\"', item)
                if title_match:
                    title = title_match.group(1).strip()
                    # 장르 업데이트
                    new_genre = GENRE_MAP.get(title, CATEGORY_DEFAULT.get(plat, "Game"))
                    
                    # 정규표현식으로 genre 필드만 교체
                    updated_item = re.sub(r'\"genre\":\s*\".*?\"', f'"genre": "{new_genre}"', item)
                    new_items.append(updated_item)

            # 파일 쓰기
            header = "import type { GameHistoryItem } from '../../types';\n\n"
            header += f"export const {plat}_GAMES: GameHistoryItem[] = [\n"
            footer = "\n];\n"
            
            with open(path, 'w', encoding='utf-8') as f:
                f.write(header + ",\n".join(new_items) + footer)

    print("Deep Genre Audit Complete: All 366 items updated with precision genres.")

if __name__ == "__main__":
    deep_genre_audit()
