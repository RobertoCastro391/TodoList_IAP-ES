import pytest
from datetime import datetime
from app.services import user_service
from app.schemas.user_schema import UserCreate
from app.models.user import User

def test_create_user_success(db_session):
    # Arrange
    user_create = UserCreate(
        email="test1@test.com",
        username="testuser",
        cognito_id="cognito_test_id"
    )

    # Act
    user = user_service.create_user(db_session, user_create)

    # Assert
    assert user.id is not None
    assert user.email == user_create.email
    assert user.username == user_create.username
    assert user.cognito_id == user_create.cognito_id

def test_get_users_success(db_session):
    # Arrange
    user_create_1 = UserCreate(
        email="user1@test.com",
        username="user1",
        cognito_id="cognito_user_1"
    )
    user_create_2 = UserCreate(
        email="user2@test.com",
        username="user2",
        cognito_id="cognito_user_2"
    )
    user_service.create_user(db_session, user_create_1)
    user_service.create_user(db_session, user_create_2)

    # Act
    users = user_service.get_users(db_session)

    # Assert
    assert len(users) >= 2
    assert users[1].email == "user1@test.com"
    assert users[2].email == "user2@test.com"