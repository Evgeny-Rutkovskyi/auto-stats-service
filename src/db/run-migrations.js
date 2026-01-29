import fs from "fs";
import { query } from "./database.js";

export async function runMigrations() {
  const sql = fs.readFileSync(
    new URL("./migrations/001_init.sql", import.meta.url),
    "utf8"
  );

  await query(sql);
  console.log("Migration applied");
}
