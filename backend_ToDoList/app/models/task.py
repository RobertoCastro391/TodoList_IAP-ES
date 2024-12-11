from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base
from app.models.enums import Priority, Status

class Task(Base):
    __tablename__ = 'task'

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    description = Column(String(255), nullable=True)
    deadline = Column(DateTime, nullable=True)
    priority = Column(Enum(Priority), nullable=False)
    status = Column(Enum(Status), nullable=False)
    created_at = Column(DateTime, default=datetime.now())
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now())
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)

    # Use string references for relationships to avoid circular imports
    user = relationship('User', back_populates='tasks')