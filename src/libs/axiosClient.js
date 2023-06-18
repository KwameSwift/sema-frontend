import axios from "axios";
import { getUserData, setUserTokenData } from "../utils/helpers";

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
  timeout: 10000
});

export const axiosClientWithHeaders = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
  timeout: 10000,
});

export const axiosClientForm = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data"
  }
});


// Function to refresh the token
async function refreshToken(token) {
  try {
    // Make an API request to get a new token
    const response = await axiosClientWithHeaders.post('/auth/refresh-token/', {
      // Include any necessary data for refreshing the token
      refresh: token
    });

    // Retry the original request with the new token
    return Promise.resolve(response.data.access);
  } catch (error) {
    // Handle token refresh error
    return Promise.reject(error);
  }
}

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

// Add a response interceptor
axiosClientWithHeaders.interceptors.response.use(
  (response) => {
    // Return the response as-is
    return response;
  },
  async (error) => {
    // Handle response error
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      // Token expired, attempt to refresh the token
      originalRequest._retry = true;

      const token = getUserData().refresh;

      try {
        const newToken = await refreshToken(token);

        // store data to redux
        setUserTokenData(newToken);

        // Update the Authorization header with the new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Retry the original request
        return axiosClientWithHeaders(originalRequest);
      } catch (refreshError) {
        // Handle token refresh error
        return Promise.reject(refreshError);
      }
    }

    // Return any other error as-is
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

// Add a response interceptor
axiosClientForm.interceptors.response.use(
  (response) => {
    // Return the response as-is
    return response;
  },
  async (error) => {
    // Handle response error
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      // Token expired, attempt to refresh the token
      originalRequest._retry = true;

      const token = getUserData().refresh;

      try {
        const newToken = await refreshToken(token);

        // store data to redux
        setUserTokenData(newToken);

        // Update the Authorization header with the new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Retry the original request
        return axiosClientWithHeaders(originalRequest);
      } catch (refreshError) {
        // Handle token refresh error
        return Promise.reject(refreshError);
      }
    }

    // Return any other error as-is
    return Promise.reject(error);
  }
);
