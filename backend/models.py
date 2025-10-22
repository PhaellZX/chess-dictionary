# Em backend/models.py

from pydantic import BaseModel, Field
from bson import ObjectId
from typing import List, Optional

# Esta é uma classe auxiliar para permitir que Pydantic
# lide com o ObjectId nativo do MongoDB.
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, *args, **kwargs):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema):
        field_schema.update(type="string")

# --- O Modelo Principal da Abertura ---
# Este será o formato que vamos guardar no DB e retornar pela API

class Opening(BaseModel):
    # O 'id' vem do MongoDB como '_id'. O alias resolve isso.
    # O 'default_factory' garante que podemos criar um novo id.
    # 'PyObjectId' é o nosso tipo personalizado acima.
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str = Field(...)
    eco_code: str = Field(...)
    pgn: str = Field(...)
    description: str = Field(...)
    plan_for_white: str = Field(...)
    plan_for_black: str = Field(...)
    
    # (Opcional, mas recomendado para Pydantic)
    # Permite que o Pydantic funcione corretamente com os aliases (ex: _id)
    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True # Necessário para PyObjectId
        json_encoders = {ObjectId: str} # <--- ADICIONE ESTA LINHA
        arbitrary_types_allowed = True # Necessário para PyObjectId
        json_schema_extra = {
            "example": {
                "name": "Ruy Lopez",
                "eco_code": "C60",
                "pgn": "1. e4 e5 2. Nf3 Nc6 3. Bb5",
                "description": "Uma das aberturas mais populares e clássicas...",
                "plan_for_white": "Controlar o centro, desenvolver peças.",
                "plan_for_black": "Desafiar o bispo de b5, desenvolver."
            }
        }