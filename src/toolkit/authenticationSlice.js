import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  authenticated: false,
};
const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
        state.authenticated = action.payload;
    },
  },
});
export default authSlice.reducer;
export const {setAuthenticated} = authSlice.actions;
