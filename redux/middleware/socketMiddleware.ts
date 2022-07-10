import { Middleware, AnyAction } from "redux";
import { io, Socket } from "socket.io-client";
import {
  setUserAction,
  removeUserAction,
  updateUserRequestAction,
} from "../actions";
import { ServerToClientEvents, ClientToServerEvents, User } from "../../types";
import { onConnect, emitUpdate as emitUpdateUser } from "../socket";
import { RootState } from "../reducer";
import { HYDRATE } from "next-redux-wrapper";

const socketMiddleware: Middleware<unknown, RootState> = ({ dispatch }) => {
  let socket: Socket<ServerToClientEvents, ClientToServerEvents> | undefined;

  return (next) => async (action: AnyAction) => {
    if (setUserAction.match(action) || action.type === HYDRATE) {
      if (socket !== undefined) socket.close();

      let user: User;
      if (setUserAction.match(action)) user = action.payload;
      else user = action.payload.userReducer.user;

      //only initialize socket client-side
      if (user !== null && typeof window !== "undefined") {
        socket = io(
          `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_DEV_PORT}`,
          {
            withCredentials: true,
          }
        );

        onConnect(socket, user);
      }
    }

    if (updateUserRequestAction.match(action))
      await emitUpdateUser(socket, action, next);

    if (removeUserAction.match(action)) socket.disconnect();

    next(action);
  };
};

export default socketMiddleware;
