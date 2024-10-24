import React, { useState } from "react";
import "./Home.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import TaskList from "../../components/TaskList/TaskList";
import AddTask from "../../components/AddTasks/AddTask";
import TaskDetails from "../../components/TaskDetails/TaskDetails";

const Home = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleSelectTask = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="container_home">
      <div className="sidebar-container">
        <Sidebar
          isSignedIn={isSignedIn}
          setIsSignedIn={setIsSignedIn}
          name="Roberto Castro"
          email="robertorcastro@gmail.com"
        />
      </div>

      <div className="tasks-container">
        <div className="task-list-container">
          <TaskList tasks={tasks} onSelectTask={handleSelectTask} />
        </div>

        <div className="task-form-and-details">
          <AddTask onAddTask={handleAddTask} />
          {selectedTask && <TaskDetails task={selectedTask} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
