const endPoints = {
    LOGIN_USER: "/user/login",
    GET_USER_DETAILS:'/user/currUserInfo',
    GET_OTP:'/verification/sendOtp',
    VERIFY_OTP:'/verification/verifyOTP',
    LOGOUT_USER:'/user/logout',
    CREATE_MEETING:'/meeting/createMeeting',
    GET_DASHBOARD_STATS:'/meeting/getDashBoardStats',
    GET_ALL_MY_MEETINGS:({pageNo,items})=>'/meeting/getMeetings'+`?pageNo=${pageNo}&items=${items}`,
}
export default endPoints;