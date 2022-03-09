import { createSlice } from "@reduxjs/toolkit";
import {
  setUser as setUserReducer,
  removeUser as removeUserReducer,
  updateUserRequest as updateUserRequestReducer,
  updateUserSuccess as updateUserSuccessReducer,
  updateUserFailed as updateUserFailedReducer,
  clearError as clearErrorReducer,
} from "../case-reducers";
import { UserSliceState } from "../types";

const initialState: UserSliceState = {
  user: null,
  fetching: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: setUserReducer,
    removeUser: removeUserReducer,
    updateUserRequest: updateUserRequestReducer,
    updateUserSuccess: updateUserSuccessReducer,
    updateUserFailed: updateUserFailedReducer,
    clearError: clearErrorReducer,
  },
});

export default userSlice.reducer;
