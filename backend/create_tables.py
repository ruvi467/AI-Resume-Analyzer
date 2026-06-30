from app.database.db import Base, engine

from app.models.user import User
from app.models.resume import Resume
from app.models.job_description import JobDescription
from app.models.analysis import Analysis

Base.metadata.create_all(bind=engine)

print("Tables created successfully")