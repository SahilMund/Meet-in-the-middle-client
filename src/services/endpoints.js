const endPoints = {
  LOGIN_USER: "/user/login",
  UPLOAD_AVATAR: "/user/uploadAvatar",
  GET_USER_DETAILS: "/user/currUserInfo",
  GET_OTP: "/verification/sendOtp",
  VERIFY_OTP: "/verification/verifyOTP",
  LOGOUT_USER: "/user/logout",
  CREATE_MEETING: "/meeting/createMeeting",
  GET_DASHBOARD_STATS: "/meeting/getDashBoardStats",
  GET_ALL_MY_MEETINGS: ({ pageNo, items }) =>
    "/meeting/getMeetings" + `?pageNo=${pageNo}&items=${items}`,
  GET_UPCOMING_MEETINGS: ({ pageNo, items }) =>
    "/meeting/getUpCommingMeetings" + `?pageNo=${pageNo}&items=${items}`,
  GET_PENDING_MEETINGS: ({ pageNo, items }) =>
    "/meeting/getPendingMeetings" + `?pageNo=${pageNo}&items=${items}`,
  GET_CONFLICTS: (id) => `/meeting/conflicts/${id}`,
};
export default endPoints;
