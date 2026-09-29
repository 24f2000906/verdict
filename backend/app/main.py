from fastapi import FastAPI
from app.api.routes import ask
from app.api.routes import test
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
load_dotenv()

FRONTEND_URL = os.getenv("FRONTEND_URL")

app = FastAPI(title="Verdict API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
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