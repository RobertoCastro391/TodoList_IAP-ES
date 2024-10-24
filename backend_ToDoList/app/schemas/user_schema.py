from pydantic import BaseModel
from datetime import datetime

class UserCreate(BaseModel):
    email: str
    username: str
    cognito_id: str

class UserRead(UserCreate):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True