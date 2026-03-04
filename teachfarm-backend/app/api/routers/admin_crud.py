from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models import models
from app.schemas import schemas
from app.api.routers.auth import get_current_user
from typing import List

router = APIRouter(prefix="/admin", tags=["Admin CRUD"], dependencies=[Depends(get_current_user)])

# Team Members CRUD
@router.post("/team-members", response_model=schemas.TeamMember)
def create_team_member(member: schemas.TeamMemberCreate, db: Session = Depends(get_db)):
    db_member = models.TeamMember(**member.dict())
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return db_member

@router.put("/team-members/{member_id}", response_model=schemas.TeamMember)
def update_team_member(member_id: int, member: schemas.TeamMemberCreate, db: Session = Depends(get_db)):
    db_member = db.query(models.TeamMember).filter(models.TeamMember.id == member_id).first()
    if not db_member:
        raise HTTPException(status_code=404, detail="Member not found")
    for key, value in member.dict().items():
        setattr(db_member, key, value)
    db.commit()
    db.refresh(db_member)
    return db_member

@router.delete("/team-members/{member_id}")
def delete_team_member(member_id: int, db: Session = Depends(get_db)):
    db_member = db.query(models.TeamMember).filter(models.TeamMember.id == member_id).first()
    if not db_member:
        raise HTTPException(status_code=404, detail="Member not found")
    db.delete(db_member)
    db.commit()
    return {"message": "Member deleted successfully"}

# Our Programs CRUD
@router.post("/programs", response_model=schemas.OurProgram)
def create_program(program: schemas.OurProgramCreate, db: Session = Depends(get_db)):
    db_program = models.OurProgram(**program.dict())
    db.add(db_program)
    db.commit()
    db.refresh(db_program)
    return db_program

@router.put("/programs/{program_id}", response_model=schemas.OurProgram)
def update_program(program_id: int, program: schemas.OurProgramCreate, db: Session = Depends(get_db)):
    db_program = db.query(models.OurProgram).filter(models.OurProgram.id == program_id).first()
    if not db_program:
        raise HTTPException(status_code=404, detail="Program not found")
    for key, value in program.dict().items():
        setattr(db_program, key, value)
    db.commit()
    db.refresh(db_program)
    return db_program

@router.delete("/programs/{program_id}")
def delete_program(program_id: int, db: Session = Depends(get_db)):
    db_program = db.query(models.OurProgram).filter(models.OurProgram.id == program_id).first()
    if not db_program:
        raise HTTPException(status_code=404, detail="Program not found")
    db.delete(db_program)
    db.commit()
    return {"message": "Program deleted successfully"}

# Donations CRUD
@router.post("/donations", response_model=schemas.Donation)
def create_donation(donation: schemas.DonationCreate, db: Session = Depends(get_db)):
    db_donation = models.Donation(**donation.dict())
    db.add(db_donation)
    db.commit()
    db.refresh(db_donation)
    return db_donation

@router.put("/donations/{donation_id}", response_model=schemas.Donation)
def update_donation(donation_id: int, donation: schemas.DonationCreate, db: Session = Depends(get_db)):
    db_donation = db.query(models.Donation).filter(models.Donation.id == donation_id).first()
    if not db_donation:
        raise HTTPException(status_code=404, detail="Donation not found")
    for key, value in donation.dict().items():
        setattr(db_donation, key, value)
    db.commit()
    db.refresh(db_donation)
    return db_donation

@router.delete("/donations/{donation_id}")
def delete_donation(donation_id: int, db: Session = Depends(get_db)):
    db_donation = db.query(models.Donation).filter(models.Donation.id == donation_id).first()
    if not db_donation:
        raise HTTPException(status_code=404, detail="Donation not found")
    db.delete(db_donation)
    db.commit()
    return {"message": "Donation deleted successfully"}

# Activities CRUD
@router.post("/activities", response_model=schemas.Activity)
def create_activity(activity: schemas.ActivityCreate, db: Session = Depends(get_db)):
    db_activity = models.Activity(**activity.dict())
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)
    return db_activity

@router.put("/activities/{activity_id}", response_model=schemas.Activity)
def update_activity(activity_id: int, activity: schemas.ActivityCreate, db: Session = Depends(get_db)):
    db_activity = db.query(models.Activity).filter(models.Activity.id == activity_id).first()
    if not db_activity:
        raise HTTPException(status_code=404, detail="Activity not found")
    for key, value in activity.dict().items():
        setattr(db_activity, key, value)
    db.commit()
    db.refresh(db_activity)
    return db_activity

@router.delete("/activities/{activity_id}")
def delete_activity(activity_id: int, db: Session = Depends(get_db)):
    db_activity = db.query(models.Activity).filter(models.Activity.id == activity_id).first()
    if not db_activity:
        raise HTTPException(status_code=404, detail="Activity not found")
    db.delete(db_activity)
    db.commit()
    return {"message": "Activity deleted successfully"}

