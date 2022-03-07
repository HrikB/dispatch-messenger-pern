import { Middleware } from "redux";
import { io, Socket } from "socket.io-client";
import { setUserAction, removeUserAction, updateUserAction } from "../actions";
import {
  ServerToClientEvents,
  ClientToServerEvents,
  UserEvents,
} from "../../types";

const socketMiddleware: Middleware = (store) => {
  let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

  return (next) => (action) => {
    if (setUserAction.match(action)) {
      console.log("here");
      socket = io(
        `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_DEV_PORT}`
        //   {
        //     withCredentials: true,
        //   }
      );

      socket.on("connect", () => {
        const { firstName, lastName } = action.payload;
        console.log(
          `${firstName} ${lastName} connected, socketId ${socket.id}`
        );
      });
    }

    // if (updateUserAction.match(action)) {
    //   socket.emit(UserEvents.UPDATE_USER, action.payload);
    // }

    // if (removeUserAction.match(action)) {
    //   socket.disconnect();
    // }

    next(action);
  };
};

export default socketMiddleware;
