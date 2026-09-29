from pydantic import BaseModel
from typing import Optional, List

class AskRequest(BaseModel):
    question: str
    session_id: Optional[str] = None

class Citation(BaseModel):
    source: str
    section: str
    excerpt: str

class AskResponse(BaseModel):
    answer: str
    citations: List[Citation]
    verification_status: str
    