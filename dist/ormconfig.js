"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var entity_1 = require("./entity");
var path_1 = __importDefault(require("path"));
var isCompiled = path_1.default.extname(__filename).includes("js");
exports.default = {
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
    entities: [entity_1.User],
    migrations: ["server/migration/**/*.".concat(isCompiled ? "js" : "ts")],
    cli: {
        entitiesDir: "server/entity",
        migrationsDir: "server/migration",
    },
};
