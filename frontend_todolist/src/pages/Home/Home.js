import React, { useState } from "react";
import "./Home.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import TaskList from "../../components/TaskList/TaskList";
import AddTask from "../../components/AddTasks/AddTask";
import TaskDetails from "../../components/TaskDetails/TaskDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTasks } from "../../hooks/useTasks";

const Home = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const {
    tasks,
    selectedTask,
    handleAddTask,
    handleUpdateTaskStatus,
    handleUpdateTaskDetails,
    handleDeleteTask,
    setSelectedTask,
    handleUpdateDeadline,
  } = useTasks(isSignedIn);

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
            <TaskList tasks={tasks} onSelectTask={setSelectedTask} />
          </div>

          <div className="task-form-and-details">
            <AddTask onAddTask={handleAddTask} />
            {selectedTask && (
              <TaskDetails
                task={selectedTask}
                onUpdateTaskStatus={handleUpdateTaskStatus}
                onDeleteTask={handleDeleteTask}
                onUpdateTaskDetails={handleUpdateTaskDetails}
                onUpdateDeadline={handleUpdateDeadline}
              />
            )}
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Home;