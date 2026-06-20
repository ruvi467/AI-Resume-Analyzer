from fastapi import APIRouter

router = APIRouter()

@router.get("/match")
def match_resume():

    resume_skills = [
        "Python",
        "FastAPI",
        "SQL"
    ]

    job_skills = [
        "Python",
        "FastAPI",
        "SQL",
        "Machine Learning"
    ]

    matched_skills = list(
        set(resume_skills).intersection(job_skills)
    )

    match_percentage = (
        len(matched_skills) /
        len(job_skills)
    ) * 100

    return {
        "resume_skills": resume_skills,
        "job_skills": job_skills,
        "matched_skills": matched_skills,
        "match_percentage": round(match_percentage, 2)
    }