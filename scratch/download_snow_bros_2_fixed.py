import requests
import os

url = "https://www.oldgamenara.com/data/file/oldgame2/1794155758_C9LBpYbw_2013-11-18_143B183B09.JPEG"
target_path = r"c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전\public\images\games\스노우_브라더스_2.jpg"

try:
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    response = requests.get(url, headers=headers, timeout=10)
    if response.status_code == 200:
        with open(target_path, 'wb') as f:
            f.write(response.content)
        print(f"Successfully downloaded and saved to {target_path}")
    else:
        print(f"Failed to download image. Status code: {response.status_code}")
except Exception as e:
    print(f"Error occurred: {e}")
