import { createSlice } from "@reduxjs/toolkit";

import { Product } from "../../types/Product";

type InitialState = {
    productList: Product[];
    pet: string;
}

const initialState: InitialState = {
    productList: [],
    pet: "Cat"
}

const productListSlice = createSlice({
    name: "productList",
    initialState,
    reducers: {
        getProductList: (state, action) => {
            state.productList = action.payload;
        },
        getPet: (state, action) => {
            state.pet = action.payload;
        }
    }
})

export const productListActions = productListSlice.actions;

const reducer = productListSlice.reducer;

export default reducer;