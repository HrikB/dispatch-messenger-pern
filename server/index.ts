import "reflect-metadata";
<<<<<<< HEAD
import { bucket } from "./helpers";
=======
>>>>>>> 15c69c0 (reinit)
import express, { Request, Response } from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import next from "next";
<<<<<<< HEAD
import { UserResolver, CloudResolver } from "./resolvers";
=======
import { UserResolver } from "./resolvers";
>>>>>>> 15c69c0 (reinit)
import dotenv from "dotenv";
import ORMConfig from "./ormconfig";
import { createConnection } from "typeorm";
import { MyContext } from "./types";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "../types";
import { disconnectHandler, userHandler } from "./socket-handlers";
dotenv.config();

const port = process.env.DEV_PORT || 3001;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dir: ".", dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const app = express();
  const httpServer = createServer(app);

  try {
    await createConnection(ORMConfig);
  } catch (err) {
    console.log(err);
  }

  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res }): MyContext => ({ req, res }),
  });
  await server.start();
  server.applyMiddleware({ app });

  const io = new Server(httpServer);
  io.on(
    "connection",
    (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
      console.log("connection123!!");

      userHandler(socket);
      disconnectHandler(socket);
    }
  );

  app.all("*", (req: Request, res: Response) => {
    return handle(req, res);
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
