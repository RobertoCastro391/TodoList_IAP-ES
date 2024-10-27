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