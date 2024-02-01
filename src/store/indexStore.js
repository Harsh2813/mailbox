import { configureStore } from "@reduxjs/toolkit";
import AuthReduecr from "./AuthSlice";

const store = configureStore({
    reducer: {auth: AuthReduecr},
});

export default store;