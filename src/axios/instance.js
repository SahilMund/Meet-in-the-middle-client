import axios from 'axios';
const BASE_URL = import.meta.env.BASE_URL || 'http://localhost:8000';

export const axiosBaseInstance = axios.create({
  baseURL: BASE_URL,
});
