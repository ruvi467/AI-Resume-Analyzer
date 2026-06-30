from app.routes.dashboard import router as dashboard_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import Base, engine

from app.routes.auth import router as auth_router
from app.routes.resume import router as resume_router
from app.routes.job_description import router as job_router
from app.routes.matching import router as matching_router

from app.models.user import User
from app.models.resume import Resume
from app.models.job_description import JobDescription
from app.models.analysis import Analysis

app = FastAPI()

Base.metadata.create_all(bind=engine)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(job_router)
app.include_router(matching_router)
app.include_router(dashboard_router)

@app.get("/")
def home():
    return {
        "message": "AI Resume Analyzer Backend Running Successfully"
    }