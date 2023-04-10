import { createSlice } from "@reduxjs/toolkit";

import { Product } from "../../types/Product";

type InitialState = {
  cartList: Product[];
};

const initialState: InitialState = {
  cartList: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartList.push(action.payload);
    },
    increaseQuantity: (state, action) => {
      const productInCartIndex = state.cartList.findIndex(product => product._id === action.payload._id);
      state.cartList[productInCartIndex].userQuantity += action.payload.userQuantity;
    },
    emptyCart: (state) => {
      state.cartList.length = 0;
    }
  },
});

export const cartActions = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;