from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routers import surveys

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Student Survey API")

# CORS for local dev + later NodePort/IP
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://52.5.253.108:30080",  # when deployed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok"}


app.include_router(surveys.router)
