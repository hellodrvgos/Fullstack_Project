import { configureStore } from "@reduxjs/toolkit";

import productListReducer from "../redux/slices/product";
import userInformationReducer from "../redux/slices/user";
import cartListReducer from "../redux/slices/cart";
import wishListReducer from "../redux/slices/wishlist";
import orderListReducer from "../redux/slices/orders";

const store = configureStore({
    reducer: {
        productlist: productListReducer,
        userinformation: userInformationReducer,
        cartlist: cartListReducer,
        wishlist: wishListReducer,
        orderlist: orderListReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;