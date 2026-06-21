from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app.schemas.user_schema import UserCreate
from app.models.user import User
from app.database.db import get_db
from app.schemas.login_schema import LoginUser

router = APIRouter()

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):

    hashed_password = pwd_context.hash(
        user.password
    )

    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password
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

    if not pwd_context.verify(
        user.password,
        existing_user.password
    ):
        return {"message": "Invalid password"}

    return {
        "message": "Login Successful",
        "user_id": existing_user.id,
        "name": existing_user.name
    }