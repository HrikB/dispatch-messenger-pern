import { createConnection } from "typeorm";
import ORMConfig from "../server/ormconfig";

export async function getOrmConnection() {
  return await createConnection({
    ...ORMConfig,
    name: "next",
  });
}

export default getOrmConnection;
