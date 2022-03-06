import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

export type State = { user: User | null };

export const setUser: CaseReducer<State, PayloadAction<User>> = (
  state,
  action
) => {
  state.user = action.payload;
};

export const updateUser: CaseReducer<State, PayloadAction<User>> = (
  state,
  action
) => {
  console.log("asdsad");
  state.user = Object.assign({}, state.user, action.payload);
};

export const removeUser: CaseReducer<State, PayloadAction<User>> = (state) => {
  state.user = null;
};

export default State;
