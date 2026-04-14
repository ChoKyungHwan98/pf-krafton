import urllib.request

urls = [
    "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x77.jpg",
    "https://images.igdb.com/igdb/image/upload/t_cover_big/co4bce.jpg",
    "https://images.igdb.com/igdb/image/upload/t_cover_big/co5p1d.jpg",
    "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyo.jpg",
    "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x62.jpg"
]

req_headers = {
    'User-Agent': 'Mozilla/5.0'
}

for u in urls:
    try:
        req = urllib.request.Request(u, headers=req_headers)
        with urllib.request.urlopen(req) as response:
            print(f"200 OK - {u}")
    except Exception as e:
        print(f"Failed - {u} : {e}")
