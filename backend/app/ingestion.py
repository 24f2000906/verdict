import argparse, json
from pathlib import Path
from typing import List, Dict
from app.db.vectorstore import get_vectorstore

BATCH = 32

def index_chunks(chunks: List[Dict], reset: bool = False) -> int:
    vs = get_vectorstore()
    if reset:
        vs.delete_collection()
        vs = get_vectorstore()

    for i in range(0, len(chunks), BATCH):
        batch = chunks[i:i + BATCH]
        vs.add_texts(
            texts=[c["content"] for c in batch],
            metadatas=[c["metadata"] for c in batch],
            ids=[c["id"] for c in batch],
        )
        print(f"Indexed {min(i + BATCH, len(chunks))}/{len(chunks)}")
    return len(chunks)


def load_file(path: Path) -> list[dict]:
    with open(path, "r", encoding="utf-8-sig") as f:
        if path.suffix == ".jsonl":
            return [json.loads(line) for line in f if line.strip()]
        data = json.load(f)
    return data if isinstance(data, list) else [data]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dir", default="/corpus/chunks", help="folder containing .json / .jsonl files")
    ap.add_argument("--reset", action="store_true", help="wipe the index before indexing")
    ap.add_argument("--dry-run", action="store_true", help="load files and count chunks, skip indexing")
    args = ap.parse_args()

    files = sorted(
        p for p in Path(args.dir).rglob("*")
        if p.is_file() and p.suffix in {".json", ".jsonl"}
    )
    if not files:
        raise SystemExit(f"No .json or .jsonl files found in {args.dir}")

    all_chunks = []
    loaded_files = 0
    for path in files:
        try:
            chunks = load_file(path)
        except (json.JSONDecodeError, OSError) as e:
            print(f"Skipping {path}: {e}")
            continue
        loaded_files += 1
        print(f"Loaded {len(chunks):>6} chunks from {path}")
        all_chunks.extend(chunks)

    print(f"Total: {len(all_chunks)} chunks from {loaded_files}/{len(files)} files")

    if not args.dry_run:
        index_chunks(all_chunks, reset=args.reset)
        print("Done.")


if __name__ == "__main__":
    main()