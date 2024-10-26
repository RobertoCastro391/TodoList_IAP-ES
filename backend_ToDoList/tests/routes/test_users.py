import pytest
from unittest.mock import patch

# Test creating a task
def test_create_user(client):

    new_user = {
        "email": "teste@teste",
        "username": "testuser",
        "cognito_id": "testcognitoid"
    }

    # Act
    response = client.post("/api/user/register", json=new_user)

    # Assert
    assert response.status_code == 200
    data = response.json()

    print(data)

def test_create_user_exception_handling(client):
    # Arrange: Mock the create_user method to raise an exception
    user_create_data = {
        "email": "teste@test",
        "username": "testuser",
        "cognito_id": "testcognitoid"
    }

    with patch('app.services.user_service.create_user') as mock_create_user:
        mock_create_user.side_effect = Exception("Test Exception")

        # Act
        response = client.post("/api/user/register", json=user_create_data)

        # Assert
        assert response.status_code == 400
        assert response.json() == {"detail": "Test Exception"}
    
def test_read_all_users(client):

    new_user = {
        "email": "teste@teste",
        "username": "testuser",
        "cognito_id": "testcognitoid"
    }
    
    response = client.post("/api/user/register", json=new_user)
    # Act
    response = client.get("/api/user/")

    # Assert
    assert response.status_code == 200
    data = response.json()

    assert len(data) == 2
    assert data[1]["email"] == new_user["email"]
    assert data[1]["username"] == new_user["username"]
