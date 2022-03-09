import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

export type State = { user: User | null };

export const setUser: CaseReducer<State, PayloadAction<User>> = (
  state,
  action
) => {
  state.user = action.payload;
};

export const updateUserRequest: CaseReducer<State, PayloadAction<User>> = (
  state,
  action
) => {
  console.log("running reducer");
  state = Object.assign(state, { fetching: true });
};

export const updateUserSuccess: CaseReducer<State, PayloadAction<User>> = (
  state,
  action
) => {
  console.log("payload", state.user, action.payload);
  state.user = Object.assign({}, state.user, action.payload);
  state = Object.assign(state, { fetching: false });
};

export const updateUserFailed: CaseReducer<
  State,
  PayloadAction<{ error: string }>
> = (state, action) => {
  console.log("2", state);
  state = Object.assign(state, {
    fetching: false,
    error: action.payload.error,
  });
};

export const removeUser: CaseReducer<State, PayloadAction<User>> = (state) => {
  state.user = null;
};

export default State;
