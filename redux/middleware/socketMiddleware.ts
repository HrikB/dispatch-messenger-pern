import { Middleware, AnyAction } from "redux";
import { io, Socket } from "socket.io-client";
import {
  setUserAction,
  removeUserAction,
  updateUserRequestAction,
} from "../actions";
import { ServerToClientEvents, ClientToServerEvents } from "../../types";
import { onConnect, emitUpdate as emitUpdateUser } from "../socket";
import { RootState } from "../reducer";

const socketMiddleware: Middleware<unknown, RootState> = ({ dispatch }) => {
  let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

  return (next) => (action: AnyAction) => {
    if (setUserAction.match(action)) {
      socket = io(
        `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_DEV_PORT}`,
        {
          withCredentials: true,
        }
      );

      onConnect(socket, action);
    }

    if (updateUserRequestAction.match(action))
      emitUpdateUser(socket, action, next);

    if (removeUserAction.match(action)) socket.disconnect();

    next(action);
  };
};

export default socketMiddleware;
