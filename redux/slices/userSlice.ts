import { createSlice } from "@reduxjs/toolkit";
import {
  setUser as setUserReducer,
  removeUser as removeUserReducer,
  updateUser as updateUserReducer,
} from "../case-reducers";
import { User } from "../../types";

type UserSliceState = { user: User | null };

const initalState: UserSliceState = { user: null };

export const userSlice = createSlice({
  name: "user",
  initialState: initalState,
  reducers: {
    setUser: setUserReducer,
    removeUser: removeUserReducer,
    updateUser: updateUserReducer,
  },
});

export default userSlice.reducer;
