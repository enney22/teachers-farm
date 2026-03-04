import sys
import os

# Add the current directory to sys.path to allow imports from "app"
sys.path.append(os.getcwd())

from app.database.database import engine, Base, SessionLocal
from app.models import models
from app.core.security import get_password_hash

def init_db():
    print("Database Initialization Started.")
    try:
        print("Creating tables if they don't exist...")
        Base.metadata.create_all(bind=engine)
        print("Tables created/verified.")
        
        db = SessionLocal()
        try:
            print("Checking for existing admin user...")
            admin = db.query(models.User).filter(models.User.username == "admin").first()
            if not admin:
                print("Seeding default admin user...")
                # We use a try-except here to catch SPECIFIC hashing issues
                try:
                    hashed_pw = get_password_hash("admin123")
                    new_admin = models.User(
                        username="admin",
                        email="admin@teachfarm.org",
                        hashed_password=hashed_pw
                    )
                    db.add(new_admin)
                    db.commit()
                    print("SUCCESS: Admin user created.")
                    print("Username: admin")
                    print("Password: admin123")
                except Exception as hash_err:
                    print(f"HASH ERROR: Failed to hash password: {hash_err}")
            else:
                print("INFO: Admin user already exists.")
        except Exception as seed_err:
            print(f"SEED ERROR: Database operation failed: {seed_err}")
        finally:
            db.close()
    except Exception as db_err:
        print(f"DB ERROR: Failed to connect or create tables: {db_err}")

if __name__ == "__main__":
    init_db()
