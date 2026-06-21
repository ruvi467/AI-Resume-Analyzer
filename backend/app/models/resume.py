from sqlalchemy import Column, Integer, String
from app.models.user import Base

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    file_name = Column(String(255))
    file_path = Column(String(500))