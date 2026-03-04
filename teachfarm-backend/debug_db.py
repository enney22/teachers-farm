import os
from sqlalchemy import select
from app.database.database import SessionLocal, engine
from app.models.models import TeamMember
from dotenv import load_dotenv

load_dotenv()

def check_data():
    db = SessionLocal()
    try:
        members = db.query(TeamMember).all()
        print(f"Total members: {len(members)}")
        for m in members:
            print(f"ID: {m.id}, Name: {m.name}, Image URL: {m.image_url}")
    finally:
        db.close()

if __name__ == "__main__":
    check_data()
