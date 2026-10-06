from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os
load_dotenv()

class Settings(BaseSettings):
    frontend_url:str = os.getenv("FRONTEND_URL")
    text_model:str = os.getenv("TEXT_MODEL")
    text_model_api_key:str = os.getenv("TEXT_MODEL_API_KEY")
    embedding_model:str = os.getenv("EMBEDDING_MODEL")
    embedding_model_api_key:str = os.getenv("EMBEDDING_MODEL_API_KEY")
    chroma_host:str = "chroma"
    chroma_port:str = "8000"
    chroma_collection:str = "verdict_embeddings"

    class Config:
        env_file = ".env"

settings = Settings()