import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Product } from "../../types/Product";

type InitialState = {
  wishList: Product[];
};

const initialState: InitialState = {
  wishList: [],
};

const wishSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      state.wishList.push(action.payload);
    },
  },
});

export const wishActions = wishSlice.actions;
const reducer = wishSlice.reducer;
export default reducer;