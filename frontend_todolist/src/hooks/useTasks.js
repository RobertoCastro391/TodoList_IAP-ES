import { useState, useEffect } from "react";
import {
  fetchUserTasks,
  addTask,
  updateTaskStatus,
  updateTaskDetails,
  deleteTask,
  setDeadline,
} from "../services/taskService";
import { showSuccessNotification, showErrorNotification } from "../utils/notifications";

export const useTasks = (isSignedIn) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    console.log("isSignedIn:", isSignedIn);
    if (isSignedIn) {
      loadTasks();
    }
  }, [isSignedIn]);

  const loadTasks = async () => {
    try {
      const response = await fetchUserTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      showErrorNotification("Failed to fetch tasks. Please try again.");
    }
  };

  const handleAddTask = async (task) => {
    try {
      const newTask = {
        ...task,
        status: "Pending"
      };

      console.log(newTask);

      const response = await addTask(newTask);
      setTasks([...tasks, response.data]);
      showSuccessNotification("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
      showErrorNotification("Failed to add task. Please try again.");
    }
  };

  const handleUpdateTaskStatus = async (taskToUpdate, newStatus) => {
    const updatedTask = {
      task_id: taskToUpdate.id,
      status: newStatus,
    };

    try {
      await updateTaskStatus(updatedTask);
      const updatedTasks = tasks.map((task) =>
        task.id === taskToUpdate.id ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);
      setSelectedTask({ ...taskToUpdate, status: newStatus });
      showSuccessNotification("Task status updated successfully!");
    } catch (error) {
      console.error("Error updating task status:", error);
      showErrorNotification("Failed to update task status. Please try again.");
    }
  };

  const handleUpdateTaskDetails = async (taskToUpdate, updatedTitle, updatedDescription, updatedPriority) => {
    const updatedTask = {
      task_id: taskToUpdate.id,
      title: updatedTitle,
      description: updatedDescription,
      priority: updatedPriority
    };

    try {
      await updateTaskDetails(updatedTask);
      const updatedTasks = tasks.map((task) =>
        task.id === taskToUpdate.id ? { ...task, title: updatedTitle, description: updatedDescription, priority: updatedPriority } : task
      );
      setTasks(updatedTasks);
      setSelectedTask({ ...taskToUpdate, title: updatedTitle, description: updatedDescription, priority: updatedPriority });
      showSuccessNotification("Task details updated successfully!");
    } catch (error) {
      console.error("Error updating task details:", error);
      showErrorNotification("Failed to update task details. Please try again.");
    }
  };

  const handleDeleteTask = async (taskToDelete) => {
    const taskId = { task_id: taskToDelete.id };

    try {
      await deleteTask(taskId);
      const updatedTasks = tasks.filter((task) => task.id !== taskToDelete.id);
      setTasks(updatedTasks);
      setSelectedTask(null);
      showSuccessNotification("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      showErrorNotification("Failed to delete task. Please try again.");
    }
  };

  const handleUpdateDeadline = async (taskToUpdate, updatedDeadline) => {
    const updatedTask = {
      task_id: taskToUpdate.id,
      deadline: updatedDeadline,
    };

    try {
      await setDeadline(updatedTask);
      const updatedTasks = tasks.map((task) =>
        task.id === taskToUpdate.id ? { ...task, deadline: updatedDeadline } : task
      );
      setTasks(updatedTasks);
      setSelectedTask({ ...taskToUpdate, deadline: updatedDeadline });
      showSuccessNotification("Task deadline updated successfully!");
    } catch (error) {
      console.error("Error updating task deadline:", error);
      showErrorNotification("Failed to update task deadline. Please try again.");
    }
  };

  return {
    tasks,
    selectedTask,
    handleAddTask,
    handleUpdateTaskStatus,
    handleUpdateTaskDetails,
    handleDeleteTask,
    setSelectedTask,
    handleUpdateDeadline,
  };
};