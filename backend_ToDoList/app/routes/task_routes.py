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
        print(task_create)
        task_saved = task_service.create_task(db=db, task_create=task_create)
        return task_saved
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@router.get("/userTasks", response_model=List[TaskRead])
def read_user_tasks(user_id: int, db: Session = Depends(get_db)):
    tasks = task_service.get_user_tasks(db=db, user_id=user_id)
    return tasks
    
@router.get("/", response_model=List[TaskRead])
def read_tasks(db: Session = Depends(get_db)):
    tasks = task_service.get_tasks(db=db)
    return tasks