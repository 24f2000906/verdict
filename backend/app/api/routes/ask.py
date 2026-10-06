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
    try:
        result = compiled_graph.invoke({
            "question": req.question,
            "retrieved_docs": [],
            "citations": [],
            "unsupported_citations": [],
            "verification_status": "unverified",
            "retry_count": 0,
        })
    except Exception:
        raise HTTPException(status_code=503, detail="The model is getting overload, Please retry in a few seconds.")

    res = AskResponse(
        answer=result["final_answer"],
        citations=[Citation(**c) for c in result["citations"]],
        verification_status=result["verification_status"]
    )
    if res.verification_status == "verified" and len(_cache) < 2000:
        _cache[k] = res
    print(res)
    return res
