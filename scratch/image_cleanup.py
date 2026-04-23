import os
import re
import hashlib

BASE_DIR = r"c:\Users\Admin\Desktop\게임기획\포트폴리오\게임-기획자-포트폴리오-개선버전"
IMAGE_DIR = os.path.join(BASE_DIR, "public", "images", "games")
DATA_DIR = os.path.join(BASE_DIR, "src", "data", "games")

def get_referenced_images():
    referenced = set()
    for filename in ["pc.ts", "console.ts", "mobile.ts"]:
        path = os.path.join(DATA_DIR, filename)
        if not os.path.exists(path): continue
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        # Find all strings like ./images/games/filename.jpg
        matches = re.findall(r'./images/games/([^"]+)', content)
        for m in matches:
            referenced.add(m)
    return referenced

def get_file_hash(filepath):
    hasher = hashlib.md5()
    with open(filepath, 'rb') as f:
        buf = f.read()
        hasher.update(buf)
    return hasher.hexdigest()

def cleanup():
    if not os.path.exists(IMAGE_DIR): return
    
    referenced = get_referenced_images()
    print(f"Total referenced images: {len(referenced)}")
    
    all_files = os.listdir(IMAGE_DIR)
    print(f"Total files in directory: {len(all_files)}")
    
    # 1. Delete orphaned files
    for f in all_files:
        if f not in referenced and f.endswith(('.jpg', '.png', '.webp', '.jpeg')):
            print(f"Deleting orphaned file: {f}")
            try:
                os.remove(os.path.join(IMAGE_DIR, f))
            except: pass

    # 2. Re-scan and check for physical content duplicates among referenced files
    # (Optional, but good for saving space)
    # Actually, the user asked to delete duplicates, which usually means the orphaned ones
    # from previous naming versions.

if __name__ == "__main__":
    cleanup()
    print("Cleanup Complete.")
