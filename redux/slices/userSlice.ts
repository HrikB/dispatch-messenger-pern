import { createSlice } from "@reduxjs/toolkit";
import {
  setUser as setUserReducer,
  removeUser as removeUserReducer,
  updateUserRequest as updateUserRequestReducer,
  updateUserSuccess as updateUserSuccessReducer,
  updateUserFailed as updateUserFailedReducer,
} from "../case-reducers";
import { User } from "../../types";

type UserSliceState = { user: User | null };

const initialState: UserSliceState = { user: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: setUserReducer,
    removeUser: removeUserReducer,
    updateUserRequest: updateUserRequestReducer,
    updateUserSuccess: updateUserSuccessReducer,
    updateUserFailed: updateUserFailedReducer,
  },
});

export default userSlice.reducer;
