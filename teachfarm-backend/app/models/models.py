from sqlalchemy import Column, Integer, String, Text, Enum, JSON
from app.database.database import Base
import enum

class CurrencyEnum(str, enum.Enum):
    LRD = "LRD"
    USD = "USD"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class Donation(Base):
    __tablename__ = "donations"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(Text)
    currency = Column(Enum(CurrencyEnum), default=CurrencyEnum.USD)
    orangemoneyname = Column(String)
    orangemoneynumber = Column(String)
    mtnmoneyname = Column(String)
    mtnmoneynumber = Column(String)

class DonorInfo(Base):
    __tablename__ = "donor_infos"
    id = Column(Integer, primary_key=True, index=True)
    donorsname = Column(String)
    donorsamount = Column(Integer)
    dornorsnumber = Column(String)

class OurProgram(Base):
    __tablename__ = "our_programs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text) # Strapi blocks can be complex, using Text for simple porting
    image_url = Column(String)
    icon = Column(String)

class TeamMember(Base):
    __tablename__ = "team_members"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    role = Column(String)
    bio = Column(Text)
    image_url = Column(String)

class Activity(Base):
    __tablename__ = "activities"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text)
    image_url = Column(String)

class Service(Base):
    __tablename__ = "services"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text)
    icon = Column(String, nullable=True) # Optional, e.g. "BookOpen"

class Testimonial(Base):
    __tablename__ = "testimonials"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    role = Column(String)
    quote = Column(Text)
    image_url = Column(String, nullable=True)

class CorePillar(Base):
    __tablename__ = "core_pillars"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text)

class HeroSlide(Base):
    __tablename__ = "hero_slides"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    subtitle = Column(Text)
    image_url = Column(String)
    button_text = Column(String, default="Learn More")
    button_link = Column(String, default="/about")
    order = Column(Integer, default=0)

class AboutSettings(Base):
    __tablename__ = "about_settings"
    id = Column(Integer, primary_key=True, index=True)
    mission_title = Column(String, default="Our Mission")
    mission_text = Column(Text)
    vision_title = Column(String, default="Our Vision")
    vision_text = Column(Text)
    goal_title = Column(String, default="Our Goal")
    goal_text = Column(Text)
    commitment_title = Column(String, default="Our Commitment")
    commitment_text = Column(Text)
    image_url = Column(String, nullable=True)

class ContactSettings(Base):
    __tablename__ = "contact_settings"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String)
    phone = Column(String)
    address = Column(String)
    map_url = Column(String, nullable=True)

class FooterSettings(Base):
    __tablename__ = "footer_settings"
    id = Column(Integer, primary_key=True, index=True)
    facebook_url = Column(String, nullable=True)
    instagram_url = Column(String, nullable=True)
    linkedin_url = Column(String, nullable=True)
    whatsapp_url = Column(String, nullable=True)
    twitter_url = Column(String, nullable=True)
    copyright_text = Column(String, default="Teacher's Farm. All rights reserved.")

class ImpactStat(Base):
    __tablename__ = "impact_stats"
    id = Column(Integer, primary_key=True, index=True)
    stat = Column(String) # e.g. "700+"
    label = Column(String) # e.g. "Teachers Trained"
    icon = Column(String, default="Star") # Lucide icon name
