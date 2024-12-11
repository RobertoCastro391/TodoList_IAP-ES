from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routes import task_routes, user_routes, auth_routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cria as tabelas no banco de dados
Base.metadata.create_all(bind=engine)

# Inclui as rotas de usuários
app.include_router(auth_routes.router)
app.include_router(task_routes.router)
app.include_router(user_routes.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the To-Do List API"}