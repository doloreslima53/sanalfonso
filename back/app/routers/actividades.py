from fastapi import APIRouter, HTTPException
from typing import List

from app.models.actividad import Actividad, ActividadCreate, ActividadUpdate

router = APIRouter()

_db: List[dict] = []
_next_id = 1


@router.get("/", response_model=List[Actividad])
def listar_actividades():
    return _db


@router.get("/{actividad_id}", response_model=Actividad)
def obtener_actividad(actividad_id: int):
    item = next((a for a in _db if a["id"] == actividad_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Actividad no encontrada")
    return item


@router.post("/", response_model=Actividad, status_code=201)
def crear_actividad(data: ActividadCreate):
    global _next_id
    nuevo = {"id": _next_id, **data.model_dump()}
    _db.append(nuevo)
    _next_id += 1
    return nuevo


@router.patch("/{actividad_id}", response_model=Actividad)
def actualizar_actividad(actividad_id: int, data: ActividadUpdate):
    item = next((a for a in _db if a["id"] == actividad_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Actividad no encontrada")
    for key, value in data.model_dump(exclude_none=True).items():
        item[key] = value
    return item


@router.delete("/{actividad_id}", status_code=204)
def eliminar_actividad(actividad_id: int):
    global _db
    item = next((a for a in _db if a["id"] == actividad_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Actividad no encontrada")
    _db = [a for a in _db if a["id"] != actividad_id]
