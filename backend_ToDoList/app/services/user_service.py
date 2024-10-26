from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user_schema import UserCreate, UserRead
from datetime import datetime
from typing import List

def create_user(db: Session, user_create: UserCreate) -> User:
    user = User(
        email=user_create.email,
        username=user_create.username,
        cognito_id=user_create.cognito_id,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_users(db: Session) -> List[UserRead]:
    users = db.query(User).all()
    return [UserRead.model_validate(user) for user in users]
