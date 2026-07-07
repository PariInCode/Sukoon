import API from "./api";

export const chatWithAI = (message) => {
  return API.post("/ai/chat", { message });
};

