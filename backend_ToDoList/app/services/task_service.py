# services/task_service.py
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import asc, desc
from fastapi import HTTPException
from typing import List, Optional
from app.models.task import Task
from app.schemas.task_schema import TaskCreate, TaskUpdate
from datetime import datetime
from app.models.user import User
from app.models.enums import Priority, Status

def create_task(db: Session, task_create: TaskCreate, user_id) -> Task:

    # Explicitly map the priority and status to the Enum types
    priority_enum = Priority(task_create.priority.value if isinstance(task_create.priority, Priority) else task_create.priority)
    status_enum = Status(task_create.status.value if isinstance(task_create.status, Status) else task_create.status)

    # Create a new Task object
    task = Task(
        title=task_create.title,
        description=task_create.description,
        deadline=task_create.deadline,
        priority=priority_enum,
        status=status_enum,
        created_at=datetime.now(),
        updated_at=datetime.now(),
        user_id=user_id
    )
    
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

def get_user_tasks(
    db: Session,
    user_id: int,
    skip: int = 0,
    limit: int = 5,
    sort_by: str = "creation_date",
    order: str = "asc",
    status: Optional[bool] = None
) -> List[Task]:
    # Find user by id
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        # If the user does not exist, raise an HTTP exception
        raise HTTPException(status_code=404, detail="User not found")

    # Base query for user's tasks
    query = db.query(Task).filter(Task.user_id == user_id)

    # Apply completion status filter if provided
    if status is not None:
        query = query.filter(Task.completed == status)

    # Apply sorting based on the provided field and order
    sort_field = getattr(Task, sort_by, Task.created_at)  # Default to `creation_date` if field is invalid
    if order == "asc":
        query = query.order_by(asc(sort_field))
    else:
        query = query.order_by(desc(sort_field))

    # Apply pagination
    tasks = query.offset(skip).limit(limit).options(joinedload(Task.user)).all()
    return tasks

def get_tasks(db: Session) -> list:
    return db.query(Task).options(joinedload(Task.user)).all()


def update_task_status(db: Session, task_update: TaskUpdate) -> Task:
    
    # Find the task by id
    task = get_task_by_id(db=db, task_id=task_update.task_id)
    
    # Update the task status
    task.status = task_update.status
    task.updated_at = datetime.now()
    
    db.commit()
    db.refresh(task)

    return task

def update_task(db: Session, task_update: TaskUpdate) -> Task:
    
    task = get_task_by_id(db=db, task_id=task_update.task_id)
    
    # Update the task
    task.title = task_update.title if task_update.title is not None else task.title
    task.description = task_update.description if task_update.description is not None else task.description
    task.deadline = task_update.deadline if task_update.deadline is not None else task.deadline
    task.priority = task_update.priority if task_update.priority is not None else task.priority
    task.status = task_update.status if task_update.status is not None else task.status
    task.updated_at = datetime.now()

    db.commit()
    db.refresh(task)

    return task

def delete_task(db: Session, task_id: int):
    
    task = get_task_by_id(db=db, task_id=task_id)

    db.delete(task)
    db.commit()

    return task

def put_deadline_on_task(db: Session, task_update: TaskUpdate):
        
    task = get_task_by_id(db=db, task_id=task_update.task_id)
    
    task.deadline = task_update.deadline
    task.updated_at = datetime.now()

    db.commit()
    db.refresh(task)

    return task

def get_task_by_id(db: Session, task_id: int) -> Task:
    task = db.query(Task).options(joinedload(Task.user)).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task