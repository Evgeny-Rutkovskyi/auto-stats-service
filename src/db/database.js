import pg from "pg";
import { config } from "../config/config.js";

const { Pool } = pg;

export const pool = new Pool({
  host: config.POSTGRES_HOST,
  port: Number(config.POSTGRES_PORT),
  user: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
});

export async function query(text, params) {
  const res = await pool.query(text, params);
  return res;
}

pool.on("error", (err) => {
  console.error("Unexpected PG pool error:", err);
});
