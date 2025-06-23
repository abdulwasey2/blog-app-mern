// frontend/src/api/axiosInstance.js

import axios from 'axios';

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend API URL
});

// Interceptor to add the auth token to every request if it exists
axiosInstance.interceptors.request.use(
  (config) => {
    // Get user info from local storage
    const userInfo = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null;

    if (userInfo && userInfo.token) {
      // Add the token to the Authorization header
      config.headers['Authorization'] = `Bearer ${userInfo.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;