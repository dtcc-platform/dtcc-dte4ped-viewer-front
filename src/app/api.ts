import axios from "axios";
import { ACCESS_TOKEN } from '../constants';

const api = axios.create({
  baseURL: "http://127.0.0.1:8000", 
  // Adjust the base URL as needed, or load from .env files
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Attach a request interceptor to include the access token in headers if present
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
        config.headers.Authorization = `token ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
