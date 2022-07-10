import {
  ServerToClientEvents,
  ClientToServerEvents,
  User,
} from "../../../../types";
import { Socket } from "socket.io-client";
import { ConstructionOutlined } from "@mui/icons-material";

export const onConnect = (
  socket: Socket<ServerToClientEvents, ClientToServerEvents>,
  user: User
) => {
  socket.on("connect", () => {
    const { firstName, lastName } = user;
    console.log(`${firstName} ${lastName} connected, socketId ${socket.id}`);
  });
};

export default onConnect;
