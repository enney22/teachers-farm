from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime
from app.models.models import CurrencyEnum

# Auth Schemas
class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# Donation Schemas
class DonationBase(BaseModel):
    name: str
    description: str
    currency: CurrencyEnum
    orangemoneyname: str
    orangemoneynumber: str
    mtnmoneyname: str
    mtnmoneynumber: str

class DonationCreate(DonationBase):
    pass

class Donation(DonationBase):
    id: int
    class Config:
        from_attributes = True

# Donor Info Schemas
class DonorInfoBase(BaseModel):
    donorsname: str
    donorsamount: int
    dornorsnumber: str

class DonorInfoCreate(DonorInfoBase):
    pass

class DonorInfo(DonorInfoBase):
    id: int
    class Config:
        from_attributes = True

# Our Program Schemas
class OurProgramBase(BaseModel):
    title: str
    description: str
    image_url: Optional[str] = None
    icon: Optional[str] = None

class OurProgramCreate(OurProgramBase):
    pass

class OurProgram(OurProgramBase):
    id: int
    class Config:
        from_attributes = True

# Team Member Schemas
class TeamMemberBase(BaseModel):
    name: str
    role: str
    bio: Optional[str] = None
    image_url: Optional[str] = None

class TeamMemberCreate(TeamMemberBase):
    pass

class TeamMember(TeamMemberBase):
    id: int
    class Config:
        from_attributes = True

# Activity Schemas
class ActivityBase(BaseModel):
    title: str
    description: str
    image_url: Optional[str] = None

class ActivityCreate(ActivityBase):
    pass

class Activity(ActivityBase):
    id: int
    class Config:
        from_attributes = True

# Service Schemas
class ServiceBase(BaseModel):
    title: str
    description: str
    icon: Optional[str] = None

class ServiceCreate(ServiceBase):
    pass

class Service(ServiceBase):
    id: int
    class Config:
        from_attributes = True

# Testimonial Schemas
class TestimonialBase(BaseModel):
    name: str
    role: str
    quote: str
    image_url: Optional[str] = None

class TestimonialCreate(TestimonialBase):
    pass

class Testimonial(TestimonialBase):
    id: int
    class Config:
        from_attributes = True

# Core Pillar Schemas
class CorePillarBase(BaseModel):
    title: str
    description: str

class CorePillarCreate(CorePillarBase):
    pass

class CorePillar(CorePillarBase):
    id: int
    class Config:
        from_attributes = True
