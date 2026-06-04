from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import residentes, personal, actividades

app = FastAPI(
    title="Geriátrico San Alfonso API",
    description="API para la gestión del geriátrico San Alfonso",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(residentes.router, prefix="/api/residentes", tags=["Residentes"])
app.include_router(personal.router, prefix="/api/personal", tags=["Personal"])
app.include_router(actividades.router, prefix="/api/actividades", tags=["Actividades"])


@app.get("/", tags=["Health"])
def health_check():
    return {"status": "ok", "mensaje": "API Geriátrico San Alfonso funcionando"}
