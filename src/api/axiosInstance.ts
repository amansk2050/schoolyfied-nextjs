// src/api/axiosInstance.ts
import axios from "axios";
import { API_BASE_URL } from "@/constants/baseUrl";

/**
 * Creates an Axios instance with a predefined base URL.
 */
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add interceptors for requests and responses

/**
 * Request interceptor to add Authorization header with token.
 * @param {Object} config - Axios request configuration.
 * @returns {Object} Updated Axios request configuration.
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor to handle 401 Unauthorized errors.
 * Attempts to refresh the token and retry the original request.
 * @param {Object} response - Axios response object.
 * @param {Object} error - Axios error object.
 * @returns {Object|Promise} Axios response object or a rejected promise.
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(
            `${API_BASE_URL}/auth/refresh`,
            { refreshToken }
          );

          const newToken = refreshResponse.data.token;
          localStorage.setItem("token", newToken);

          error.config.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance.request(error.config);
        } catch {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          window.location.href = "/sign-in";
        }
      } else {
        localStorage.removeItem("token");
        window.location.href = "/sign-in";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
