import sqlite3, os

storage = os.path.expandvars('%APPDATA%/Code/User/workspaceStorage')
for folder in os.listdir(storage):
    db_path = os.path.join(storage, folder, 'state.vscdb')
    if not os.path.exists(db_path):
        continue
    try:
        conn = sqlite3.connect(db_path)
        cur = conn.cursor()
        cur.execute("SELECT key, value FROM ItemTable LIMIT 20")
        rows = cur.fetchall()
        for k, v in rows:
            val = str(v)[:300] if v else ''
            if '게임' in val or '개선버전' in val or 'portfolio' in val.lower():
                print(f"FOUND: {folder}")
                print(f"  key={k}")
                print(f"  val={val[:200]}")
        conn.close()
    except Exception as e:
        print(f"Error {folder}: {e}")
