import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  authenticated: false,
  userMail: null,
  userId: null,
  userName:null
};
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
    setUserMail: (state, action) => {
      state.userMail = action.payload;
    },
    setuserId: (state, action) => {
      state.userId = action.payload;
    },
     setName: (state, action) => {
      state.userName = action.payload;
    },
  },
});
export default authSlice.reducer;
export const { setAuthenticated, setUserMail, setuserId ,setName} = authSlice.actions;
