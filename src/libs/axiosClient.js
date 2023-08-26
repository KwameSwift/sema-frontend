import axios from "axios";
import { getUserData } from "../utils/helpers";

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
  timeout: 10000,
});

export const axiosClientWithHeaders = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
  timeout: 10000,
});

export const axiosClientForm = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Add a request interceptor
axiosClientWithHeaders.interceptors.request.use(
  (config) => {
    // Modify the request config before sending it
    const token = getUserData().access;

    // Add the token to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a request interceptor
axiosClientForm.interceptors.request.use(
  (config) => {
    // Modify the request config before sending it
    const token = getUserData().access;

    // Add the token to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);
