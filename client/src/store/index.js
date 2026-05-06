import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cartReducer from "./cartSlice"; // 👈 IMPORT THIS

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartReducer, // 👈 ADD THIS
  },
});

export default store;