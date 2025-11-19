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
    "http://52.54.10.9:30080",  # current frontend NodePort
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # allow any origin
    allow_credentials=False,    # must be False when allow_origins=["*"]
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok"}


app.include_router(surveys.router)
