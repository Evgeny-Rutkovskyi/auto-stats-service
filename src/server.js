import "dotenv/config";
import { createApp } from "./app.js";
import { AppDataSource } from "./db/database.js";

async function start() {
  await AppDataSource.initialize(); 

  const app = createApp();
  const port = Number(process.env.PORT || 3000);

  app.listen(port, () => console.log(`Listening on :${port}`));
}

start().catch((e) => {
  console.error(e);
  process.exit(1);
});
