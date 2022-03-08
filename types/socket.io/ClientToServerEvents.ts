import { UserEvents } from "../events";
import { User } from "..";

interface Response {
  error: string;
  errorDetails: string;
}

type Acknowledgment = (res: Response) => void;

type ClientToServerEvents = {
  [key in UserEvents]: (userChanges: User, cb: Acknowledgment) => void;
};

export default ClientToServerEvents;
