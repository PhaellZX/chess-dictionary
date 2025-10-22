# Em backend/test_db.py

import os
import asyncio
from dotenv import load_dotenv
import motor.motor_asyncio

async def check_connection():
    """
    Tenta ligar-se ao MongoDB e imprimir o status.
    """
    print("A carregar o ficheiro .env...")
    load_dotenv()

    DATABASE_URL = os.getenv("DATABASE_URL")

    if not DATABASE_URL:
        print("ERRO: A DATABASE_URL não foi encontrada no ficheiro .env!")
        return

    print(f"String de ligação encontrada. A tentar ligar a: {DATABASE_URL[:50]}...")

    try:
        # Adicionamos um 'timeout' de 5 segundos (5000ms)
        # Se demorar mais que 5s, vai dar erro em vez de "carregar infinito"
        client = motor.motor_asyncio.AsyncIOMotorClient(
            DATABASE_URL,
            serverSelectionTimeoutMS=5000  # <--- Esta é a parte importante
        )

        # Tenta "pingar" o servidor
        await client.server_info()

        print("\n" + "="*30)
        print(" SUCESSO! A LIGAÇÃO FUNCIONOU!")
        print("="*30)

    except Exception as e:
        print("\n" + "!"*30)
        print(" FALHA NA LIGAÇÃO. Erro:")
        print(e)
        print("!"*30)

# Bloco para executar a nossa função assíncrona
if __name__ == "__main__":
    asyncio.run(check_connection())