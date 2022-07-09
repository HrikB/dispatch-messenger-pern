import { createSlice } from "@reduxjs/toolkit";
import {
  setUser as setUserReducer,
  removeUser as removeUserReducer,
  updateUserRequest as updateUserRequestReducer,
  updateUserSuccess as updateUserSuccessReducer,
} from "../case-reducers";
import { UserSliceState } from "../types";

export const initialState: UserSliceState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: setUserReducer,
    removeUser: removeUserReducer,
    updateUserRequest: updateUserRequestReducer,
    updateUserSuccess: updateUserSuccessReducer,
  },
});

export default userSlice.reducer;
