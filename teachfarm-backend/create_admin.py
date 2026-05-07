import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database.database import SessionLocal
from app.models import models
from app.core import security

def create_admin():
    db = SessionLocal()
    try:
        # Check if user already exists
        existing_user = db.query(models.User).filter(models.User.username == "admin").first()
        if existing_user:
            print("User 'admin' already exists.")
            return

        # Create new admin user
        new_user = models.User(
            username="admin",
            email="admin@teachersfarm.com",
            hashed_password=security.get_password_hash("password123")
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        print("Successfully created admin user!")
        print("Username: admin")
        print("Password: password123")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    create_admin()
