import { configureStore } from "@reduxjs/toolkit";
import AuthReduecr from "./AuthSlice";
import MailReducer from './MailSlice';

const store = configureStore({
    reducer: {auth: AuthReduecr, mail: MailReducer},
});

export default store;