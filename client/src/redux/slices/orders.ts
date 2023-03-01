import { createSlice } from "@reduxjs/toolkit";

import { Order } from "../../types/Order";

type InitialState = {
    orderList: Order[];
}

const initialState: InitialState = {
    orderList: []
}

const orderListSlice = createSlice({
    name: "orderList",
    initialState,
    reducers: {
        getOrderList: (state, action) => {
            state.orderList = action.payload;
        }
    }
})

export const orderListActions = orderListSlice.actions;

const reducer = orderListSlice.reducer;

export default reducer;