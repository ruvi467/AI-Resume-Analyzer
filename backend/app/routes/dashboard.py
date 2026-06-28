from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.db import get_db
from app.models.analysis import Analysis

router = APIRouter()


@router.get("/dashboard-stats")
def dashboard_stats(db: Session = Depends(get_db)):
    total_analyses = db.query(Analysis).count()

    average_score = db.query(
        func.avg(Analysis.ats_score)
    ).scalar()

    best_score = db.query(
        func.max(Analysis.ats_score)
    ).scalar()

    recent = (
        db.query(Analysis)
        .order_by(Analysis.id.desc())
        .limit(5)
        .all()
    )

    return {
        "total_analyses": total_analyses,
        "average_score": round(average_score or 0, 2),
        "best_score": round(best_score or 0, 2),
        "recent_analyses": [
            {
                "id": item.id,
                "resume_name": item.resume_name,
                "ats_score": item.ats_score,
                "created_at": str(item.created_at)
            }
            for item in recent
        ]
    }