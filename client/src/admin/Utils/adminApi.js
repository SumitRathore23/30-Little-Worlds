import axios from "axios";

const adminApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const adminLogin = async (email, password) => {
  const response = await adminApi.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const getAdminStories = async () => {
  const response = await adminApi.get("/stories/admin/all");

  return response.data;
};

export const createStory = async (storyData) => {
  const response = await adminApi.post(
    "/stories",
    storyData
  );

  return response.data;
};

export const updateStory = async (id, storyData) => {
  const response = await adminApi.put(
    `/stories/${id}`,
    storyData
  );

  return response.data;
};

export const deleteStory = async (id) => {
  const response = await adminApi.delete(
    `/stories/${id}`
  );

  return response.data;
};

export default adminApi;