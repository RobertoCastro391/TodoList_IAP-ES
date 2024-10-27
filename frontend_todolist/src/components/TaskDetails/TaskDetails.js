import React, { useState } from 'react';
import './TaskDetails.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faSpinner, faCheckCircle, faPlayCircle, faEdit, faCalendarAlt, faSyncAlt } from "@fortawesome/free-solid-svg-icons";

const TaskDetails = ({ task, onUpdateTaskStatus }) => {
  const [newStatus, setNewStatus] = useState(task.status);
  const [isEditingStatus, setIsEditingStatus] = useState(false);

  const handleStatusChange = () => {
    if (newStatus && newStatus !== task.status) {
      onUpdateTaskStatus(task, newStatus);
      setIsEditingStatus(false);
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
        <div className="task-detail">
          <label>Status:</label>
          {isEditingStatus ? (
            <div className="status-edit-container">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="status-dropdown"
              >
                <option value="Pending" id="pending">Pending</option>
                <option value="In Progress" id="In Progress">In Progress</option>
                <option value="Completed" id="Completed">Completed</option>
              </select>
              <button className="save-status-button" onClick={handleStatusChange}>
                Save
              </button>
              <button className="cancel-status-button" onClick={() => setIsEditingStatus(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <div className={`status-badge ${task.status.replace(/\s+/g, '-').toLowerCase()}`} id="statusButton" onClick={() => setIsEditingStatus(true)}>
              <FontAwesomeIcon
                icon={
                  task.status === "Pending" ? faSpinner :
                  task.status === "In Progress" ? faPlayCircle : faCheckCircle
                }
              /> 
              {task.status}
              <FontAwesomeIcon icon={faEdit} className="edit-icon" />
            </div>
          )}
        </div>
        <div className="task-detail">
          <label>Created At:</label>
          <div className="timestamp-container">
            <FontAwesomeIcon icon={faCalendarAlt} className="timestamp-icon" />
            <span>{new Date(task.created_at).toLocaleString()}</span>
          </div>
        </div>
        <div className="task-detail">
          <label>Updated At:</label>
          <div className="timestamp-container">
            <FontAwesomeIcon icon={faSyncAlt} className="timestamp-icon" />
            <span>{new Date(task.updated_at).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;