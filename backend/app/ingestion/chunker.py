import re
from typing import List, Dict

ARTICLE_RE = re.compile(
    r"(?m)^(?:\d{1,3}\[)?(\d{1,3}[A-Z]{0,2})\.\s+([^\n]{3,150}?)\.\s?[—–\-]"
)

PART_RE = re.compile(r"(?m)^PART\s+([IVX]+[A-Z]?)\s*$")

MAX_CHARS = 3500

def _base_number(article_no: str) -> int:
    return int(re.match(r"\d+", article_no).group())

def _find_articles(text: str):
    """Find article headings, dropping false positives by requiring numbers to move forward."""
    found, last = [], 0
    for m in ARTICLE_RE.finditer(text):
        base = _base_number(m.group(1))
        if last <= base <= last + 15:      # gaps exist (repealed articles), but not huge jumps
            found.append(m)
            last = base
    return found

def _find_parts(text: str):
    return [(m.start(), m.group(1)) for m in PART_RE.finditer(text)]

def _part_for(pos: int, parts) -> str:
    current = "Preamble/Unknown"
    for start, name in parts:
        if start <= pos:
            current = name
        else:
            break
    return current

def _split_long(text: str) -> List[str]:
    if len(text) <= MAX_CHARS:
        return [text]
    pieces, buf = [], ""
    for para in text.split("\n"):
        if len(buf) + len(para) > MAX_CHARS and buf:
            pieces.append(buf.strip())
            buf = ""
        buf += para + "\n"
    if buf.strip():
        pieces.append(buf.strip())
    return pieces

def chunk_constitution(text: str) -> List[Dict]:
    articles = _find_articles(text)
    parts = _find_parts(text)
    chunks = []

    for i, m in enumerate(articles):
        start = m.start()
        end = articles[i + 1].start() if i + 1 < len(articles) else len(text)
        body = text[start:end].strip()

        art_no = m.group(1)
        title = m.group(2).strip()
        part = _part_for(start, parts)

        pieces = _split_long(body)
        for j, piece in enumerate(pieces):
            chunks.append({
                "id": f"constitution-art-{art_no}" + (f"-p{j+1}" if len(pieces) > 1 else ""),
                "content": f"Article {art_no}. {title}\n{piece}",
                "metadata": {
                    "source": "Constitution",
                    "article": art_no,
                    "title": title,
                    "part": part,
                },
            })
    return chunks