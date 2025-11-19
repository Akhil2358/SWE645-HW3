import api from "./client.js";

export const fetchSurveys = () => api.get("/surveys/");
export const createSurvey = (data) => api.post("/surveys/", data);
export const updateSurvey = (id, data) => api.put(`/surveys/${id}`, data);
export const deleteSurvey = (id) => api.delete(`/surveys/${id}`);
