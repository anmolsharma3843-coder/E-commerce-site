import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],

  reducers: {
    setCart: (_, action) => {
      return Array.isArray(action.payload)
        ? action.payload
        : [];
    },
    clearCart: () => [],
    addItem: (state, action) => {
      const existing = state.find(
        (i) => i._id === action.payload.productId
      );

      if (existing) {
        existing.qty += 1;
      } else {
        state.push({
          ...action.payload,
          qty: 1,
        });
      }
    },

    increaseQty: (state, action) => {
      const item = state.find(
        (i) => i._id === action.payload
      );

      if (item) item.qty += 1;
    },

    decreaseQty: (state, action) => {
      const item = state.find(
        (i) => i._id === action.payload
      );

      if (item && item.qty > 1) {
        item.qty -= 1;
      }
    },

    removeItem: (state, action) =>
      state.filter(
        (i) => i._id !== action.payload
      ),
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;