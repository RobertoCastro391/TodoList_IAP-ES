import pytest
from fastapi import HTTPException
from unittest.mock import patch
from datetime import datetime


def test_create_user_success(client):
    
    new_user = {
        "email": "teste",
        "username": "teste",
        "cognito_id": "teste"
    }

    mocked_user = {
        "id": 2,
        "email": "teste",
        "username": "teste",
        "cognito_id": "teste",
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    }

    with patch("app.services.user_service.create_user") as mock_create_user:
        mock_create_user.return_value = mocked_user
        response = client.post("/api/user/register", json=new_user)
        assert response.status_code == 200
        assert response.json() == mocked_user
    
def test_create_user_duplicate_email(client):
    new_user = {
        "email": "teste@example.com",
        "username": "teste",
        "cognito_id": "teste"
    }

    with patch("app.services.user_service.create_user") as mock_create_user:
        mock_create_user.side_effect = HTTPException(status_code=400, detail="User with this email already exists.")
        response = client.post("/api/user/register", json=new_user)
        assert response.status_code == 400
        assert response.json() == {"detail": "400: User with this email already exists."}

def test_get_users_success(client):
    mocked_users = [
        {
            "id": 1,
            "email": "teste",
            "username": "teste",
            "cognito_id": "teste",
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat()
        },
        {
            "id": 2,
            "email": "teste2",
            "username": "teste2",
            "cognito_id": "teste2",
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat()
        }
    ]

    with patch("app.services.user_service.get_users") as mock_get_users:
        mock_get_users.return_value = mocked_users
        response = client.get("/api/user/")
        assert response.status_code == 200
        assert response.json() == mocked_users