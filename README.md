# ♟️ Dicionário de Xadrez (FARM Stack)

Projeto full-stack (FastAPI + React + MongoDB) para visualizar aberturas de xadrez.

---

## 🛠️ Instalação

### 1. MongoDB Atlas
1.  Crie um cluster M0 gratuito no [MongoDB Atlas](https://cloud.mongodb.com/).
2.  Em **"Network Access"**, adicione o IP `0.0.0.0/0` (Allow Access from Anywhere).
3.  Em **"Database Users"**, crie um usuário (ex: `PhaellZX`) e senha.
4.  Copie a **String de Conexão** (Drivers).

### 2. Backend (FastAPI)

1.  Clone o projeto e entre na pasta `backend`:
    ```bash
    git clone [https://github.com/seu-usuario/chess-dictionary.git](https://github.com/seu-usuario/chess-dictionary.git)
    cd chess-dictionary/backend
    ```
2.  Crie e ative um `venv`:
    ```bash
    python -m venv venv
    source venv/Scripts/activate
    ```
3.  Instale as dependências:
    ```bash
    (venv) pip install fastapi uvicorn[standard] motor python-dotenv pydantic
    ```
4.  Crie o arquivo `backend/.env` e cole sua string de conexão:
    ```
    DATABASE_URL=mongodb+srv://PhaellZX:<senha>@seu-cluster.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    ```

### 3. Frontend (React)

1.  Abra um **novo terminal** e entre na pasta `frontend`:
    ```bash
    cd chess-dictionary/frontend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```

---

## ▶️ Rodar

**Terminal 1 (Backend):**
```bash
cd backend
source venv/Scripts/activate
(venv) uvicorn main:app --reload
# ↪ [http://127.0.0.1:8000](http://127.0.0.1:8000)
```

**Terminal 2 (frontend):**
```bash
cd frontend
npm run dev
# ↪ http://localhost:5173
```