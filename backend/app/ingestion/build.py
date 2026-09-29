import argparse, json, os
from app.ingestion.parser import extract_text, clean_text
from app.ingestion.chunker import chunk_constitution
from app.ingestion.indexer import index_chunks

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--pdf", default="/corpus/raw/constitution.pdf")
    ap.add_argument("--out", default="/corpus/processed/constitution_chunks.json")
    ap.add_argument("--reset", action="store_true")
    ap.add_argument("--dry-run", action="store_true", help="parse and save chunks, skip indexing")
    args = ap.parse_args()

    text = clean_text(extract_text(args.pdf))
    chunks = chunk_constitution(text)

    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(chunks, f, ensure_ascii=False, indent=2)
    print(f"Parsed {len(chunks)} chunks -> {args.out}")

    if not args.dry_run:
        index_chunks(chunks, reset=args.reset)
        print("Done.")

if __name__ == "__main__":
    main()