from fastapi import FastAPI
from app.routes.auth import router as auth_router
from app.routes.resume import router as resume_router
from app.routes.job_description import router as job_router
from app.routes.matching import router as matching_router
from app.models.user import User

app = FastAPI()

app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(job_router)
app.include_router(matching_router)

@app.get("/")
def home():
    return {
        "message": "AI Resume Analyzer Backend Running Successfully"
    }