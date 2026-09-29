from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os
load_dotenv()

class Settings(BaseSettings):
    ollama_url:str = os.getenv("OLLAMA_URL")
    text_model:str = os.getenv("TEXT_MODEL")
    embedding_model:str = os.getenv("EMBEDDING_MODEL")
    chroma_host:str = "chroma"
    chroma_port:str = "8000"
    chroma_collection:str = "verdict_embeddings"

    class Config:
        env_file = ".env"

settings = Settings()