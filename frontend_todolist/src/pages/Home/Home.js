import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import TaskList from "../../components/TaskList/TaskList";
import AddTask from "../../components/AddTasks/AddTask";
import TaskDetails from "../../components/TaskDetails/TaskDetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// Success Notification
export const showSuccessNotification = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// Error Notification
export const showErrorNotification = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const Home = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  // Check if user is signed in on component mount
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      setIsSignedIn(true);
    }
  }, []);

  // Fetch tasks when the component loads and the user is signed in
  useEffect(() => {
    if (isSignedIn) {
      fetchTasks();
    }
  }, [isSignedIn]);

  // Function to retrieve tasks from backend
  const fetchTasks = async () => {
    try {
      const userId = localStorage.getItem("user_id");

      // Fetch tasks for a specific user using query parameters
      const response = await axios.get(`${API_URL}/tasks/userTasks`, {
        params: {
          user_id: userId,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      showErrorNotification("Failed to fetch tasks. Please try again.");
    }
  };

  const handleAddTask = async (task) => {
    try {
      // Send the task data to your backend
      const new_task = {
        title: task.title,
        description: task.description,
        priority: "Low",
        status: "Pending",
        user_id: localStorage.getItem("user_id"),
      };

      console.log(new_task);

      const response = await axios.post(`${API_URL}/tasks/`, new_task);
      
      // Add the newly created task from the response to the state
      setTasks([...tasks, response.data]);
      
      // Show success notification
      showSuccessNotification("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
      // Show error notification
      showErrorNotification("Failed to add task. Please try again.");
    }
  };

  const handleSelectTask = (task) => {
    setSelectedTask(task);
  };

  const handleUpdateTaskStatus = (taskToUpdate, newStatus) => {

    const updatedTask = {
      "task_id": taskToUpdate.id,
      "status": newStatus
    };

    try {
      // Send the updated task data to your backend
      axios.put(`${API_URL}/tasks/updateStatus`, updatedTask);
      
      // Update the status of the task in the state
      const updatedTasks = tasks.map((task) =>
        task === taskToUpdate ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);
      setSelectedTask({ ...taskToUpdate, status: newStatus }); // Update selected task as well

      // Show success notification
      showSuccessNotification("Task status updated successfully!");
    }

    catch (error) {
      console.error("Error updating task status:", error);
      // Show error notification
      showErrorNotification("Failed to update task status. Please try again.");
    }
  };

  const handleDeleteTask = async (taskToDelete) => {
    
    const task_id = {
      "task_id": taskToDelete.id
    };

    console.log(task_id);
    
    try {
      // Send a request to delete the task from your backend
      await axios.delete(`${API_URL}/tasks/deleteTask`, { params: task_id });
      
      // Remove the task from the state
      const updatedTasks = tasks.filter((task) => task.id !== taskToDelete.id);
      setTasks(updatedTasks);
      setSelectedTask(null); // Clear the selected task

      // Show success notification
      showSuccessNotification("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      // Show error notification
      showErrorNotification("Failed to delete task. Please try again.");
    }
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
                onDeleteTask={handleDeleteTask}
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