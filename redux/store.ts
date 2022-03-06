import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userReducer, socketReducer } from "./slices";

const rootReducer = combineReducers({ userReducer, socketReducer });

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
