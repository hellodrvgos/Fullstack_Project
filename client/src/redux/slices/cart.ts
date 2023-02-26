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
  },
});

export const cartActions = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;