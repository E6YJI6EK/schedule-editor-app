import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true
});

http.interceptors.response.use(
  (res) => res,
  (err) =>
    Promise.reject(
      err?.response?.data ?? {
        success: false,
        message: "Network error",
        status: 0,
      }
    )
);
