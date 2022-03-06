import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../../types";
import { RootState } from "../types";

export type State = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
};

export const setSocket: CaseReducer<State, PayloadAction<Socket>> = (
  state,
  action
) => {
  state.socket = action.payload;
};

export const removeSocket: CaseReducer<State, PayloadAction<Socket>> = (
  state
) => {
  state.socket = null;
};
