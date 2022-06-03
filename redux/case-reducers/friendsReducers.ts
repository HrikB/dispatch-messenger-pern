import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";
import { FriendsListSliceState as State } from "../types";

export const addFriend: CaseReducer<State, PayloadAction<User>> = (
  state,
  action
) => {
  state.friendsList = [...state.friendsList, action.payload];
};

export const removeFriend: CaseReducer<State, PayloadAction<User>> = (
  state,
  action
) => {
  //Replace !== with lodash object equals
  state.friendsList = state.friendsList.filter((e) => e !== action.payload);
};
