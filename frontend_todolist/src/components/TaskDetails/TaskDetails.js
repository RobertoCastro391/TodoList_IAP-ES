import React, { useState } from 'react';
import './TaskDetails.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faSpinner, faCheckCircle, faPlayCircle, faEdit, faCalendarAlt, faSyncAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

const TaskDetails = ({ task, onUpdateTaskStatus, onDeleteTask, onUpdateTaskDetails }) => {
  const [newStatus, setNewStatus] = useState(task.status);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const [updatedDescription, setUpdatedDescription] = useState(task.description);

  const handleStatusChange = () => {
    if (newStatus && newStatus !== task.status) {
      onUpdateTaskStatus(task, newStatus);
      setIsEditingStatus(false);
    }
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDeleteTask(task);
    }
  };

  const handleSaveDetails = () => {
    onUpdateTaskDetails(task, updatedTitle, updatedDescription);
    setIsEditingDetails(false);
  };

  return (
    <div className="task-details-card">
      <h3><FontAwesomeIcon icon={faInfoCircle} /> Task Details</h3>
      <div className="task-details-content">
        <div className="task-detail">
          <label>Title:</label>
          {isEditingDetails ? (
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className="edit-input"
            />
          ) : (
            <p>{task.title}</p>
          )}
        </div>
        <div className="task-detail">
          <label>Description:</label>
          {isEditingDetails ? (
            <textarea
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              className="edit-textarea"
            />
          ) : (
            <p>{task.description}</p>
          )}
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
              <button className="status-button save" onClick={handleStatusChange}>
                Save
              </button>
              <button className="status-button cancel" onClick={() => setIsEditingStatus(false)}>
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
        <div className="task-detail time">
          <div>
            <label>Created At:</label>
            <div className="timestamp-container">
              <FontAwesomeIcon icon={faCalendarAlt} className="timestamp-icon" />
              <span>{new Date(task.created_at).toLocaleString()}</span>
            </div>
          </div>
          <div>
            <label>Updated At:</label>
            <div className="timestamp-container">
              <FontAwesomeIcon icon={faSyncAlt} className="timestamp-icon" />
              <span>{new Date(task.updated_at).toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="task-detail time">
          {isEditingDetails ? (
            <>
              <button className="status-button save" onClick={handleSaveDetails}>Save Changes</button>
              <button className="status-button cancel" onClick={() => setIsEditingDetails(false)}>Cancel</button>
            </>
          ) : (
            <>
              <button className="button edit" onClick={() => setIsEditingDetails(true)}>
                <FontAwesomeIcon icon={faEdit} /> Edit Details
              </button>
              <button className="button delete" onClick={() => handleDeleteClick(task)}>
                <FontAwesomeIcon icon={faTrash} /> Delete this task
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;