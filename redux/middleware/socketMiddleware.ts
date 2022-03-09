import { Middleware } from "redux";
import { io, Socket } from "socket.io-client";
import {
  setUserAction,
  removeUserAction,
  updateUserRequestAction,
  updateUserFailedAction,
  updateUserSuccessAction,
} from "../actions";
import {
  ServerToClientEvents,
  ClientToServerEvents,
  UserEvents,
} from "../../types";
import { RootState } from "../reducer";

const socketMiddleware: Middleware<unknown, RootState> = ({ dispatch }) => {
  let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

  return (next) => (action) => {
    if (setUserAction.match(action)) {
      socket = io(
        `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_DEV_PORT}`,
        {
          withCredentials: true,
        }
      );

      socket.on("connect", () => {
        const { firstName, lastName } = action.payload;
        console.log(
          `${firstName} ${lastName} connected, socketId ${socket.id}`
        );
      });
    }

    if (updateUserRequestAction.match(action)) {
      return new Promise((resolve, reject) => {
        socket.emit(UserEvents.UPDATE_USER, action.payload, (res) => {
          if (res && "error" in res) {
            next(updateUserFailedAction({ error: res.errorDetails }));
            reject(res);
          } else {
            next(updateUserSuccessAction(action.payload));
            resolve(res);
            //success
          }
        });
      });
    }

    if (removeUserAction.match(action)) socket.disconnect();

    next(action);
  };
};

export default socketMiddleware;
