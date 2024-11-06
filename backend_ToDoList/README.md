### 26-10-2024 - 13H00

# TDLIE-29: Implement the Task Creation API Endpoint

## Overview
This user story focuses on implementing the API endpoint that allows users to create new tasks in the system. This was done using FastAPI with *Python* and integrates with the existing database model.

## Endpoint Details
- **Endpoint:** `/api/tasks/`
- **HTTP Method:** POST
- **Description:** This endpoint allows authenticated users to create a new task by providing the necessary details.
- **Input Schema:** `TaskCreate`
  - `title`: The title of the task (required).
  - `description`: The description of the task (optional).
  - `deadline`: The deadline date and time for the task (optional).
  - `priority`: Priority level of the task (required).
  - `status`: Status of the task (required).
  - `user_id`: The ID of the user who owns the task (required).

### Request Example
```json
{
  "title": "Finish documentation",
  "description": "Document the backend implementation of the task creation endpoint.",
  "deadline": "2024-12-31T23:59:59",
  "priority": "High",
  "status": "Pending",
  "user_id": 1
}
```

### Response Example
- **Success:**
  - **Status Code:** 200
  - **Body:**
    ```json
    {
      "id": 1,
      "title": "Finish documentation",
      "description": "Document the backend implementation of the task creation endpoint.",
      "deadline": "2024-12-31T23:59:59",
      "priority": "High",
      "status": "Pending",
      "created_at": "2024-10-25T14:33:01",
      "updated_at": "2024-10-25T14:33:01",
      "user": {
        "id": 1,
        "email": "test@test.com",
        "username": "test"
      }
    }
    ```

- **Error:**
  - **Status Code:** 400
  - **Body:**
    ```json
    {
      "detail": "Task creation failed due to validation errors."
    }
    ```

## Implementation Details
- The endpoint uses the `TaskCreate` schema to validate input data.
- On successful validation, a new task is stored in the database, with fields such as `created_at` and `updated_at` automatically populated.
- Exception handling is implemented to catch any errors during the database operation and return an appropriate response with a 400 status code.

## Testing
- **Unit Tests:** Created to validate the functionality of the endpoint, covering both successful creation and failure scenarios.
- **Exception Handling Test:** Added a test case using `unittest.mock.patch` to simulate an exception during task creation to validate that the endpoint correctly returns a 400 response.


### 27-10-2024 - 12H00

# TDLIE-32: Implement the Task Completation (Status Change) API Endpoint

## Overview

This task make part of the user story that focuses on implementing the API endpoint that allows users to change the status of an existing task. The implementation was done using FastAPI with Python, integrating with the existing database model and following proper validation rules to ensure accurate status changes.

## Enpoint Details 
- **Endpoint:** `/api/tasks/updateStatus`
- **HTTP Method:** PUT
- **Description:** This endpoint allows authenticated users to change the status of a task by providing the necessary details, such as the task ID and the new status value.
- **Input Schema:** `TaskUpdate`
  - `task_id`: The *ID* of the task (required).
  - `title`: The new task title (optional). 
  - `description`: The description of the task (optional).
  - `deadline`: The deadline date and time for the task (optional).
  - `priority`: Priority level of the task (optional).
  - `status`: Status of the task (optional).

### Request Example
```json
{
  "task_id": 12,
  "status": "Completed"
}
```

## Implementation Details
- The endpoint uses the `TaskUpdate` schema to validate input data.
- The service function verifies that the provided `task_id` exists in the database.
- If the task exists, the `status` is updated and the `updated_at` timestamp is refreshed.
- Exception handling is implemented to manage scenarios where the task is not found or if the status value is invalid, returning the appropriate error responses.

## Testing
- **Unit Tests**: Added unit tests to validate the functionality of the endpoint, covering successful status updates and failure scenarios, such as when the task does not exist or when an invalid status value is provided.

- **Exception Handling Test**: Simulated error cases using ?`unittest.mock.patch` to validate that the endpoint correctly handles exceptions and returns suitable error messages.

### 28-10-2024 - 12H00

# TDLIE-34: Implement Edit and Delete Task API Endpoints

## Overview 
This task involves implementing the API endpoints to allow editing and deleting tasks.

