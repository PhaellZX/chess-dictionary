# Em backend/database.py

import os
from dotenv import load_dotenv
import motor.motor_asyncio # Importa o driver async do MongoDB

# Carrega as variáveis de ambiente do ficheiro .env
load_dotenv()

# Pega a string de conexão do ambiente
DATABASE_URL = os.getenv("DATABASE_URL")

# Verifica se a variável de ambiente foi carregada
if DATABASE_URL is None:
    raise ValueError("DATABASE_URL não foi definida no ficheiro .env")

# Cria uma instância do cliente Motor
client = motor.motor_asyncio.AsyncIOMotorClient(DATABASE_URL)

# Seleciona o banco de dados. 
# Pode dar o nome que quiser, ex: "chessdb"
# O MongoDB o criará automaticamente quando for usado.
db = client.chessdb