from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.database.db import get_db
from app.models.job_description import JobDescription

router = APIRouter()

class JobDescriptionRequest(BaseModel):
    description: str

@router.post("/job-description")
def add_job_description(
    data: JobDescriptionRequest,
    db: Session = Depends(get_db)
):
    job = JobDescription(
        user_id=1,
        description=data.description
    )

    db.add(job)
    db.commit()
    db.refresh(job)

    return {
        "message": "Job Description Saved",
        "job_id": job.id
    }