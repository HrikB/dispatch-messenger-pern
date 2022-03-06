import { io, Socket } from "socket.io-client";
import { useAppDispatch as useDispatch, setSocketAction } from "../redux";
import { ServerToClientEvents, ClientToServerEvents } from "../types";
import { useEffect } from "react";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_DEV_PORT}`
);

const useDispatchSocket = () => {
  const dispatch = useDispatch();

  // console.log(socket);

  useEffect(() => {
    dispatch(setSocketAction(socket));
  }, []);
};

export default useDispatchSocket;
