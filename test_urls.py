import requests

urls = [
    "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/216150/capsule_616x353.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/1/1e/Osu%21_Logo_2016.svg",
    "https://assets.pokemon.com/assets/cms2/img/video-games/video-games/pokemon_scarlet_violet/pokemon_scarlet_violet_169.jpg",
    "https://blz-contentstack-images.akamaized.net/v3/assets/bltc965041283bac56c/bltf83944d18fb37dbe/5f048d0a8b9e6022e17621f3/Hearthstone_Desktop.jpg"
]

for u in urls:
    try:
        r = requests.head(u, timeout=5)
        print(f"{r.status_code} - {u}")
    except Exception as e:
        print(f"Error {e} - {u}")
