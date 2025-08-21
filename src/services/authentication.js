import axios from '../axios/instance.js';
// import axios from 'axios';
import endPoints from './endpoints.js';
export const getUserData = () => axios.get(endPoints.GET_USER_DETAILS);
export const loginUser = (data) => axios.post(endPoints.LOGIN_USER,data);
export const sendOtp = (data) => axios.post(endPoints.GET_OTP,data);
export const verifyOTP = (data) => axios.post(endPoints.VERIFY_OTP,data);
