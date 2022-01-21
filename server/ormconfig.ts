import { ConnectionOptions } from "typeorm";
import { Users } from "./entity";
import path from "path";

const isCompiled = path.extname(__filename).includes("js");

export default {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.PORT ? parseInt(process.env.PORT) : 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "dispatch",
  synchronize: !process.env.DB_NO_SYNC,
  logging: !process.env.DB_NO_LOGS,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInternal: 2000,
  entities: [Users],
  migrations: [`server/migration/**/*.${isCompiled ? "js" : "ts"}`],
  cli: {
    entitiesDir: "server/entity",
    migrationsDir: "server/migration",
  },
} as ConnectionOptions;
