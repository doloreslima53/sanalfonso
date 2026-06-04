from pydantic import BaseModel
from typing import Optional
from datetime import date


class ResidenteBase(BaseModel):
    nombre: str
    apellido: str
    fecha_nacimiento: date
    dni: str
    habitacion: Optional[str] = None
    diagnostico: Optional[str] = None
    contacto_familiar: Optional[str] = None
    telefono_familiar: Optional[str] = None


class ResidenteCreate(ResidenteBase):
    pass


class ResidenteUpdate(BaseModel):
    nombre: Optional[str] = None
    apellido: Optional[str] = None
    habitacion: Optional[str] = None
    diagnostico: Optional[str] = None
    contacto_familiar: Optional[str] = None
    telefono_familiar: Optional[str] = None


class Residente(ResidenteBase):
    id: int

    class Config:
        from_attributes = True
