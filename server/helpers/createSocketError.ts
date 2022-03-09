import { ValidationError } from "joi";
import { Acknowledgment } from "../../types/socket.io/ClientToServerEvents";

export default (cb: Acknowledgment, err: ValidationError) => {
  return cb({
    error: err.details[0].type,
    errorDetails: err.details[0].message,
  });
};
