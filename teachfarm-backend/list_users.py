import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database.database import SessionLocal
from app.models import models

def list_users():
    db = SessionLocal()
    try:
        users = db.query(models.User).all()
        if not users:
            print("No users found in the database.")
        else:
            print(f"Found {len(users)} users:")
            for user in users:
                print(f"ID: {user.id} | Username: {user.username} | Email: {user.email}")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    list_users()
