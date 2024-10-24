import React from 'react';
import './TaskDetails.css';

const TaskDetails = ({ task }) => {
  return (
    <div className="task-details-container">
      <h3>Task Details</h3>
      <p>{task}</p>
    </div>
  );
};

export default TaskDetails;