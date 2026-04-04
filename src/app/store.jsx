import { configureStore } from "@reduxjs/toolkit";
import  apiSlice  from "../store/api/apiSlice";
import  cartSlice  from "../store/Cart/CartSlice";
export const store = configureStore({
    reducer: {
        api: apiSlice,
        cart: cartSlice,
    }
})