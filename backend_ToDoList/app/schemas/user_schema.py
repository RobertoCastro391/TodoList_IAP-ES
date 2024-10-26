from pydantic import BaseModel, ConfigDict
from datetime import datetime

class UserCreate(BaseModel):
    email: str
    username: str
    cognito_id: str

class UserRead(UserCreate):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)