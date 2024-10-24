import React from 'react';
import './TaskList.css';

const TaskList = ({ tasks, onSelectTask }) => {
  return (
    <div className="task-list-container">
      <h3>Task List</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} onClick={() => onSelectTask(task)}>
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;