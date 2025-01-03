import pytest
from fastapi import HTTPException
from unittest.mock import patch
from datetime import datetime

user_id = 1
mocked_task = {
    "id": 1,
    "title": "Test Task",
    "description": "This is a test task",
    "deadline": "2021-12-31T23:59:59",
    "priority": "High",
    "status": "In Progress",
    "created_at": datetime.now(),
    "updated_at": datetime.now(),
    "user_id": user_id,
    "user": {
        "id": user_id,
        "email": "test@test.com",
        "username": "test",
        "cognito_id": "test_cognito_id",  # Adding missing field
        "created_at": datetime.now(),  # Adding missing field
        "updated_at": datetime.now(),  # Adding missing field
    }
}

# Test creating a task
def test_create_task(client):

    new_task = {
        "title": "Test Task",
        "description": "This is a test task",
        "deadline": "2021-12-31T23:59:59",
        "priority": "High",
        "status": "Pending",
        "user_id": user_id,
    }

    # Patch the 'create_task' function to return the mocked task
    with patch('app.routes.task_routes.task_service.create_task') as mock_create_task:
        mock_create_task.return_value = mocked_task

        # Act
        response = client.post("/api/tasks/", json=new_task)

        # Assert
        assert response.status_code == 200
        data = response.json()

        # Validate task fields
        assert data["title"] == mocked_task["title"]
        assert data["description"] == mocked_task["description"]
        assert data["user"]["id"] == user_id
        assert data["user"]["cognito_id"] == mocked_task["user"]["cognito_id"]


# Test exception handling during task creation
def test_create_task_exception_handling(client):
    # Arrange: Mock the create_task method to raise an exception
    task_create_data = {
        "title": "Test Task",
        "description": "This is a test task",
        "deadline": "2021-12-31T23:59:59",
        "priority": "High",
        "status": "Pending",
        "user_id": 2
    }

    # Update the path to match the router where create_task is used
    with patch('app.routes.task_routes.task_service.create_task') as mock_create_task:
        mock_create_task.side_effect = HTTPException(status_code=404, detail="User not found")

        # Act
        response = client.post("/api/tasks/", json=task_create_data)

        # Assert
        assert response.status_code == 404
        assert response.json() == {"detail": "User not found"}

def test_read_all_tasks_user(client):
    
    # Patch the 'get_tasks' function to return the mocked task
    with patch('app.routes.task_routes.task_service.get_user_tasks') as mock_get_tasks:
        
        mock_get_tasks.return_value = [mocked_task]

        # Act
        response = client.get(f"/api/tasks/userTasks?user_id={user_id}")

        # Assert
        assert response.status_code == 200
        data = response.json()

        # Validate task fields
        assert len(data) == 1
        assert data[0]["title"] == mocked_task["title"]
        assert data[0]["description"] == mocked_task["description"]
        assert data[0]["user"]["id"] == user_id
        assert data[0]["user"]["cognito_id"] == mocked_task["user"]["cognito_id"]

# Test reading all tasks
def test_read_all_tasks(client):
    
    # Patch the 'get_tasks' function to return the mocked task
    with patch('app.routes.task_routes.task_service.get_tasks') as mock_get_tasks:
        mock_get_tasks.return_value = [mocked_task]

        # Act
        response = client.get("/api/tasks/")

        # Assert
        assert response.status_code == 200
        data = response.json()

        # Validate task fields
        assert len(data) == 1
        assert data[0]["title"] == mocked_task["title"]
        assert data[0]["description"] == mocked_task["description"]
        assert data[0]["user"]["id"] == user_id
        assert data[0]["user"]["cognito_id"] == mocked_task["user"]["cognito_id"]

def test_change_task_status(client):
    
    requested_task = {
        "task_id": 1,
        "status": "In Progress"
    }

    # Patch the 'get_tasks' function to return the mocked task
    with patch('app.routes.task_routes.task_service.update_task_status') as mock_change_task_status:
        mock_change_task_status.return_value = mocked_task

        # Act
        response = client.put("/api/tasks/updateStatus", json=requested_task)

        # Assert
        assert response.status_code == 200
        data = response.json()

        # Validate task fields
        assert data["status"] == "In Progress"

def test_edit_task(client):
    
    resquest_change = {
        "task_id": 1,
        "title": "Test Task",
        "description": "This is a test task"
    }

    with patch('app.routes.task_routes.task_service.update_task') as mock_edit_task:
        mock_edit_task.return_value = mocked_task

        # Act
        response = client.put("/api/tasks/editTask", json=resquest_change)

        # Assert
        assert response.status_code == 200
        data = response.json()

        # Validate task fields
        assert data["id"] == 1

def test_delete_task(client):

    requested_task = {
        "task_id": 1
    }

    # Patch the 'get_tasks' function to return the mocked task
    with patch('app.routes.task_routes.task_service.delete_task') as mock_delete_task:
        mock_delete_task.return_value = mocked_task

        # Act
        response = client.delete("/api/tasks/deleteTask", params=requested_task)

        # Assert
        assert response.status_code == 200
        data = response.json()

        # Validate task fields
        assert data["id"] == 1

def test_update_task_deadline(client):
        
        requested_task = {
            "task_id": 1,
            "deadline": "2021-12-31T23:59:59"
        }
    
        # Patch the 'get_tasks' function to return the mocked task
        with patch('app.routes.task_routes.task_service.put_deadline_on_task') as mock_update_task_deadline:
            mock_update_task_deadline.return_value = mocked_task
    
            # Act
            response = client.put("/api/tasks/deadline", json=requested_task)
    
            # Assert
            assert response.status_code == 200
            data = response.json()
    
            # Validate task fields
            assert data["deadline"] == "2021-12-31T23:59:59"