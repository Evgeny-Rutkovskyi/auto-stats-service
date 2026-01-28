import Koa from "koa";
import bodyParser from "koa-bodyparser";

import { errorMiddleware } from "./middlewares/error.middleware.js";
import statsRoutes from "./routes/stats.routes.js";

export function createApp() {
  const app = new Koa();

  app.use(errorMiddleware);
  app.use(bodyParser({ enableTypes: ["json"] }));

  app.use(statsRoutes.routes()).use(statsRoutes.allowedMethods());

  return app;
}
