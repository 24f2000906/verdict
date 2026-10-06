from fastapi import APIRouter
from app.models.schemas import AskRequest
from app.core.llm import get_llm
router = APIRouter()

@router.post("/test")
def test(req: AskRequest):
    llm = get_llm()
    response = llm.invoke(req.question)
    return {"Answer": response.content}