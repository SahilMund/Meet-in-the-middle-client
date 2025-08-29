import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosBaseInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // This allows cookies to be sent with requests
  headers: {
    "Content-Type": "application/json",
  },
});

axiosBaseInstance.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      // ❌ Don't force JSON here
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosBaseInstance.interceptors.response.use(
  (response) => {
    console.log("📥 Response:", response.status, response.config.url);
    console.log("Response data:", response.data);
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error);

    // optional: handle 401 Unauthorized
    if (error.response && error.response.status === 401) {
      toast.warn("🚨 Unauthorized. Redirecting to login...");
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosBaseInstance;
