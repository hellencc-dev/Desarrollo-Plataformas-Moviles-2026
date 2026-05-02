import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const getTasksApi = async () => {
  try {
    const getRes = await axios.get(API_URL);
    return getRes.data;
  } catch (error) {
    console.error("GET error:", error);
    return [];
  }
};

export const getTaskByIdApi = async (id: string) => {
  try {
    const getRes = await axios.get(`${API_URL}/${id}`);
    return getRes.data;
  } catch (error) {
    console.error("GET BY ID error:", error);
    return null;
  }
};

export const createTaskApi = async (task: {
  title: string;
  body: string;
  userId?: number;
}) => {
  try {
    const postRes = await axios.post(API_URL, {
      title: task.title,
      body: task.body,
      userId: task.userId || 1,
    });

    return postRes.data;
  } catch (error) {
    console.error("POST error:", error);
    return null;
  }
};

export const updateTaskApi = async (
  id: string,
  task: {
    title: string;
    body: string;
    userId?: number;
  }
) => {
  try {
    const putRes = await axios.put(`${API_URL}/${id}`, {
      id: Number(id),
      title: task.title,
      body: task.body,
      userId: task.userId || 1,
    });

    return putRes.data;
  } catch (error) {
    console.error("PUT error:", error);
    return null;
  }
};

export const deleteTaskApi = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("DELETE error:", error);
    return false;
  }
};