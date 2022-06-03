import { ServerToClientEvents, ClientToServerEvents } from "../../../../types";
import { Socket } from "socket.io-client";

export default (
  socket: Socket<ServerToClientEvents, ClientToServerEvents>,
  action: any
) => {
  socket.on("connect", () => {
    const { firstName, lastName } = action.payload;
    console.log(`${firstName} ${lastName} connected, socketId ${socket.id}`);
  });
};
