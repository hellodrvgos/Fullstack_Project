import { createSlice } from "@reduxjs/toolkit";

import { Product } from "../../types/Product";

type InitialState = {
    productList: Product[];
}

const initialState: InitialState = {
    productList: [],
}

const productListSlice = createSlice({
    name: "productList",
    initialState,
    reducers: {
        getProductList: (state, action) => {
            state.productList = action.payload;
        }
    }
})

export const productListActions = productListSlice.actions;

const reducer = productListSlice.reducer;

export default reducer;