import { UserEvents } from "../events";
import { User } from "..";

export interface Response {
  error: string;
  errorDetails: string;
}

export type Acknowledgment = (res?: Response) => void;

type ClientToServerEvents = {
  [key in UserEvents]: (userChanges: User, cb: Acknowledgment) => void;
};

export default ClientToServerEvents;
