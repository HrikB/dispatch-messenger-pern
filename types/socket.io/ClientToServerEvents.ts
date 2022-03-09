import { UserEvents } from "../events";
import { User } from "..";

export interface ErrorResponse {
  error: string;
  errorDetails: string;
}

export type Acknowledgment = (res?: ErrorResponse) => void;

type ClientToServerEvents = {
  [key in UserEvents]: (userChanges: User, cb: Acknowledgment) => void;
};

export default ClientToServerEvents;
