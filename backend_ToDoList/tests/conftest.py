import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import get_db, Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from app.models.user import User  # Import the User model
from datetime import datetime

SQLALCHEMY_DATABASE_URL = "sqlite:///./test_tasks.db"

# Set up the test database engine and session
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Override the `get_db` dependency to use test database
def override_get_db() -> Session:
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

# Override app dependency
app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(scope="function")
def client():
    # Create tables for test database
    Base.metadata.create_all(bind=engine)

    # Add a test user directly to the database
    db = TestingSessionLocal()
    test_user = User(
        email="test@test.com",
        username="test",
        cognito_id="test",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.add(test_user)
    db.commit()
    db.refresh(test_user)

    with TestClient(app) as c:
        yield c

    # Drop tables after test
    Base.metadata.drop_all(bind=engine)