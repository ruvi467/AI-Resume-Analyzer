from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.job_description import JobDescription

router = APIRouter()

@router.get("/match")
def match_resume(db: Session = Depends(get_db)):

    resume_skills = [
        "Python",
        "FastAPI",
        "SQL"
    ]

    job = (
        db.query(JobDescription)
        .order_by(JobDescription.id.desc())
        .first()
    )

    if not job:
        return {
            "message": "No Job Description Found"
        }

    job_skills = [
        skill.strip()
        for skill in job.description.split(",")
    ]

    matched_skills = list(
        set(resume_skills).intersection(job_skills)
    )

    missing_skills = list(
        set(job_skills) - set(resume_skills)
    )

    suggestions = []

    for skill in missing_skills:
        suggestions.append(
            f"Consider learning {skill}"
        )

    match_percentage = (
        len(matched_skills) /
        len(job_skills)
    ) * 100

    return {
        "resume_skills": resume_skills,
        "job_skills": job_skills,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "match_percentage": round(match_percentage, 2),
        "ats_score": round(match_percentage, 2),
        "suggestions": suggestions
    }