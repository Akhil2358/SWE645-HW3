// frontend/src/api/client.js
import axios from "axios";

const base =
  import.meta.env.VITE_API_BASE_URL || "http://52.54.10.9:31081";

const api = axios.create({
  baseURL: base,
});

export default api;
