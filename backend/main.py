# Em backend/main.py

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List

# Importa o db (conexão) e o modelo (schema)
from database import db
from models import Opening

app = FastAPI()

# --- Configuração do CORS ---
# Isto é crucial. Permite que o seu frontend (ex: http://localhost:5173)
# faça pedidos a este backend (ex: http://localhost:8000).

origins = [
    "http://localhost:5173",  # Endereço padrão do Vite (React)
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Nossos Endpoints (Rotas da API) ---

@app.get("/")
async def root():
    return {"message": "Servidor do Dicionário de Xadrez está no ar!"}


# Este é o nosso endpoint principal do MVP
@app.get("/api/openings/{eco_code}", response_model=Opening)
async def get_opening_by_eco(eco_code: str):
    """
    Busca uma abertura no banco de dados pelo seu código ECO.
    """
    
    # db.openings se refere à coleção 'openings' no MongoDB
    opening_data = await db.openings.find_one({"eco_code": eco_code})
    
    if opening_data:
        # Se encontrarmos, retornamos os dados.
        # O Pydantic (via response_model) validará e converterá
        # o _id para id automaticamente.
        return opening_data
    
    # Se não encontrarmos, lançamos um erro 404
    raise HTTPException(status_code=404, detail=f"Abertura com código {eco_code} não encontrada.")