import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/atuhReducer";
//reduxの初期設定
const rootReducer = combineReducers({
    auth:authReducer
});
const store = configureStore({
    reducer: rootReducer
})
export default store;