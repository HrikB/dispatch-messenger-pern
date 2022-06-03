import { userReducer, friendsListReducer } from "./slices";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({ userReducer, friendsListReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
