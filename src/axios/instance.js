import axios from "axios";
const BASE_URL = "";

export const axiosBaseInstance = axios.create({
  baseURL: BASE_URL,
});
