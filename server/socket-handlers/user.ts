import { Socket } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  User,
  UserEvents,
} from "../../types";
import { Users } from "../entity";
import { updateSchema, createSocketError } from "../helpers";
import { ValidationError } from "joi";

export const userHandler = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
  socket.on(UserEvents.UPDATE_USER, async (userChanges, cb) => {
    console.log("asd", userChanges);
    const { id } = userChanges;
    console.log(1);

    const toUpdate: Partial<User> = Object.assign({}, userChanges);
    console.log(2);
    delete toUpdate["id"];

    try {
      const valid = await updateSchema.validateAsync(toUpdate);
      //@ts-ignore
      Users.update(id, valid);
      cb();
    } catch (err) {
      if (err instanceof ValidationError) return createSocketError(cb, err);
      throw err;
    }
  });
};

export default userHandler;
