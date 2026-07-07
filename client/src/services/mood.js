import api from "./api";

export const addMood = (moodData) => {
  return api.post("/mood/add", moodData);
};

export const getMoods = () => {
  return api.get("/mood");
};

export const deleteMood = (id) => {
  return api.delete(`/mood/${id}`);
};