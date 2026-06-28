import os
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routers import residentes, personal, actividades, content

UPLOADS_DIR = Path(__file__).parent.parent / "uploads"
UPLOADS_DIR.mkdir(exist_ok=True)

_raw_origins = os.environ.get("CORS_ORIGINS", "http://localhost:5173")
CORS_ORIGINS = [o.strip() for o in _raw_origins.split(",") if o.strip()]

app = FastAPI(
    title="Geriátrico San Alfonso API",
    description="API para la gestión del geriátrico San Alfonso",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory=str(UPLOADS_DIR)), name="uploads")

app.include_router(residentes.router,  prefix="/api/residentes",  tags=["Residentes"])
app.include_router(personal.router,    prefix="/api/personal",    tags=["Personal"])
app.include_router(actividades.router, prefix="/api/actividades", tags=["Actividades"])
app.include_router(content.router,     prefix="/api/content",     tags=["Content"])


@app.get("/", tags=["Health"])
def health_check():
    return {"status": "ok", "mensaje": "API Geriátrico San Alfonso funcionando"}
