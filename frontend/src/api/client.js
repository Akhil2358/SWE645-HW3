// frontend/src/api/client.js
import axios from "axios";

// Read from Vite env at build/dev-server start time
const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

console.log("API base URL:", base);  // temporary: to verify in browser

const api = axios.create({
  baseURL: base,
});

export default api;