# Services CRUD
@router.post("/services", response_model=schemas.Service)
def create_service(service: schemas.ServiceCreate, db: Session = Depends(get_db)):
    db_service = models.Service(**service.dict())
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service

@router.put("/services/{service_id}", response_model=schemas.Service)
def update_service(service_id: int, service: schemas.ServiceCreate, db: Session = Depends(get_db)):
    db_service = db.query(models.Service).filter(models.Service.id == service_id).first()
    if not db_service:
        raise HTTPException(status_code=404, detail="Service not found")
    for key, value in service.dict().items():
        setattr(db_service, key, value)
    db.commit()
    db.refresh(db_service)
    return db_service

@router.delete("/services/{service_id}")
def delete_service(service_id: int, db: Session = Depends(get_db)):
    db_service = db.query(models.Service).filter(models.Service.id == service_id).first()
    if not db_service:
        raise HTTPException(status_code=404, detail="Service not found")
    db.delete(db_service)
    db.commit()
    return {"message": "Service deleted successfully"}

# Testimonials CRUD
@router.post("/testimonials", response_model=schemas.Testimonial)
def create_testimonial(testimonial: schemas.TestimonialCreate, db: Session = Depends(get_db)):
    db_testimonial = models.Testimonial(**testimonial.dict())
    db.add(db_testimonial)
    db.commit()
    db.refresh(db_testimonial)
    return db_testimonial

@router.put("/testimonials/{testimonial_id}", response_model=schemas.Testimonial)
def update_testimonial(testimonial_id: int, testimonial: schemas.TestimonialCreate, db: Session = Depends(get_db)):
    db_testimonial = db.query(models.Testimonial).filter(models.Testimonial.id == testimonial_id).first()
    if not db_testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    for key, value in testimonial.dict().items():
        setattr(db_testimonial, key, value)
    db.commit()
    db.refresh(db_testimonial)
    return db_testimonial

@router.delete("/testimonials/{testimonial_id}")
def delete_testimonial(testimonial_id: int, db: Session = Depends(get_db)):
    db_testimonial = db.query(models.Testimonial).filter(models.Testimonial.id == testimonial_id).first()
    if not db_testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    db.delete(db_testimonial)
    db.commit()
    return {"message": "Testimonial deleted successfully"}

# Core Pillars CRUD
@router.post("/core-pillars", response_model=schemas.CorePillar)
def create_core_pillar(pillar: schemas.CorePillarCreate, db: Session = Depends(get_db)):
    db_pillar = models.CorePillar(**pillar.dict())
    db.add(db_pillar)
    db.commit()
    db.refresh(db_pillar)
    return db_pillar

@router.put("/core-pillars/{pillar_id}", response_model=schemas.CorePillar)
def update_core_pillar(pillar_id: int, pillar: schemas.CorePillarCreate, db: Session = Depends(get_db)):
    db_pillar = db.query(models.CorePillar).filter(models.CorePillar.id == pillar_id).first()
    if not db_pillar:
        raise HTTPException(status_code=404, detail="Core Pillar not found")
    for key, value in pillar.dict().items():
        setattr(db_pillar, key, value)
    db.commit()
    db.refresh(db_pillar)
    return db_pillar

@router.delete("/core-pillars/{pillar_id}")
def delete_core_pillar(pillar_id: int, db: Session = Depends(get_db)):
    db_pillar = db.query(models.CorePillar).filter(models.CorePillar.id == pillar_id).first()
    if not db_pillar:
        raise HTTPException(status_code=404, detail="Core Pillar not found")
    db.delete(db_pillar)
    db.commit()
    return {"message": "Core Pillar deleted successfully"}
# Donor Infos CRUD
@router.get("/donor-infos", response_model=List[schemas.DonorInfo])
def read_donor_infos(db: Session = Depends(get_db)):
    return db.query(models.DonorInfo).all()

@router.put("/donor-infos/{donor_id}", response_model=schemas.DonorInfo)
def update_donor_info(donor_id: int, donor: schemas.DonorInfoCreate, db: Session = Depends(get_db)):
    db_donor = db.query(models.DonorInfo).filter(models.DonorInfo.id == donor_id).first()
    if not db_donor:
        raise HTTPException(status_code=404, detail="Donor record not found")
    for key, value in donor.dict().items():
        setattr(db_donor, key, value)
    db.commit()
    db.refresh(db_donor)
    return db_donor

@router.delete("/donor-infos/{donor_id}")
def delete_donor_info(donor_id: int, db: Session = Depends(get_db)):
    db_donor = db.query(models.DonorInfo).filter(models.DonorInfo.id == donor_id).first()
    if not db_donor:
        raise HTTPException(status_code=404, detail="Donor record not found")
    db.delete(db_donor)
    db.commit()
    return {"message": "Donor record deleted successfully"}
