import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const createTodo = (data) => api.post("/todo/create", data);

export const getTodos = () => api.get("/todo/list");

export const updateTodo = (id, data) => api.put(`/todo/update/${id}`, data);

export const removeTodo = (id) => api.delete(`/todo/remove/${id}`);
