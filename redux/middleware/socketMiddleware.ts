<<<<<<< HEAD
import { Middleware } from "redux";
=======
import { Middleware, AnyAction } from "redux";
>>>>>>> 15c69c0 (reinit)
import { io, Socket } from "socket.io-client";
import {
  setUserAction,
  removeUserAction,
  updateUserRequestAction,
<<<<<<< HEAD
  updateUserSuccessAction,
} from "../actions";
import {
  ServerToClientEvents,
  ClientToServerEvents,
  UserEvents,
} from "../../types";
=======
} from "../actions";
import { ServerToClientEvents, ClientToServerEvents } from "../../types";
import { onConnect, emitUpdate as emitUpdateUser } from "../socket";
>>>>>>> 15c69c0 (reinit)
import { RootState } from "../reducer";

const socketMiddleware: Middleware<unknown, RootState> = ({ dispatch }) => {
  let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

<<<<<<< HEAD
  return (next) => (action) => {
=======
  return (next) => (action: AnyAction) => {
>>>>>>> 15c69c0 (reinit)
    if (setUserAction.match(action)) {
      socket = io(
        `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_DEV_PORT}`,
        {
          withCredentials: true,
        }
      );

<<<<<<< HEAD
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
          if (res && "error" in res) reject(res);
          else {
            next(updateUserSuccessAction(action.payload));
            resolve({ success: true });
          }
        });
      });
    }
=======
      onConnect(socket, action);
    }

    if (updateUserRequestAction.match(action))
      emitUpdateUser(socket, action, next);
>>>>>>> 15c69c0 (reinit)

    if (removeUserAction.match(action)) socket.disconnect();

    next(action);
  };
};

export default socketMiddleware;
