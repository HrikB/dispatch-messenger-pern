import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import {
  setSocket as setSocketReducer,
  removeSocket as removeSocketReducer,
} from "../case-reducers";
import { ServerToClientEvents, ClientToServerEvents } from "../../types";

type SocketSliceState = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
};

const initialState: SocketSliceState = { socket: null };

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: setSocketReducer,
    removeSocket: removeSocketReducer,
  },
});

export default socketSlice.reducer;
