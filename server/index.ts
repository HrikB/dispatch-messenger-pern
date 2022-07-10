import "reflect-metadata";
import express, { Request, Response } from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import next from "next";
import { UserResolver } from "./resolvers";
import dotenv from "dotenv";
import ORMConfig from "./ormconfig";
import { createConnection } from "typeorm";
import { MyContext } from "./types";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "../types";
import { disconnectHandler, userHandler } from "./socket-handlers";
dotenv.config();
import "./image-kit";

const port = process.env.DEV_PORT || 3001;
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
//@ts-ignore
const app = next({ dir: ".", dev, port, hostname });
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

  // app.get("/l", (req, res, next) => {
  //   res.redirect(301, "/login");
  //   next();
  // });

  app.all("*", async (req: Request, res: Response) => {
    // if (!req.headers.cookie && req.url !== "/login")
    //   return res.redirect(301, "/login");

    return handle(req, res);
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
