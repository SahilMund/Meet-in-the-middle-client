import axios from "../axios/instance.js";
// import axios from 'axios';
import endPoints from "./endpoints.js";
export const createMeeting = (data) =>
  axios.post(endPoints.CREATE_MEETING, data);
export const getMeetingById = (id) =>
  axios.get(endPoints.GET_MEETING_BY_ID(id));
export const deleteMeetingById = (id) =>
  axios.delete(endPoints.DELETE_MEETING_BY_ID(id));
export const dashBoardStats = () => axios.get(endPoints.GET_DASHBOARD_STATS);
export const getMymeetings = (data) =>
  axios.get(endPoints.GET_ALL_MY_MEETINGS(data));
export const getUpcomingMeetings = (data) =>
  axios.get(endPoints.GET_UPCOMING_MEETINGS(data));
export const getPendingMeetings = (data) =>
  axios.get(endPoints.GET_PENDING_MEETINGS(data));
export const getConflicts = (id) => axios.get(endPoints.GET_CONFLICTS(id));
export const rejectMeeting = (meetingId) =>
  axios.put(endPoints.REJECT_MEETING, { meetingId });
export const acceptMeeting = (data) =>
  axios.put(endPoints.ACCEPT_MEETING, data);
export const updatemeetingDetails = (meetingId, data) =>
  axios.put(endPoints.UPDATE_MEETING_DETAILS(meetingId), data);
