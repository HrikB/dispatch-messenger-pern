import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./slices";

const rootReducer = combineReducers({ userReducer });

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
