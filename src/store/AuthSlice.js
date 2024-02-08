import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token") || "";
const initialId = localStorage.getItem("userId") || "";
const initialUserEmail = localStorage.getItem("userEmail") || "";

const initialAuthState = {
  token: initialToken,
  isLoggedIn: !!initialToken,
  userId: initialId,
  userEmail: initialUserEmail,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      state.userEmail = action.payload.userEmail;
      // Update local storage on login
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("userEmail", action.payload.userEmail);
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      state.userId = null;

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem('userEmail');
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
