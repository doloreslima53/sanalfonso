from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ActividadBase(BaseModel):
    titulo: str
    descripcion: Optional[str] = None
    fecha_hora: datetime
    responsable: Optional[str] = None
    capacidad_maxima: Optional[int] = None


class ActividadCreate(ActividadBase):
    pass


class ActividadUpdate(BaseModel):
    titulo: Optional[str] = None
    descripcion: Optional[str] = None
    fecha_hora: Optional[datetime] = None
    responsable: Optional[str] = None
    capacidad_maxima: Optional[int] = None


class Actividad(ActividadBase):
    id: int

    class Config:
        from_attributes = True
