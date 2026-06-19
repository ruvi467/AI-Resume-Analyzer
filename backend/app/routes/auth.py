from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.user_schema import UserCreate
from app.models.user import User
from app.database.db import get_db

from app.schemas.login_schema import LoginUser

router = APIRouter()

@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):

    new_user = User(
        name=user.name,
        email=user.email,
        password=user.password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User saved successfully",
        "user_id": new_user.id
    }
@router.post("/login")
def login(user: LoginUser, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:
        return {"message": "User not found"}

    if existing_user.password != user.password:
        return {"message": "Invalid password"}

    return {
        "message": "Login Successful",
        "user_id": existing_user.id,
        "name": existing_user.name
    }