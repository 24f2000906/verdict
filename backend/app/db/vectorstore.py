import chromadb
from langchain_chroma import Chroma
from langchain_nvidia_ai_endpoints import NVIDIAEmbeddings
from app.core.config import settings

def get_vectorstore():
    embeddings = NVIDIAEmbeddings(
        model=settings.embedding_model,
        nvidia_api_key=settings.embedding_model_api_key, 
        truncate="END"
    )

    client = chromadb.HttpClient(
        host=settings.chroma_host, 
        port=settings.chroma_port
    )

    return Chroma(
        client=client,
        collection_name=settings.chroma_collection,
        embedding_function=embeddings
    )