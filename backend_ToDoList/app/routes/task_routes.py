from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from app.models.task import Task
from app.schemas.task_schema import TaskCreate, TaskRead
from app.database import get_db
from app.services import task_service

router = APIRouter(
    prefix="/api/tasks",
    tags=["tasks"]
)


@router.post("/", response_model=TaskRead)
def create_task(task_create: TaskCreate, db: Session = Depends(get_db)):
    try:
        task_saved = task_service.create_task(db=db, task_create=task_create)
        return task_saved
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.get("/", response_model=List[TaskRead])
def read_tasks(db: Session = Depends(get_db)):
    tasks = task_service.get_tasks(db=db)
    return tasks