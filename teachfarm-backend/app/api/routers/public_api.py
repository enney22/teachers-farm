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
