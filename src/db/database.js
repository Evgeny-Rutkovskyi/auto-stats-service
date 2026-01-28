import "reflect-metadata";
import path from "path";
import { fileURLToPath } from "url";
import { DataSource } from "typeorm";
import { config } from "../config/config.js";
import { ListingStat } from "../entities/stats.entity.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.POSTGRES_HOST,
  port: Number(config.POSTGRES_PORT),
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [ListingStat],
  migrationsRun: true,
  migrations: [path.join(__dirname, "migrations", "*.cjs")],
});
