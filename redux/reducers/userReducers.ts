import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

export type State = User | null;

export const setUser: CaseReducer<State, PayloadAction<User>> = (
  state,
  action
) => action.payload;

export const removeUser: CaseReducer<State, PayloadAction<User>> = (state) =>
  null;

export default State;
