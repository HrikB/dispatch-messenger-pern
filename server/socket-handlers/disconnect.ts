import { Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "../../types";

export const disconnect = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
  socket.on("disconnect", () => {
    console.log("client disconnected!!");
  });
};

export default disconnect;
