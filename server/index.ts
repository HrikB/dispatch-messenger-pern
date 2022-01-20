import "reflect-metadata";
import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { ApolloServer, gql } from "apollo-server-express";
import next from "next";
import { UserResolver } from "./resolvers";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dir: ".", dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const connection = await createConnection();
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });
  const server = new ApolloServer({ schema });
  const app = express();
  await server.start();
  server.applyMiddleware({ app });

  app.all("*", (req: Request, res: Response) => {
    return handle(req, res);
  });

  app.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});