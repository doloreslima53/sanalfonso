from pydantic import BaseModel, EmailStr
from typing import Optional


class PersonalBase(BaseModel):
    nombre: str
    apellido: str
    rol: str
    email: Optional[EmailStr] = None
    telefono: Optional[str] = None
    turno: Optional[str] = None


class PersonalCreate(PersonalBase):
    pass


class PersonalUpdate(BaseModel):
    nombre: Optional[str] = None
    apellido: Optional[str] = None
    rol: Optional[str] = None
    email: Optional[EmailStr] = None
    telefono: Optional[str] = None
    turno: Optional[str] = None


class Personal(PersonalBase):
    id: int

    class Config:
        from_attributes = True
