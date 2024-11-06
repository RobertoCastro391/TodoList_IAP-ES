import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import "./TaskList.css";

const TaskList = ({ tasks, onSelectTask }) => {
  return (
    <div className="task-list">
      <h3><FontAwesomeIcon icon={faTasks} />Task List</h3>
      <div className="task-cards">
        {tasks.map((task, index) => (
          <div className="task-card" key={index} onClick={() => onSelectTask(task)}>
            <div className="task-card-content">
              <h4 id="task_title">{task.title}</h4>
              <p id="status_details">Status: <strong>{task.status}</strong></p>
              <p id="priority_details" className={`priority-${task.priority.toLowerCase()}`}>
                Priority: <strong>{task.priority}</strong>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;