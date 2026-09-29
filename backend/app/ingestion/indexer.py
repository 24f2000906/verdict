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