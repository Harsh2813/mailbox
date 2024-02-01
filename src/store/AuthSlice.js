import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token") || "";
const initialId = localStorage.getItem("userId") || "";

const initialAuthState = {
  token: initialToken,
  isLoggedIn: !!initialToken,
  userId: initialId,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      // Update local storage on login
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      state.userId = null;

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
