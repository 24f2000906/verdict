"""
Convert the heterogeneous raw legal files into the schema ingestion.py expects:

    {"id": str, "content": str, "metadata": {str: str|int|float|bool}}

Writes one <name>.jsonl per source file into --out. Keep --out DIFFERENT from the
raw folder, because ingestion.py scans its --dir recursively and would otherwise
pick up both the raw and the converted files.

Usage:
    python prepare_corpus.py --raw /corpus/raw --out /corpus/chunks
    python ingestion.py --dir /corpus/chunks --dry-run
    python ingestion.py --dir /corpus/chunks --reset
"""
import argparse, csv, io, json, re
from collections import Counter
from pathlib import Path

MAX_CHARS = 1800  # split longer sections so embedding models don't silently truncate

ACTS = {  # file stem -> (short name, full name)
    "ipc":  ("IPC",  "Indian Penal Code, 1860"),
    "crpc": ("CrPC", "Code of Criminal Procedure, 1973"),
    "cpc":  ("CPC",  "Code of Civil Procedure, 1908"),
    "hma":  ("HMA",  "Hindu Marriage Act, 1955"),
    "ida":  ("IDA",  "Indian Divorce Act, 1869"),
    "iea":  ("IEA",  "Indian Evidence Act, 1872"),
    "nia":  ("NIA",  "Negotiable Instruments Act, 1881"),
    "mva":  ("MVA",  "Motor Vehicles Act, 1988"),
    "coi":  ("COI",  "Constitution of India"),
    "bns":  ("BNS",  "Bharatiya Nyaya Sanhita, 2023"),
    "bnss": ("BNSS", "Bharatiya Nagarik Suraksha Sanhita, 2023"),
    "bsa":  ("BSA",  "Bharatiya Sakshya Adhiniyam, 2023"),
}


def read(path: Path):
    with open(path, "r", encoding="utf-8-sig") as f:
        if path.suffix == ".jsonl":
            return [json.loads(l) for l in f if l.strip()]
        d = json.load(f)
    return d if isinstance(d, list) else [d]


def clean(s) -> str:
    s = str(s or "").replace("\r", "")
    s = re.sub(r"[ \t]+\n", "\n", s)
    s = re.sub(r"\n{3,}", "\n\n", s)
    return s.strip()


def split_text(text: str, limit: int = MAX_CHARS):
    """Split on paragraph, then sentence, then hard-cut boundaries."""
    if len(text) <= limit:
        return [text]
    parts, cur = [], ""
    pieces = []
    for para in text.split("\n\n"):
        if len(para) <= limit:
            pieces.append(para)
        else:
            pieces.extend(re.split(r"(?<=[.;:])\s+", para))
    for p in pieces:
        while len(p) > limit:
            parts.append(p[:limit]); p = p[limit:]
        if cur and len(cur) + len(p) + 2 > limit:
            parts.append(cur); cur = p
        else:
            cur = f"{cur}\n\n{p}" if cur else p
    if cur:
        parts.append(cur)
    return parts


def section_chunks(stem, section, title, body, extra=None):
    short, full = ACTS[stem]
    section, title, body = str(section).strip(), clean(title), clean(body)
    if not body:
        return []
    header = f"{full} ({short}) - Section {section}: {title}"
    parts = split_text(body)
    out = []
    for i, part in enumerate(parts, 1):
        meta = {"source_file": stem, "act": short, "act_full": full,
                "section_number": section, "section_title": title,
                "kind": "section", "part": i, "parts": len(parts)}
        meta.update({k: v for k, v in (extra or {}).items() if v not in (None, "")})
        out.append({"id": f"{short}_s{section}" + (f"_p{i}" if len(parts) > 1 else ""),
                    "content": f"{header}\n\n{part}", "metadata": meta})
    return out


# ---- per-format converters -------------------------------------------------
def conv_standard(stem, rows, sec_k, title_k, body_k, chapter_k=None, chapter_title_k=None):
    out = []
    for r in rows:
        extra = {}
        if chapter_k: extra["chapter"] = r.get(chapter_k)
        if chapter_title_k: extra["chapter_title"] = r.get(chapter_title_k)
        out += section_chunks(stem, r[sec_k], r[title_k], r[body_k], extra)
    return out


def conv_hma(stem, rows):
    """hma.json is a CSV that was split line-by-line into one JSON object per line."""
    key = next(iter(rows[0]))
    sections, cur = [], None
    hdr = re.compile(r'^(\d+),(\d+[A-Z]*),(.*?),"(.*)$')
    for r in rows:
        line = r[key]
        m = hdr.match(line)
        if m:
            cur = {"chapter": m[1], "section": m[2], "title": m[3], "body": [m[4]]}
            sections.append(cur)
        elif cur is not None and line.strip():
            cur["body"].append(line)
    out = []
    for s in sections:
        body = "\n\n".join(s["body"]).rstrip('"')
        out += section_chunks(stem, s["section"], s["title"], body, {"chapter": int(s["chapter"])})
    return out


