from fastapi import FastAPI
from app.api.routes import ask
from app.api.routes import test
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
import warnings

warnings.filterwarnings(
    "ignore",
    category=UserWarning
)

app = FastAPI(title="Verdict API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.frontend_url,
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def home():
    return {"message": "Hello World"}

app.include_router(ask.router)
app.include_router(test.router)