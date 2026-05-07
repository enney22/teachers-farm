from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import engine, Base
from app.api.routers import public_api, auth, admin_crud
from fastapi import UploadFile, File
from fastapi.staticfiles import StaticFiles
import os
import shutil
import uuid

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

# Ensure uploads directory exists
UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

# Mount static files to serve uploads
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    # Generate unique filename
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return {"url": f"/uploads/{unique_filename}"}

@app.get("/")
def read_root():
    return {"message": "Welcome to TeachFarm API"}
