from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models import models
from app.schemas import schemas
from typing import List

router = APIRouter(prefix="/public", tags=["Public API"])

@router.get("/team-members", response_model=List[schemas.TeamMember])
def read_team_members(db: Session = Depends(get_db)):
    return db.query(models.TeamMember).all()

@router.get("/programs", response_model=List[schemas.OurProgram])
def read_programs(db: Session = Depends(get_db)):
    return db.query(models.OurProgram).all()

@router.get("/donations", response_model=List[schemas.Donation])
def read_donations(db: Session = Depends(get_db)):
    return db.query(models.Donation).all()

@router.post("/donor-infos", response_model=schemas.DonorInfo)
def create_donor_info(donor: schemas.DonorInfoCreate, db: Session = Depends(get_db)):
    db_donor = models.DonorInfo(**donor.dict())
    db.add(db_donor)
    db.commit()
    db.refresh(db_donor)
    return db_donor

@router.get("/activities", response_model=List[schemas.Activity])
def read_activities(db: Session = Depends(get_db)):
    return db.query(models.Activity).all()

@router.get("/services", response_model=List[schemas.Service])
def read_services(db: Session = Depends(get_db)):
    return db.query(models.Service).all()

@router.get("/testimonials", response_model=List[schemas.Testimonial])
def read_testimonials(db: Session = Depends(get_db)):
    return db.query(models.Testimonial).all()

@router.get("/core-pillars", response_model=List[schemas.CorePillar])
def read_core_pillars(db: Session = Depends(get_db)):
    return db.query(models.CorePillar).all()

@router.get("/hero-slides", response_model=List[schemas.HeroSlide])
def read_hero_slides(db: Session = Depends(get_db)):
    return db.query(models.HeroSlide).order_by(models.HeroSlide.order).all()

@router.get("/about-settings", response_model=schemas.AboutSettings)
def read_about_settings(db: Session = Depends(get_db)):
    settings = db.query(models.AboutSettings).first()
    if not settings:
        return models.AboutSettings(id=0, mission_text="", vision_text="", goal_text="", commitment_text="")
    return settings

@router.get("/contact-settings", response_model=schemas.ContactSettings)
def read_contact_settings(db: Session = Depends(get_db)):
    settings = db.query(models.ContactSettings).first()
    if not settings:
        return models.ContactSettings(id=0, email="info@teachfarm.org", phone="+231-xxx-xxx", address="Monrovia, Liberia")
    return settings

@router.get("/footer-settings", response_model=schemas.FooterSettings)
def read_footer_settings(db: Session = Depends(get_db)):
    settings = db.query(models.FooterSettings).first()
    if not settings:
        return models.FooterSettings(id=0, copyright_text="Teacher's Farm. All rights reserved.")
    return settings

@router.get("/impact-stats", response_model=List[schemas.ImpactStat])
def read_impact_stats(db: Session = Depends(get_db)):
    return db.query(models.ImpactStat).all()

@router.post("/contact-messages", response_model=schemas.ContactMessage)
def create_contact_message(message: schemas.ContactMessageCreate, db: Session = Depends(get_db)):
    db_message = models.ContactMessage(**message.dict())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message
