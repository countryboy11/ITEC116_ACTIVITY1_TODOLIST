import axios from "axios";

const API_URL = "http://localhost:3000/tasks";

export interface Task {
  _id?: string;
  title: string;
  description: string;
  completed: boolean;
}

export const getTasks = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createTask = async (task: Task) => {
  const res = await axios.post(API_URL, task);
  return res.data;
};

export const updateTask = async (id: string, updates: Partial<Task>) => {
  const res = await axios.patch(`${API_URL}/${id}`, updates);
  return res.data;
};

export const deleteTask = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
