from langchain_ollama import ChatOllama
from app.core.config import settings

def get_llm():
    return ChatOllama(
        model=settings.text_model,
        base_url=settings.ollama_url,
        temperature=0.1,
        num_ctx=8192,
    )