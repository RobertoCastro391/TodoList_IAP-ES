from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.models.enums import Priority, Status
from app.schemas.user_schema import UserRead

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    deadline: Optional[datetime] = None
    priority: Priority
    status: Status
    user_id: int

class TaskRead(TaskCreate):
    id: int
    created_at: datetime
    updated_at: datetime
    user: UserRead

    class Config:
        from_attributes = True