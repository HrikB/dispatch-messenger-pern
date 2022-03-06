import { UserEvents } from "../events";
import { User } from "..";

type ClientToServerEvents = {
  [key in UserEvents]: (userChanges: User) => void;
};

export default ClientToServerEvents;
