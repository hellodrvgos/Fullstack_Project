import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    userInfo: {
        email: string,
        firstName: string,
        lastName: string,
        phone: string,
        country: string,
        city: string,
        address: string
    };
}

const initialState: InitialState = {
    userInfo: {
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        country: "",
        city: "",
        address: ""
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