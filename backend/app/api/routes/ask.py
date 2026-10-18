import hashlib, re
from app.graph.graph import build_graph
from fastapi import APIRouter, HTTPException
from app.models.schemas import AskResponse, AskRequest, Citation

compiled_graph = build_graph()
router = APIRouter()
_cache: dict[str, AskResponse] = {}

def _key(q: str) -> str:
    return hashlib.sha256(re.sub(r"\s+", " ", q.strip().lower()).encode()).hexdigest()


@router.post("/ask", response_model=AskResponse)
def ask(req: AskRequest):
    k = _key(req.question)
    if k in _cache:
        return _cache[k]

    for i in range(5):
        try:
            result = compiled_graph.invoke({
                "question": req.question,
                "retrieved_docs": [],
                "citations": [],
                "unsupported_citations": [],
                "verification_status": "unverified",
                "retry_count": 0,
            })
            
        except Exception as e:
            print(f"Error: {e}\nRetry {i+1}")

    res = AskResponse(
        answer=result["final_answer"],
        citations=[Citation(**c) for c in result["citations"]],
        verification_status=result["verification_status"]
    )
    if res.verification_status == "verified" and len(_cache) < 2000:
        _cache[k] = res
    return res
