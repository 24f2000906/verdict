import chromadb
from langchain_chroma import Chroma
from langchain_ollama import OllamaEmbeddings
from app.core.config import settings

def get_vectorstore():
    embeddings = OllamaEmbeddings(
        model = settings.embedding_model,
        base_url = settings.ollama_url
    )

    client = chromadb.HttpClient(host=settings.chroma_host, port=settings.chroma_port)

    return Chroma(
        client=client,
        collection_name=settings.chroma_collection,
        embedding_function=embeddings
    )