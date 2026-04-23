import urllib.request
import os

os.makedirs("public/images/games", exist_ok=True)

images = [
    ("maple_kr.jpg", "https://chokyunghwan98.github.io/game-designer-portfolio/images/games/maple_kr.jpg"),
    ("osu_manual.png", "https://chokyunghwan98.github.io/game-designer-portfolio/images/games/osu_manual.png"),
    ("maple_worlds_manual.jpg", "https://chokyunghwan98.github.io/game-designer-portfolio/images/games/maple_worlds_manual.jpg"),
    ("pokemon_logo.jpg", "https://chokyunghwan98.github.io/game-designer-portfolio/images/games/pokemon_logo.jpg"),
    ("ptn.jpg", "https://chokyunghwan98.github.io/game-designer-portfolio/images/games/ptn.jpg"),
    ("three_kingdoms.png", "https://chokyunghwan98.github.io/game-designer-portfolio/images/games/three_kingdoms.png"),
    ("hearthstone.webp", "https://chokyunghwan98.github.io/game-designer-portfolio/images/games/hearthstone.webp")
]

req_headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

for name, url in images:
    path = f"public/images/games/{name}"
    try:
        req = urllib.request.Request(url, headers=req_headers)
        with urllib.request.urlopen(req) as response, open(path, 'wb') as out_file:
            data = response.read()
            out_file.write(data)
        print(f"Downloaded {name}")
    except Exception as e:
        print(f"Failed to download {name}: {str(e)}")
