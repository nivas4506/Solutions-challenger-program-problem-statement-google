from sqlalchemy import Column, Integer, String, Text, DateTime
from database import Base
import datetime

class Asset(Base):
    __tablename__ = "assets"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, index=True)
    status = Column(String, default="processing")
    digital_dna = Column(Text, nullable=True) # Will store the pHash sequence as JSON string
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
