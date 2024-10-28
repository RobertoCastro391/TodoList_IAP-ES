import { useState, useEffect } from "react";
import {
  fetchUserTasks,
  addTask,
  updateTaskStatus,
  updateTaskDetails,
  deleteTask,
} from "../services/taskService";
import { showSuccessNotification, showErrorNotification } from "../utils/notifications";

export const useTasks = (isSignedIn) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    if (isSignedIn) {
      loadTasks();
    }
  }, [isSignedIn]);

  const loadTasks = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const response = await fetchUserTasks(userId);
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
        priority: "Low",
        status: "Pending",
        user_id: localStorage.getItem("user_id"),
      };
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

  const handleUpdateTaskDetails = async (taskToUpdate, updatedTitle, updatedDescription) => {
    const updatedTask = {
      task_id: taskToUpdate.id,
      title: updatedTitle,
      description: updatedDescription,
    };

    try {
      await updateTaskDetails(updatedTask);
      const updatedTasks = tasks.map((task) =>
        task.id === taskToUpdate.id ? { ...task, title: updatedTitle, description: updatedDescription } : task
      );
      setTasks(updatedTasks);
      setSelectedTask({ ...taskToUpdate, title: updatedTitle, description: updatedDescription });
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

  return {
    tasks,
    selectedTask,
    handleAddTask,
    handleUpdateTaskStatus,
    handleUpdateTaskDetails,
    handleDeleteTask,
    setSelectedTask,
  };
};