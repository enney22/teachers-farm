from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import engine, Base
from app.api.routers import public_api, auth, admin_crud

# Create tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(title="TeachFarm API")

# Refined CORS configuration
origins = [
    "http://localhost:3000",
    "https://teachersfarm.vercel.app",
    "https://teachers-farm.vercel.app",
    "https://teachersfarm.com",
    "https://www.teachersfarm.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

app.include_router(auth.router, prefix="/api")
app.include_router(public_api.router, prefix="/api")
app.include_router(admin_crud.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to TeachFarm API"}
