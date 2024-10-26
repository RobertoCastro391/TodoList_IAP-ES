import pytest
from unittest.mock import patch

# Test creating a task
def test_create_task(client):
    # Arrange: Use the user with ID 1 which is created directly in the database
    user_id = 1

    new_task = {
        "title": "Test Task",
        "description": "This is a test task",
        "deadline": "2021-12-31T23:59:59",
        "priority": "High",
        "status": "Pending",
        "user_id": user_id
    }

    # Act
    response = client.post("/api/tasks/", json=new_task)

    # Assert
    assert response.status_code == 200
    data = response.json()

    # Validate task fields
    assert data["title"] == new_task["title"]
    assert data["description"] == new_task["description"]
    assert data["user"]["id"] == user_id

# Test exception handling during task creation
def test_create_task_exception_handling(client):
    # Arrange: Mock the create_task method to raise an exception
    task_create_data = {
        "title": "Test Task",
        "description": "This is a test task",
        "deadline": "2021-12-31T23:59:59",
        "priority": "High",
        "status": "Pending",
        "user_id": 1
    }

    with patch('app.services.task_service.create_task') as mock_create_task:
        mock_create_task.side_effect = Exception("Test Exception")

        # Act
        response = client.post("/api/tasks/", json=task_create_data)

        # Assert
        assert response.status_code == 400
        assert response.json() == {"detail": "Test Exception"}

# Test reading all tasks
def test_read_all_tasks(client):
    # Arrange: Use the user with ID 1 which is created directly in the database
    user_id = 1

    new_task = {
        "title": "Test Task",
        "description": "This is a test task",
        "deadline": "2021-12-31T23:59:59",
        "priority": "High",
        "status": "Pending",
        "user_id": user_id
    }

    new_task2 = {
        "title": "Test Task2",
        "description": "This is a test task2",
        "deadline": "2021-12-31T23:59:59",
        "priority": "High",
        "status": "Pending",
        "user_id": user_id
    }

    # Adding tasks
    client.post("/api/tasks/", json=new_task)
    client.post("/api/tasks/", json=new_task2)

    # Act
    response = client.get("/api/tasks/")
    data = response.json()

    # Assert
    assert response.status_code == 200
    assert len(data) == 2
    assert data[0]["title"] == new_task["title"]
    assert data[1]["title"] == new_task2["title"]