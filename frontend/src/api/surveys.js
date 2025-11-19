// frontend/src/api/surveys.js
import api from "./client.js";   // or "./client" – both are fine

export const fetchSurveys = () => api.get("/api/surveys/");
export const createSurvey = (data) => api.post("/api/surveys/", data);
export const updateSurvey = (id, data) => api.put(`/api/surveys/${id}`);
export const deleteSurvey = (id) => api.delete(`/api/surveys/${id}`);
