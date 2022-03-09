import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";
import { UserSliceState as State } from "../types";

export const setUser: CaseReducer<State, PayloadAction<User>> = (
  state,
  action
) => {
  state.user = action.payload;
};

export const updateUserRequest: CaseReducer<State, PayloadAction<User>> = (
  state
) => {
  state = Object.assign(state, { updating: true });
};

export const updateUserSuccess: CaseReducer<State, PayloadAction<User>> = (
  state,
  action
) => {
  state.user = Object.assign({}, state.user, action.payload);
  state = Object.assign(state, { updating: false });
};

export const updateUserFailed: CaseReducer<
  State,
  PayloadAction<{ error: string }>
> = (state, action) => {
  state = Object.assign(state, {
    updating: false,
    error: action.payload.error,
  });
};

export const clearError: CaseReducer<State> = (state) => {
  state.error = null;
};

export const removeUser: CaseReducer<State> = (state) => {
  state.user = null;
};

export default State;
