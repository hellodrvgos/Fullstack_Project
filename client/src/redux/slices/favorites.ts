import { createSlice } from "@reduxjs/toolkit";

import { Product } from "../../types/Product";

type Favorite = {
  favorites: Product;
  userId: string;
}

type InitialState = {
  favoriteList: Favorite[];
};

const initialState: InitialState = {
  favoriteList: [],
};

const favoritesSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    getFavoritesList: (state, action) => {
      // state.favoriteList.push(action.payload)
      state.favoriteList = action.payload

    },
  },
});

export const favoritesActions = favoritesSlice.actions;
const reducer = favoritesSlice.reducer;
export default reducer;