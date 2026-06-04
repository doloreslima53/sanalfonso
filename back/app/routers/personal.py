from fastapi import APIRouter, HTTPException
from typing import List

from app.models.personal import Personal, PersonalCreate, PersonalUpdate

router = APIRouter()

_db: List[dict] = []
_next_id = 1


@router.get("/", response_model=List[Personal])
def listar_personal():
    return _db


@router.get("/{personal_id}", response_model=Personal)
def obtener_personal(personal_id: int):
    item = next((p for p in _db if p["id"] == personal_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Personal no encontrado")
    return item


@router.post("/", response_model=Personal, status_code=201)
def crear_personal(data: PersonalCreate):
    global _next_id
    nuevo = {"id": _next_id, **data.model_dump()}
    _db.append(nuevo)
    _next_id += 1
    return nuevo


@router.patch("/{personal_id}", response_model=Personal)
def actualizar_personal(personal_id: int, data: PersonalUpdate):
    item = next((p for p in _db if p["id"] == personal_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Personal no encontrado")
    for key, value in data.model_dump(exclude_none=True).items():
        item[key] = value
    return item


@router.delete("/{personal_id}", status_code=204)
def eliminar_personal(personal_id: int):
    global _db
    item = next((p for p in _db if p["id"] == personal_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Personal no encontrado")
    _db = [p for p in _db if p["id"] != personal_id]
