import urllib.request
import os

os.makedirs("public/images/games", exist_ok=True)

images = [
    ("osu.png", "https://upload.wikimedia.org/wikipedia/commons/e/e3/Osu%21Logo_%282015%29.png"),
    ("maple_worlds.png", "https://upload.wikimedia.org/wikipedia/en/a/a7/MapleStory_logo.png"),
    ("pokemon.png", "https://upload.wikimedia.org/wikipedia/en/9/93/Pok%C3%A9mon_Scarlet_and_Violet_Double_Pack_Box_Art.png"),
    ("path_to_nowhere.jpg", "https://upload.wikimedia.org/wikipedia/en/2/2f/Path_to_Nowhere_cover.jpg"),
    ("three_kingdoms.jpg", "https://upload.wikimedia.org/wikipedia/en/f/fc/Romance_of_the_Three_Kingdoms_XIV_cover_art.jpg"),
    ("hearthstone.png", "https://upload.wikimedia.org/wikipedia/en/1/1c/Hearthstone_Logo.png")
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
