import React, { useState } from "react";
import "./Home.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import TaskList from "../../components/TaskList/TaskList";
import AddTask from "../../components/AddTasks/AddTask";
import TaskDetails from "../../components/TaskDetails/TaskDetails";

const Home = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleSelectTask = (task) => {
    setSelectedTask(task);
  };

  const handleUpdateTaskStatus = (taskToUpdate, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task === taskToUpdate ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    setSelectedTask({ ...taskToUpdate, status: newStatus }); // Update selected task as well
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

      {isSignedIn && (
        <>
          <div className="task-list-container-home">
            <TaskList 
              tasks={tasks} 
              onSelectTask={handleSelectTask} 
            />
          </div>

          <div className="task-form-and-details">
            <AddTask onAddTask={handleAddTask} />
            {selectedTask && (
              <TaskDetails 
                task={selectedTask} 
                onUpdateTaskStatus={handleUpdateTaskStatus} 
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;