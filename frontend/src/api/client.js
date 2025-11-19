import axios from "axios";

const base =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: "http://52.54.10.9:31081",   // backend NodePort
});

export default api;
