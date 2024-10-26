from sqlalchemy import Column, Integer, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base
from app.models.enums import Status

class TaskHistory(Base):
    __tablename__ = 'task_history'

    id = Column(Integer, primary_key=True, autoincrement=True)
    status_before = Column(Enum(Status), nullable=False)
    status_after = Column(Enum(Status), nullable=False)
    changed_at = Column(DateTime, default=datetime.now())
    task_id = Column(Integer, ForeignKey('task.id'), nullable=False)

    # Use string reference for task relationship
    task = relationship('Task', back_populates='history')
