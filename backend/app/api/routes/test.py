from fastapi import APIRouter
from app.db.vectorstore import get_vectorstore
router = APIRouter()

@router.post("/test")
def test():
    return {"test": "test passed"}