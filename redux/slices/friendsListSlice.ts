import { createSlice } from "@reduxjs/toolkit";
import { FriendsListSliceState } from "../types";
import { addFriend, removeFriend } from "../case-reducers";

export const initialState: FriendsListSliceState = {
  friendsList: [],
};

export const friendsListSlice = createSlice({
  name: "friendsList",
  initialState,
  reducers: {
    addFriend,
    removeFriend,
  },
});

export default friendsListSlice.reducer;
