import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "./middleware";
import { createWrapper } from "next-redux-wrapper";
import masterReducer from "./reducer";

export const makeStore = () =>
  configureStore({
    reducer: masterReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(socketMiddleware),
  });

export const wrapper = createWrapper(makeStore, { debug: true });

export default makeStore;
