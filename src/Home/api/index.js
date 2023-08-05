import { configureStore} from "@reduxjs/toolkit";
import {authApi} from "./authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authSlice } from "./authSlice";

const store = configureStore({
    reducer:{
        [authApi.reducerPath]:authApi.reducer,
        auth:authSlice.reducer
    },
    middleware:(getDefaultMiddleWare)=>
        getDefaultMiddleWare().concat(authApi.middleware)
});
setupListeners(store.dispatch)
export default store;