import { configureStore } from "@reduxjs/toolkit";

import productListReducer from "../redux/slices/product";
import userInformationReducer from "../redux/slices/user";
import cartListReducer from "../redux/slices/cart";
import favoritesReducer from "./slices/favorites";
import orderListReducer from "../redux/slices/orders";

const store = configureStore({
    reducer: {
        productlist: productListReducer,
        userinformation: userInformationReducer,
        cartlist: cartListReducer,
        favorites: favoritesReducer,
        orderlist: orderListReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;