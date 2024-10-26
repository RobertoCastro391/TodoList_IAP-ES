import React, { useState } from 'react';
import './TaskDetails.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const TaskDetails = ({ task, onUpdateTaskStatus }) => {
  const [newStatus, setNewStatus] = useState(task.status);

  const handleStatusChange = () => {
    if (newStatus && newStatus !== task.status) {
      onUpdateTaskStatus(task, newStatus);
    }
  };

  return (
    <div className="task-details-card">
      <h3><FontAwesomeIcon icon={faInfoCircle} /> Task Details</h3>
      <div className="task-details-content">
        <div className="task-detail">
          <label>Title:</label>
          <p>{task.title}</p>
        </div>
        <div className="task-detail">
          <label>Description:</label>
          <p>{task.description}</p>
        </div>
        {task.status && (
          <div className="task-detail">
            <label>Status:</label>
            <p>{task.status}</p>
          </div>
        )}
        <div className="task-detail">
          <label>Update Status:</label>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="status-dropdown"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button className="update-status-button" onClick={handleStatusChange}>
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;