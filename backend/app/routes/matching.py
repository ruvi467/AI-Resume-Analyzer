from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.utils.skill_extractor import extract_skills
from app.models.resume import Resume
from app.models.job_description import JobDescription
from app.models.analysis import Analysis
from datetime import datetime

router = APIRouter()

@router.get("/match")
def match_resume(db: Session = Depends(get_db)):

    latest_resume = (
        db.query(Resume)
        .order_by(Resume.id.desc())
        .first()
   )
    print("Resume Path:", latest_resume.file_path)
    
    resume_skills = extract_skills(
        latest_resume.file_path
    )

    print("Resume Skills:", resume_skills)

    job = (
        db.query(JobDescription)
        .order_by(JobDescription.id.desc())
        .first()
    )

    if not job:
        return {
            "message": "No Job Description Found"
        }

    skills_database = [
        "Python",
        "FastAPI",
        "SQL",
        "JavaScript",
        "React",
        "HTML",
        "CSS",
        "Git",
        "Docker",
        "AWS",
        "MongoDB",
        "Machine Learning"
   ]

    job_skills = []

    for skill in skills_database:
        if skill.lower() in job.description.lower():
            job_skills.append(skill)

    print("Job Skills:", job_skills)

    matched_skills = list(
        set(resume_skills).intersection(job_skills)
    )
    print("Matched Skills:", matched_skills)

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
    new_analysis = Analysis(
        resume_name="Resume.pdf",
        ats_score=round(match_percentage, 2),
        match_percentage=round(match_percentage, 2),
        created_at=datetime.now()
    )

    db.add(new_analysis)
    db.commit()
    return {
        "resume_skills": resume_skills,
        "job_skills": job_skills,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "match_percentage": round(match_percentage, 2),
        "ats_score": round(match_percentage, 2),
        "suggestions": suggestions
    }