import axios from "../axios/instance.js";
// import axios from 'axios';
import endPoints from "./endpoints.js";
export const createMeeting = (data) =>
  axios.post(endPoints.CREATE_MEETING, data);
export const dashBoardStats = () => axios.get(endPoints.GET_DASHBOARD_STATS);
export const getMymeetings = (data) =>
  axios.get(endPoints.GET_ALL_MY_MEETINGS(data));
export const getUpcomingMeetings = (data) =>
  axios.get(endPoints.GET_UPCOMING_MEETINGS(data));
export const getPendingMeetings = (data) =>
  axios.get(endPoints.GET_PENDING_MEETINGS(data));
export const getConflicts = (id) => axios.put(endPoints.GET_CONFLICTS(id));
