import pytest
from fastapi import HTTPException
from datetime import datetime
from app.services import task_service
from app.models.enums import Priority, Status
from app.schemas.task_schema import TaskCreate, TaskUpdate


def test_create_task_success(db_session):
    # Arrange
    user_id = 1  # Assuming the user with ID 1 exists
    task_create = TaskCreate(
        title="Test Task",
        description="This is a test task",
        deadline=datetime(2021, 12, 31, 23, 59, 59),
        priority=Priority.HIGH,
        status=Status.PENDING,
        user_id=user_id
    )

    # Act
    task = task_service.create_task(db_session, task_create)

    # Assert
    assert task.id is not None
    assert task.title == task_create.title
    assert task.description == task_create.description
    assert task.user_id == user_id
    assert task.priority == Priority.HIGH
    assert task.status == Status.PENDING

def test_create_task_user_not_found(db_session):
    # Arrange
    non_existent_user_id = 999
    task_create = TaskCreate(
        title="Test Task",
        description="This is a test task",
        deadline=datetime(2021, 12, 31, 23, 59, 59),
        priority=Priority.HIGH,
        status=Status.PENDING,
        user_id=non_existent_user_id
    )

    # Act & Assert
    with pytest.raises(HTTPException) as exc_info:
        task_service.create_task(db_session, task_create)
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "User not found"

def test_get_user_tasks_success(db_session):
    # Arrange
    user_id = 1  # Assuming the user with ID 1 exists
    task_create_1 = TaskCreate(
        title="Test Task 1",
        description="This is a test task 1",
        deadline=datetime(2021, 12, 31, 23, 59, 59),
        priority=Priority.HIGH,
        status=Status.PENDING,
        user_id=user_id
    )
    task_create_2 = TaskCreate(
        title="Test Task 2",
        description="This is a test task 2",
        deadline=datetime(2021, 12, 31, 23, 59, 59),
        priority=Priority.LOW,
        status=Status.COMPLETED,
        user_id=user_id
    )
    task_service.create_task(db_session, task_create_1)
    task_service.create_task(db_session, task_create_2)

    # Act
    user_tasks = task_service.get_user_tasks(db_session, user_id)

    # Assert
    assert len(user_tasks) == 2
    assert user_tasks[0].title == "Test Task 1"
    assert user_tasks[1].title == "Test Task 2"

def test_get_user_tasks_user_not_found(db_session):
    # Arrange
    non_existent_user_id = 999

    # Act & Assert
    with pytest.raises(HTTPException) as exc_info:
        task_service.get_user_tasks(db_session, non_existent_user_id)
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "User not found"

def test_get_all_tasks(db_session):
    # Arrange
    user_id = 1  # Assuming the user with ID 1 exists
    task_create_1 = TaskCreate(
        title="Test Task 1",
        description="This is a test task 1",
        deadline=datetime(2021, 12, 31, 23, 59, 59),
        priority=Priority.HIGH,
        status=Status.PENDING,
        user_id=user_id
    )
    task_create_2 = TaskCreate(
        title="Test Task 2",
        description="This is a test task 2",
        deadline=datetime(2021, 12, 31, 23, 59, 59),
        priority=Priority.LOW,
        status=Status.COMPLETED,
        user_id=user_id
    )
    task_service.create_task(db_session, task_create_1)
    task_service.create_task(db_session, task_create_2)

    # Act
    all_tasks = task_service.get_tasks(db_session)

    # Assert
    assert len(all_tasks) == 2
    assert all_tasks[0].title == "Test Task 1"
    assert all_tasks[1].title == "Test Task 2"


def test_change_status_task_success(db_session):

    user_id = 1
    
    task_create = TaskCreate(
        title="Test Task",
        description="This is a test task",
        deadline=datetime.now(),
        priority=Priority.HIGH,
        status=Status.PENDING,
        user_id=user_id
    )

    task = task_service.create_task(db_session, task_create)

    task_update = TaskUpdate(
        task_id=task.id,
        status=Status.COMPLETED
    )

    task = task_service.update_task_status(db_session, task_update)

    assert task.status == Status.COMPLETED

def test_change_status_task_not_found(db_session):
    
    task_update = TaskUpdate(
        task_id=999,
        status=Status.COMPLETED
    )

    with pytest.raises(HTTPException) as exc_info:
        task_service.update_task_status(db_session, task_update)
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Task not found"
        
def test_edit_task(db_session):
        
    user_id = 1
    
    task_create = TaskCreate(
        title="Test Task",
        description="This is a test task",
        deadline=datetime.now(),
        priority=Priority.HIGH,
        status=Status.PENDING,
        user_id=user_id
    )

    task = task_service.create_task(db_session, task_create)

    task_update = TaskUpdate(
        task_id=task.id,
        title="Test Task Edited",
        description="This is a test task edited",
        deadline=datetime(2021, 12, 31, 23, 59, 59),
        priority=Priority.LOW,
        status=Status.COMPLETED
    )

    task = task_service.update_task(db_session, task_update)

    assert task.title == "Test Task Edited"
    assert task.description == "This is a test task edited"
    assert task.deadline == datetime(2021, 12, 31, 23, 59, 59)
    assert task.priority == Priority.LOW
    assert task.status == Status.COMPLETED

def test_edit_task_not_found(db_session):
        
    task_update = TaskUpdate(
        task_id=999,
        title="Test Task Edited",
        description="This is a test task edited",
        deadline=datetime(2021, 12, 31, 23, 59, 59),
        priority=Priority.LOW,
        status=Status.COMPLETED
    )
    
    with pytest.raises(HTTPException) as exc_info:
        task_service.update_task(db_session, task_update)
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Task not found"

def test_delete_task(db_session):
        
    user_id = 1
    
    task_create = TaskCreate(
        title="Test Task",
        description="This is a test task",
        deadline=datetime.now(),
        priority=Priority.HIGH,
        status=Status.PENDING,
        user_id=user_id
    )

    task = task_service.create_task(db_session, task_create)

    task_service.delete_task(db_session, task.id)

    with pytest.raises(HTTPException) as exc_info:
        task_service.delete_task(db_session, task.id)
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Task not found"

def test_delete_task_not_found(db_session):
        
    with pytest.raises(HTTPException) as exc_info:
        task_service.delete_task(db_session, 999)
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Task not found"

def test_set_task_deadline(db_session):
            
        user_id = 1
        
        task_create = TaskCreate(
            title="Test Task",
            description="This is a test task",
            deadline=datetime.now(),
            priority=Priority.HIGH,
            status=Status.PENDING,
            user_id=user_id
        )
        
        task = task_service.create_task(db_session, task_create)
        
        put_deadline_on_task = TaskUpdate(
            task_id=task.id,
            deadline=datetime(2021, 12, 31, 23, 59, 59)
        )

        task_service.put_deadline_on_task(db_session, put_deadline_on_task)
    
        assert task.deadline == datetime(2021, 12, 31, 23, 59, 59)