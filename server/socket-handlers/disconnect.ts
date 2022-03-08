import { Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "../../types";

export default (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
  socket.on("disconnect", () => {
    console.log("client disconnected!!");
  });
};
