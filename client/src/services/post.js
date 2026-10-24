// services/post.js

import API from "./api";

export const getPosts = () => API.get("/posts");

export const createPost = (data) =>
    API.post("/posts", data);

export const likePost = (id) =>
    API.put(`/posts/${id}/like`);

export const reportPost = (id) => {
  return axios.post(`/api/posts/${id}/report`);
};