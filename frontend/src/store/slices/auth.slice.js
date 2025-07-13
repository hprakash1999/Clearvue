import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

// Auth slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login reducer
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    // Logout reducer
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
