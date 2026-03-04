from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import engine, Base
from app.api.routers import public_api, auth, admin_crud

app = FastAPI(title="TeachFarm API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api")
app.include_router(public_api.router, prefix="/api")
app.include_router(admin_crud.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to TeachFarm API"}