## Endpoint Details
  ### Edit Task Endpoint
  - **Endpoint:** `/api/tasks/editTask`
  - **HTTP Method:** PUT
  - **Description:** This endpoint allows users to edit a task by providing the atributes to modify.
  - **Input Schema:** `TaskUpdate`
    - `task_id`: The *ID* of the task (required).
    - `title`: The new task title (optional). 
    - `description`: The description of the task (optional).
    - `deadline`: The deadline date and time for the task (optional).
    - `priority`: Priority level of the task (optional).
    - `status`: Status of the task (optional).

  ### Delete Task Endpoint
  - **Endpoint:** `/api/tasks/deleteTask`
  - **HTTP Method:** DELETE
  - **Description:** This endpoint allows users to delete a task by providing the task id of the task.
  - **Input Schema:** `TaskUpdate`
    - `task_id`: The *ID* of the task (required).

## Implementation Details
  - **Endpoints Implemented**: 
    - **Edit Task Endpoint** (`PUT /api/tasks/editTask`): Allows the user to edit task details.
    - **Delete Task Endpoint** (`DELETE /api/tasks/deleteTask`):llows the user to delete a specific task by providing its ID.
  - **Database Interaction**:
    - **Edit Task**: The `update_task` function in `task_service.py` uses the TaskUpdate schema to validate input data. It verifies that the provided task_id exists, updates the relevant fields (title, description, deadline, priority, status), and refreshes the updated_at timestamp before committing the changes.
    - **Delete Task**: The `delete_task` function in `task_service.py` checks for the existence of the task by its ID, deletes it from the database, and commits the changes.
  - **Exepction Handling**:
    - Both endpoints include error handling to return a `404 Not Fund` if the task to update or delete does not exit in the database.
    - The `update_task` function also includes validation to ensure that all fields being updated are valid.

### 28-10-2024 - 18H15

# TDLIE-36: Implement Deadline Assignment API Endpoint

## Overview
This task focused on implementing an API endpoint to assign deadlines to tasks. This allows users to set due dates for tasks, which are stored and updated in the database to assist in managing deadlines effectively.

## Enpoint Implementation
- **Endpoint:** `/api/tasks/deadline`
  - **HTTP Method:** PUT
  - **Description:** This endpoint allows users to assign a deadline to a task.
  - **Input Schema:** `TaskUpdate`
    - `task_id`: The *ID* of the task (required).
    - `title`: The new task title (optional). 
    - `description`: The description of the task (optional).
    - `deadline`: The deadline date and time for the task (optional).
    - `priority`: Priority level of the task (optional).
    - `status`: Status of the task (optional).
  - **Database Update**: Updates the `deadline` and `updated_at` fields of the specified task in the database.
  - **Error Handling**:
    - Returns a `404 Not Found` if the task with the given `task_id` does not exist.

## Implementation Details
- **Router (`task_router.py`)**:
  - Added a new route `@router.put("/deadline")` to handle updating the deadline of a task.
  - The route takes `task_update` of type `TaskUpdate` and uses the `put_deadline_on_task` function from the task service.

- **Service (`task_service.py`)**:
  - Implemented the `put_deadline_on_task` function to update the `deadline` and `updated_at` fields of the task.
  - Utilizes the `get_task_by_id` helper function to locate the task before updating.


### 05/11/2024 - 15:30

# TDLIE-55: Implement API Endpoint for login

## Overview
This task introduces several new authentication endpoints using AWS Cognito, including login, logout, and callback functionalities. It also includes enhancements to the token exchange and user management logic, alongside integrating user creation or retrieval based on Cognito IDs 

## Enpoint Implementation
- **/auth/login**: Redirects users to the AWS Cognito login page.
- **/auth/logout**: Logs out users by redirecting them to Cognito’s logout page and removes the access token cookie.
- **/auth/callback**: Handles the Cognito callback, exchanges authorization code for tokens, retrieves or creates a user in the database, and sets an access token cookie.

## Implementation Details
- **`app/routes/auth_routes.py`**: Defines the `/auth` endpoints for login, logout, and callback.
- **`app/services/auth_service.py`**: Handles token exchange, JWT decoding, and user retrieval/creation.
  
### 06/11/2024 - 21:40

# TDLIE-52: Implement API Endpoint for Registe and Save User in Database

## Overview
This task introduces a new API endpoint for user registration, allowing for saving user data to the database. It also includes tests for the endpoint to ensure functionality and reliability.

### 1. Created Endpoint for User Registration
**Endpoints Added**:
- `/users/register`: Registers a new user and saves the user data to the database, including fields such as username, email, and password.