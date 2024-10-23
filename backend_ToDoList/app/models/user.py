from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, autoincrement=True)
    cognito_id = Column(String(255), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.now())
    updated_at = Column(DateTime, default=datetime.now())

    tasks = relationship('Task', back_populates='user')