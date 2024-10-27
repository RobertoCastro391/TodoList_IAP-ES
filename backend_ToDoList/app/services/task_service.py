# services/task_service.py
from sqlalchemy.orm import Session, joinedload
from sqlalchemy.exc import NoResultFound
from fastapi import HTTPException
from app.models.task import Task
from app.schemas.task_schema import TaskCreate, TaskUpdate
from datetime import datetime
from app.models.user import User
from app.models.enums import Priority, Status

def create_task(db: Session, task_create: TaskCreate) -> Task:
    try:
        # Check if user exists
        user = db.query(User).filter(User.id == task_create.user_id).one()
        print("task_create")
        print(user)

    except NoResultFound:
        # Raise an HTTP exception if the user does not exist
        raise HTTPException(status_code=404, detail="User not found")

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
        user_id=user.id
    )
    
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

def get_user_tasks(db: Session, user_id: int) -> list:
    # Find user by id
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        # If the user does not exist, raise an HTTP exception
        raise HTTPException(status_code=404, detail="User not found")

    return db.query(Task).filter(Task.user_id == user_id).options(joinedload(Task.user)).all()

def get_tasks(db: Session) -> list:
    return db.query(Task).options(joinedload(Task.user)).all()


def update_task_status(db: Session, task_update: TaskUpdate) -> Task:
    
    # Find the task by id
    task = db.query(Task).filter(Task.id == task_update.task_id).first()

    if not task:
        # If the task does not exist, raise an HTTP exception
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Update the task status
    task.status = task_update.status
    db.commit()
    db.refresh(task)

    return task