import axios from '../axios/instance.js';
// import axios from 'axios';
import endPoints from './endpoints.js';
export const createMeeting = (data) => axios.post(endPoints.CREATE_MEETING,data);
export const dashBoardStats = () => axios.get(endPoints.GET_DASHBOARD_STATS);
export const getMymeetings = (data) => axios.get(endPoints.GET_ALL_MY_MEETINGS(data));