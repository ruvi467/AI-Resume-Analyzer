from sqlalchemy import Column, Integer, Float, String, DateTime
from datetime import datetime

from app.database.db import Base

class Analysis(Base):
    __tablename__ = "analysis"

    id = Column(Integer, primary_key=True, index=True)
    resume_name = Column(String(255))
    ats_score = Column(Float)
    match_percentage = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)