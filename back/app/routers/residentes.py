from fastapi import APIRouter, HTTPException
from typing import List

from app.models.residente import Residente, ResidenteCreate, ResidenteUpdate

router = APIRouter()

# Almacenamiento en memoria (reemplazar por DB luego)
_db: List[dict] = []
_next_id = 1


@router.get("/", response_model=List[Residente])
def listar_residentes():
    return _db


@router.get("/{residente_id}", response_model=Residente)
def obtener_residente(residente_id: int):
    item = next((r for r in _db if r["id"] == residente_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Residente no encontrado")
    return item


@router.post("/", response_model=Residente, status_code=201)
def crear_residente(data: ResidenteCreate):
    global _next_id
    nuevo = {"id": _next_id, **data.model_dump()}
    _db.append(nuevo)
    _next_id += 1
    return nuevo


@router.patch("/{residente_id}", response_model=Residente)
def actualizar_residente(residente_id: int, data: ResidenteUpdate):
    item = next((r for r in _db if r["id"] == residente_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Residente no encontrado")
    for key, value in data.model_dump(exclude_none=True).items():
        item[key] = value
    return item


@router.delete("/{residente_id}", status_code=204)
def eliminar_residente(residente_id: int):
    global _db
    item = next((r for r in _db if r["id"] == residente_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Residente no encontrado")
    _db = [r for r in _db if r["id"] != residente_id]
