import json
import os
import shutil
import uuid
from pathlib import Path

from fastapi import APIRouter, HTTPException, UploadFile, File, Request

router = APIRouter()

CONTENT_FILE = Path(__file__).parent.parent / "content.json"
UPLOADS_DIR  = Path(__file__).parent.parent.parent / "uploads"
UPLOADS_DIR.mkdir(exist_ok=True)

ALLOWED_EXT = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".ico"}


def _load() -> dict:
    with open(CONTENT_FILE, encoding="utf-8") as f:
        return json.load(f)


def _save(data: dict) -> None:
    with open(CONTENT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


@router.post("/auth")
async def auth(request: Request):
    data = await request.json()
    expected = os.environ.get("PANEL_PASSWORD", "")
    if not expected:
        raise HTTPException(status_code=500, detail="PANEL_PASSWORD no está configurado en el servidor")
    if data.get("password") != expected:
        raise HTTPException(status_code=401, detail="Contraseña incorrecta")
    return {"ok": True}


@router.get("/")
def get_content():
    return _load()


@router.put("/")
async def update_content(request: Request):
    data = await request.json()
    _save(data)
    return {"ok": True}


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXT:
        raise HTTPException(status_code=400, detail="Tipo de archivo no permitido")
    fname = f"{uuid.uuid4().hex}{ext}"
    dest = UPLOADS_DIR / fname
    with open(dest, "wb") as out:
        shutil.copyfileobj(file.file, out)
    # En producción PUBLIC_URL=https://tu-backend.railway.app → URL absoluta
    # En dev/Docker vacío → URL relativa, proxy de Vite lo maneja
    public = os.environ.get("PUBLIC_URL", "").rstrip("/")
    url = f"{public}/uploads/{fname}" if public else f"/uploads/{fname}"
    return {"url": url}