def conv_coi(stem, rows):
    out = []
    for r in rows:
        parts = []
        if r.get("SubHeading"): parts.append(f"[{clean(r['SubHeading'])}]")
        if r.get("ArtDesc"): parts.append(clean(r["ArtDesc"]))
        for c in r.get("Clauses", []):
            parts.append(f"({c['ClauseNo']}) {clean(c['ClauseDesc'])}")
        for e in r.get("Explanations", []):
            parts.append(f"Explanation {e['ExplanationNo']}: {clean(e['Explanation'])}")
        if r.get("Status"): parts.append(f"Status: {r['Status']}")
        art = str(r["ArtNo"])
        title = r["Name"]
        header_name = "Preamble" if art == "0" else f"Article {art}"
        chunks = section_chunks(stem, art, title, "\n\n".join(parts), {"status": r.get("Status")})
        for c in chunks:  # relabel header: "Article", not "Section"
            c["content"] = c["content"].replace(f"- Section {art}:", f"- {header_name}:", 1)
            c["id"] = c["id"].replace("_s", "_art", 1)
            c["metadata"]["article_number"] = art
        out += chunks
    return out


def conv_qa(stem, rows):
    short, full = ACTS[stem]
    out, seen = [], Counter()
    for r in rows:
        sec = r.get("section_number", r.get("sectionnumber"))  # one bnss row has a typo'd key
        q, a = clean(r["question"]), clean(r["answer"])
        if not (q and a):
            continue
        base = f'{r["chunk_id"]}_{r["question_type"]}'  # chunk_id alone repeats across Q&As
        seen[base] += 1
        cid = base if seen[base] == 1 else f"{base}_{seen[base]}"
        out.append({
            "id": cid,
            "content": f"{full} ({short}) - Section {sec}: {clean(r['section_title'])}\n\nQ: {q}\nA: {a}",
            "metadata": {"source_file": stem, "act": short, "act_full": full,
                         "section_number": str(sec), "section_title": clean(r["section_title"]),
                         "question_type": r["question_type"], "kind": "qa",
                         "chunk_id": r["chunk_id"]},
        })
    return out


CONVERTERS = {
    "ipc":  lambda s, r: conv_standard(s, r, "Section", "section_title", "section_desc", "chapter", "chapter_title"),
    "crpc": lambda s, r: conv_standard(s, r, "section", "section_title", "section_desc", "chapter"),
    "iea":  lambda s, r: conv_standard(s, r, "section", "section_title", "section_desc", "chapter"),
    "nia":  lambda s, r: conv_standard(s, r, "section", "section_title", "section_desc", "chapter"),
    "cpc":  lambda s, r: conv_standard(s, r, "section", "title", "description"),
    "mva":  lambda s, r: conv_standard(s, r, "section", "title", "description"),
    "ida":  lambda s, r: conv_standard(s, r, "section", "title", "description"),
    "hma":  conv_hma,
    "coi":  conv_coi,
    "bns":  conv_qa, "bnss": conv_qa, "bsa": conv_qa,
}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--raw", default="/corpus/raw")
    ap.add_argument("--out", default="/corpus/chunks")
    args = ap.parse_args()
    out_dir = Path(args.out); out_dir.mkdir(parents=True, exist_ok=True)
    if out_dir.resolve() == Path(args.raw).resolve():
        raise SystemExit("--out must differ from --raw")

    all_ids = Counter(); total = 0
    for path in sorted(Path(args.raw).glob("*.json*")):
        stem = path.stem.lower()
        if stem not in CONVERTERS:
            print(f"Skipping {path.name}: no converter"); continue
        rows = read(path)
        chunks = CONVERTERS[stem](stem, rows)
        for c in chunks: all_ids[c["id"]] += 1
        with open(out_dir / f"{stem}.jsonl", "w", encoding="utf-8") as f:
            for c in chunks:
                f.write(json.dumps(c, ensure_ascii=False) + "\n")
        print(f"{path.name:<12} {len(rows):>5} records -> {len(chunks):>5} chunks "
              f"(skipped empty: {sum(1 for c in chunks if not c['content'].strip())})")
        total += len(chunks)

    dups = [k for k, v in all_ids.items() if v > 1]
    print(f"\nTotal chunks: {total}   unique ids: {len(all_ids)}   duplicate ids: {len(dups)}")
    if dups:
        raise SystemExit(f"Duplicate ids, e.g. {dups[:5]}")


if __name__ == "__main__":
    main()
