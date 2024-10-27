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