import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
   setCart: (_, action) => {
  return Array.isArray(action.payload) ? action.payload : [];
},

    increaseQty: (state, action) => {
      const item = state.find(i => i.productId === action.payload);
      if (item) item.qty += 1;
    },

    decreaseQty: (state, action) => {
      const item = state.find(i => i.productId === action.payload);
      if (item && item.qty > 1) item.qty -= 1;
    },

    removeItem: (state, action) =>
      state.filter(i => i.productId !== action.payload),
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;