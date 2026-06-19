import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cartReducer from "./cartSlice"; 

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartReducer, 
  },
});

export default store;