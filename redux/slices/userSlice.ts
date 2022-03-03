import { createSlice } from "@reduxjs/toolkit";

type UserSliceState = { user: null } | { user: string };

const initalState: UserSliceState = { user: null };

export const userSlice = createSlice({
  name: "user",
  initialState: initalState,
  reducers: {},
});

export default userSlice.reducer;
