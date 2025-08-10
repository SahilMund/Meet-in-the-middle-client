import axios from "axios";
const BASE_URL = "http://localhost:8000";

export const axiosBaseInstance = axios.create({
  baseURL: BASE_URL,
});
