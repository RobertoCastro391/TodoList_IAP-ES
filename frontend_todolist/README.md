### 26/10/2024 - 14:00

# TDLIE-30: Create the UI Component for Task Creation in React

## Overview
The objective of this task was to create a UI component that allows users to add tasks. This component is implemented using React.

## Implementation Details

* **Component Name**: `AddTask`
* **File Location**: `src/components/AddTask.js`
* **Dependencies**: Utilizes React's state management (`useState`) and custom styling (`AddTask.css`).

## Features Implemented

* **Modal for Adding a Task**: The component opens a modal when the user clicks the "Add New Task" button. This modal allows users to input the details of the new task.
* **State Management**: Managed with `useState` to handle input fields such as title, description, deadline, and task status.
* **Form Fields**: Users can input the task title, description, select a status (Pending, In Progress, Done), and set a deadline.
* **Form Validation**: Ensures the task title is not empty before submitting.
* **Adding a Task**: The `handleAddTask` function is called to submit the task details, and it invokes the `onAddTask` callback passed as a prop to handle the addition of the task.


### 27/10/2024 - 00:30

# TDLIE-31: Integrate API and UI (React form submits to FastAPI)

## Overview
The objective of this task was to integrate call from the UI to the FastAPI endpoints to create tha task and save it to the DB.

### 27/10/2024 - 19:30

# TDLIE-33: Update the UI to Allow Marking Tasks as Complete (React)

## Overview
This task focused on updating the UI to provide a mechanism for users to update task status. This feature is implemented using React and integrates with the existing backend API to update the task status.

## UI Details
- **Component Updated**: `TaskDetails` and `TaskList`
- **Interaction Flow**: 
    - Users can click on the task status field to enable editing.
    - The status can be changed through a dropdown, followed by clicking the "Save" button to confirm the status update.

## Implementation Details
- **Task Details Component (`TaskDetails`)**:
    - Added an edit mode for task status.
    - Introduced a dropdown menu for selecting different statuses (`Pending`, `In Progress`, `Completed`).
    - A _Save_ button is provided to save changes, and a _Cancel_ button allows users to discard changes.

- **Task List Component (`TaskList`)**:
    - Displays tasks in a list format, allowing users to click on a task to view and edit details.

## Testing 
- **E2E Tests**:
    - Updated the existing Cucumber tests to validate the new functionality.
    - Tests cover scenarios for changing the status of a task, including saving and cancelling changes.


### 28/10/2024 - 17:00

# TDLIE-35: Update the UI for Supporting Edit/Delete Tasks (React)

## Overview
This task focused on updating the UI to provide mechanisms for users to edit or delete tasks.

## UI Details
- **Components Updated**: `TaskDetails`
- **Interaction Flow**:
  - Users can click on the edit button to enable editing of task details, including title and description.
  - Users can click on the delete button to trigger a confirmation alert before the task is deleted.
  - Once confirmed, the task is removed from the UI and the backend API is called to delete the task.

## Implementation Details
- **Task Details Component (`TaskDetails`)**:
  - Added an edit mode for task details (title and description).
  - Provided _Save_ and _Cancel_ buttons to either save the changes or discard them.
  - Added a delete button that triggers a confirmation alert before deleting the task.

## Testing 
- **E2E Tests**:
  - Updated the existing Cucumber tests to validate the new edit and delete functionalities.
  - Tests cover scenarios for editing task detailsa and saving changes and deleting a task after confirming the action.

### 28/10/2024 - 19:15

# TDLIE-37: Update the UI to allow setting deadlines (React)

## Overview
This task was for implementing in the UI a mechanism for enabling users to set deadlines for tasks.

## UI Details
- **Components Updated**: `TaskDetails`
- **Interaction Flow**:
  - Users can click on the deadline fiels to enable editing of the deadline.

## Implementation Details
- **Task Details Component (`TaskDetails`)**:
  - Added an edit mode for the deadline field activated when clicked.
  - Provided _Save_ and _Cancel_ buttons to either save the changes or discard them.

## Testing 
- **E2E Tests**:
  - Updated the existing Cucumber tests to validate the deadline input and save.

### 06/11/2024 - 14:00

# TDLIE-56: Integrate AWS Cognito for login functionality

## Overview
This task involved integrating AWS Cognito into the application to manage user login and authentication. The integration allows users to securely log in and out of the application using AWS Cognito’s authentication flow.

## UI Details
- **Components Updated**:
  - `Sidebar`: Displays login/logout options based on the authentication status.
  - `Home`: Conditionally renders components depending on whether the user is authenticated.
  
- **Interaction Flow**:
  - **Login**: When the user clicks on the **Login** button, they are redirected to the AWS Cognito-hosted login page.
  - **Callback Handling**: After successful authentication, AWS Cognito redirects back to the application’s callback URL with an authorization code, which is exchanged for access tokens.
  - **Logout**: When the user clicks the **Logout** button, they are logged out, and the access token is cleared.

## Implementation Details
- **Authentication Hook (`useAuth`)**:
  - Created a custom `useAuth` hook to manage the authentication state of the application.
  - Calls an `/auth/verify` endpoint on mount to check if the user is authenticated by verifying the access token in the cookie.
  - Provides `handleLogin` and `handleLogout` functions to initiate the login and logout flows.

- **Login and Logout Flows**:
  - **Login**:
    - `handleLogin` redirects the user to the `/auth/login` endpoint, which in turn redirects to Cognito’s login page.
  - **Callback Handling**:
    - After Cognito redirects back with an authorization code, the backend exchanges it for tokens, sets an HTTP-only `access_token` cookie, and redirects the user back to the frontend.
  - **Logout**:
    - `handleLogout` clears the `access_token` by calling the `/auth/logout` endpoint, which removes the session and updates the UI.