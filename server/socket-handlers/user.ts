import { Socket } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  User,
  UserEvents,
} from "../../types";
import { Users } from "../entity";
import { updateSchema } from "../helpers/joi";
import { ValidationError } from "joi";

export default (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
  socket.on(UserEvents.UPDATE_USER, async (userChanges, cb) => {
    const { id } = userChanges;

    const toUpdate: Partial<User> = Object.assign({}, userChanges);
    delete toUpdate["id"];
    try {
      const valid = await updateSchema.validateAsync(toUpdate);
      //@ts-ignore
      Users.update(id, valid);
    } catch (err) {
      if (err instanceof ValidationError)
        return cb({
          error: err.details[0].type,
          errorDetails: err.details[0].message,
        });
      throw err;
    }
  });
};
