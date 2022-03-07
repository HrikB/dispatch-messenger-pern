import {
  configureStore,
  combineReducers,
  applyMiddleware,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { userReducer } from "./slices";
import { socketMiddleware } from "./middleware";

const rootReducer = combineReducers({ userReducer });

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export default store;
