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
      console.log("here");
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
      socket.emit(UserEvents.UPDATE_USER, action.payload, (res) => {
        if (res && "error" in res) {
          //handle error
          console.log("1");
          next(updateUserFailedAction({ error: res.errorDetails }));
          return res;
        } else {
          console.log("3");
          next(updateUserSuccessAction(action.payload));
          //success
        }
      });
    }

    if (removeUserAction.match(action)) socket.disconnect();

    next(action);
    return socket;
  };
};

export default socketMiddleware;
