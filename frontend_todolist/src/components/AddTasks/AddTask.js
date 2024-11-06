import React, { useState } from "react";
import "./AddTask.css";

const AddTask = ({ onAddTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState("Pending");
  const [newTaskPriority, setNewTaskPriority] = useState("Low");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle opening the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to add a new task
  const handleAddTask = () => {
    if (newTaskTitle.trim() !== "") {
      onAddTask({ title: newTaskTitle, description: newTaskDescription, status: newTaskStatus, priority: newTaskPriority });
      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewTaskStatus("Pending");
      setNewTaskPriority("Low");
      closeModal(); // Close the modal after adding a task
    }
  };

  return (
    <div className="add-task">
      <button className="open-modal-button" id="openModal" onClick={openModal}>
        Add New Task
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add a New Task</h3>
            <div className="input-group">
              <label htmlFor="taskTitle">Task Title</label>
              <input
                type="text"
                id="taskTitle"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter task title"
              />
            </div>
            <div className="input-group">
              <label htmlFor="taskDescription">Task Description</label>
              <textarea
                id="taskDescription"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder="Enter task description"
                rows="4"
              />
            </div>
            <div className="input-group">
              <label htmlFor="taskDescription">Priority</label>
              <select
                id="taskPriority"
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="add-button" id="addTaskButton" onClick={handleAddTask}>
                Add Task
              </button>
              <button className="cancel-button" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;