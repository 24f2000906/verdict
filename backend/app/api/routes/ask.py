from app.graph.graph import build_graph
from fastapi import APIRouter
from app.models.schemas import AskResponse, AskRequest, Citation

compiled_graph = build_graph()
router = APIRouter()

@router.post("/ask", response_model=AskResponse)
def ask(req: AskRequest):
    result = compiled_graph.invoke({
        "question": req.question,
        "retrieved_docs": [],
        "citations": [],
        "unsupported_citations": [],
        "verification_status": "unverified",
        "retry_count": 0,
    })

    return AskResponse(
        answer=result["final_answer"],
        citations=[Citation(**c) for c in result["citations"]],
        verification_status=result["verification_status"]
    )