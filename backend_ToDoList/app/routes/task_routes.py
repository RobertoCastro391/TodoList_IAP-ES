from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.task import Task
from app.schemas.task_schema import TaskCreate, TaskRead, TaskUpdate
from app.database import get_db
from app.services import task_service, auth_service

router = APIRouter(
    prefix="/api/tasks",
    tags=["tasks"]
)


@router.post("/", response_model=TaskRead)
def create_task(task_create: TaskCreate, db: Session = Depends(get_db), user = Depends(auth_service.get_current_user)):
        
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")

    task_saved = task_service.create_task(db=db, task_create=task_create, user_id=user.id)
    return task_saved
    

@router.get("/userTasks", response_model=List[TaskRead])
def read_user_tasks(
    db: Session = Depends(get_db),
    user=Depends(auth_service.get_current_user),
    page: int = Query(1, ge=1, description="Page number starting from 1"),
    limit: int = Query(5, ge=1, le=100, description="Number of tasks per page (max 100)"),
    sort_by: Optional[str] = Query("creation_date", description="Field to sort by: creation_date, deadline, or completion_status"),
    order: Optional[str] = Query("asc", description="Sort order: asc or desc"),
    status: Optional[bool] = Query(None, description="Filter by completion status: true for completed, false for not completed")
):
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    skip = (page - 1) * limit

    # Call the service function with sorting, filtering, and pagination
    tasks = task_service.get_user_tasks(
        db=db,
        user_id=user.id,
        skip=skip,
        limit=limit,
        sort_by=sort_by,
        order=order,
        status=status
    )
    return tasks

@router.put("/updateStatus", response_model=TaskRead)
def update_task_status(task_update: TaskUpdate, db: Session = Depends(get_db)):
    task = task_service.update_task_status(db=db, task_update=task_update)
    return task

@router.put("/editTask", response_model=TaskRead)
def update_task(task_update: TaskUpdate, db: Session = Depends(get_db)):
    task = task_service.update_task(db=db, task_update=task_update)
    return task

@router.put("/updatePriority", response_model=TaskRead)
def update_task_priority(task_update: TaskUpdate, db: Session = Depends(get_db)):
    task = task_service.update_task(db=db, task_update=task_update)
    return task

@router.delete("/deleteTask", response_model=TaskRead)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = task_service.delete_task(db=db, task_id=task_id)
    return task

@router.put("/deadline", response_model=TaskRead)
def put_deadline_on_task(task_update: TaskUpdate, db: Session = Depends(get_db)):
    task = task_service.put_deadline_on_task(db=db, task_update=task_update)
    return task
    
@router.get("/", response_model=List[TaskRead])
def read_tasks(db: Session = Depends(get_db)):
    tasks = task_service.get_tasks(db=db)
    return tasks