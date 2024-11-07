import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import "./TaskList.css";

const TaskList = ({
  tasks,
  onSelectTask,
  currentPage,
  totalPages,
  onPageChange,
  onSortChange,
  onOrderChange,
  onStatusFilterChange,
  onPriorityFilterChange,
  onClearFilters,  // New prop for clearing filters
}) => {
  return (
    <div className="task-list">
      <h3>
        <FontAwesomeIcon icon={faTasks} /> Task List
      </h3>

      <div className="task-filters">
        <select onChange={(e) => onSortChange(e.target.value)}>
          <option value="created_at">Created At</option>
          <option value="deadline">Deadline</option>
        </select>
        <select onChange={(e) => onOrderChange(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <select onChange={(e) => onStatusFilterChange(e.target.value)}>
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select onChange={(e) => onPriorityFilterChange(e.target.value)}>
          <option value="">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={onClearFilters} className="clear-filters-button">
          Clear Filters
        </button>
      </div>

      <div className="task-cards">
        {tasks.map((task, index) => (
          <div
            className="task-card"
            key={index}
            onClick={() => onSelectTask(task)}
          >
            <div className="task-card-content">
              <h4 id="task_title">{task.title}</h4>
              <p id="status_details">
                Status: <strong>{task.status}</strong>
              </p>
              <p
                id="priority_details"
                className={`priority-${task.priority.toLowerCase()}`}
              >
                Priority: <strong>{task.priority}</strong>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;