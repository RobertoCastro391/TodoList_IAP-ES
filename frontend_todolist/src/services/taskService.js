import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchUserTasks = async () => {
  return axios.get(`${API_URL}/tasks/userTasks`, {
    withCredentials: true
  });
};

export const addTask = async (newTask) => {
  return axios.post(`${API_URL}/tasks/`, newTask, {
    withCredentials: true
  });
};

export const updateTaskStatus = async (updatedTask) => {
  return axios.put(`${API_URL}/tasks/updateStatus`, updatedTask);
};

export const updateTaskDetails = async (updatedTask) => {
  return axios.put(`${API_URL}/tasks/editTask`, updatedTask);
};

export const deleteTask = async (taskId) => {
  return axios.delete(`${API_URL}/tasks/deleteTask`, { params: taskId });
};

export const setDeadline = async (deadlineData) => {
  return axios.put(`${API_URL}/tasks/deadline`, deadlineData);
};