import { userReducer } from "./slices";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({ userReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
