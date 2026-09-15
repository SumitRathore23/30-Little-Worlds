import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getStories = async (params = {}) => {
  const response = await api.get("/stories", {
    params,
  });

  return response.data;
};

export const getFeaturedStory = async () => {
  const response = await api.get("/stories/featured");

  return response.data;
};

export const getStory = async (slug) => {
  const response = await api.get(`/stories/${slug}`);

  return response.data;
};

export default api;