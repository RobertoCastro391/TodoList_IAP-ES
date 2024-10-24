# app/routes/user_routes.py
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from app.schemas.user_schema import UserCreate, UserRead
from app.database import get_db
from app.services import user_service

router = APIRouter(
    prefix="/api/user",
    tags=["user"]
)

@router.post("/register", response_model=UserRead)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    try:
        user_saved = user_service.create_user(db=db, user_create=user)
        return user_saved
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[UserRead])
def get_users(db: Session = Depends(get_db)):
    return user_service.get_users(db=db)
