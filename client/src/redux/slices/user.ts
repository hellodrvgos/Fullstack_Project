import { createSlice } from "@reduxjs/toolkit";
import { Address } from "cluster";

type InitialState = {
    userInfo: {
        email: string,
        fullname: string,
    };
}

const initialState: InitialState = {
    userInfo: {
        email: "",
        fullname: "",
    },
}

const userInfoSlice = createSlice({
    name: "userInformation",
    initialState,
    reducers: {
        getUserInfo: (state, action) => {
            state.userInfo = action.payload;
        }
    }
})

export const userInfoActions = userInfoSlice.actions;

const reducer = userInfoSlice.reducer;

export default reducer;