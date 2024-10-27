from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from app.models.task import Task
from app.schemas.task_schema import TaskCreate, TaskRead, TaskUpdate
from app.database import get_db
from app.services import task_service

router = APIRouter(
    prefix="/api/tasks",
    tags=["tasks"]
)


@router.post("/", response_model=TaskRead)
def create_task(task_create: TaskCreate, db: Session = Depends(get_db)):
        task_saved = task_service.create_task(db=db, task_create=task_create)
        return task_saved
    

@router.get("/userTasks", response_model=List[TaskRead])
def read_user_tasks(user_id: int, db: Session = Depends(get_db)):
    tasks = task_service.get_user_tasks(db=db, user_id=user_id)
    return tasks

@router.put("/updateStatus", response_model=TaskRead)
def update_task_status(task_update: TaskUpdate, db: Session = Depends(get_db)):
    task = task_service.update_task_status(db=db, task_update=task_update)
    return task
    
@router.get("/", response_model=List[TaskRead])
def read_tasks(db: Session = Depends(get_db)):
    tasks = task_service.get_tasks(db=db)
    return tasks
