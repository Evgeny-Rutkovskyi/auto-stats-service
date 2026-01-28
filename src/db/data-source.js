import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "../config/config.js";
import { ListingStat } from "../entities/stats.entity.js";

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
  migrations: ["src/db/migrations/*.js"],
});
