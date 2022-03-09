import { userSlice } from "../slices";

export const {
  setUser,
  removeUser,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailed,
  clearError,
} = userSlice.actions;
