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