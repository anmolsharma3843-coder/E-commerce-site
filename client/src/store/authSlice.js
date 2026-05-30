// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");
const profileImage= localStorage.getItem("profileImage");
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setProfileImage: (state, action) => {
  if (state.user) {
    state.user.profileImage = action.payload;

    localStorage.setItem("user",JSON.stringify(state.user)
    );
  }
},
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    }
  }
});
export const { setUser,setProfileImage, logout } = authSlice.actions;
export default authSlice;
