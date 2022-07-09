import {
  ServerToClientEvents,
  ClientToServerEvents,
  UserEvents,
} from "../../../../types";
import { updateUserSuccessAction } from "../../../actions";
import { Socket } from "socket.io-client";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

export const emitUpdate = (
  socket: Socket<ServerToClientEvents, ClientToServerEvents>,
  action: AnyAction,
  next: Dispatch<AnyAction>
) => {
  return new Promise((resolve, reject) => {
    socket.emit(UserEvents.UPDATE_USER, action.payload, (res) => {
      if (res && "error" in res) reject(res);
      else {
        next(updateUserSuccessAction(action.payload));
        resolve({ success: true });
      }
    });
  });
};

export default emitUpdate;
