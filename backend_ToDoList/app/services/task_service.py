# services/task_service.py
from sqlalchemy.orm import Session, joinedload
from app.models.task import Task
from app.schemas.task_schema import TaskCreate
from datetime import datetime
from app.models.enums import Priority, Status

def create_task(db: Session, task_create: TaskCreate) -> Task:
    # Explicitly map the priority and status to the Enum types
    priority_enum = Priority(task_create.priority.value if isinstance(task_create.priority, Priority) else task_create.priority)
    status_enum = Status(task_create.status.value if isinstance(task_create.status, Status) else task_create.status)
    
    task = Task(
        title=task_create.title,
        description=task_create.description,
        deadline=task_create.deadline,
        priority=priority_enum,
        status=status_enum,
        created_at=datetime.now(),
        updated_at=datetime.now(),
        user_id=task_create.user_id
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

def get_tasks(db: Session) -> list:
    return db.query(Task).options(joinedload(Task.user)).all()