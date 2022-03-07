import {
  configureStore,
  applyMiddleware,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { socketMiddleware } from "./middleware";
import rootReducer from "./reducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export default store;
