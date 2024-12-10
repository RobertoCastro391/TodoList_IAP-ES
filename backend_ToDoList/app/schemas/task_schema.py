from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional, List
from app.models.enums import Priority, Status
from app.schemas.user_schema import UserRead

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    deadline: Optional[datetime] = None
    priority: Priority
    status: Status
    user_id: Optional[int] = None

class TaskRead(TaskCreate):
    id: int
    created_at: datetime
    updated_at: datetime
    user: UserRead

    model_config = ConfigDict(from_attributes=True)


class TaskUpdate(BaseModel):
    task_id: int
    title: Optional[str] = None
    description: Optional[str] = None
    deadline: Optional[datetime] = None
    priority: Optional[Priority] = Priority.MEDIUM
    status: Optional[Status] = Status.PENDING

class TaskResponse(BaseModel):
    tasks: List[TaskRead]
    total_pages: int