import Router from "@koa/router";
import { StatsService } from "../services/stats.service.js";

const router = new Router();
const statsService = new StatsService();

router.get("/stats/:autoId", async (ctx) => {
  try {
    const autoId = Number(ctx.params.autoId);
    if (!autoId || typeof autoId !== 'number') {
      ctx.status = 400;
      ctx.body = { error: "autoId must be a positive number" };
      return;
    }

    const stats = await statsService.getStats(autoId);
    ctx.status = 200;
    ctx.body = stats;
  } catch (err) {
    console.error(err);
    ctx.status = 500;
    ctx.body = { error: "Server error" };
  }
});

router.post("/metrics", async (ctx) => {
  try {
    const body = ctx.request.body || {};
    const autoId = Number(body.autoId);
    const events = body.events;

    if (!autoId || typeof autoId !== 'number') {
      ctx.status = 400;
      ctx.body = { error: "autoId must be a positive number" };
      return;
    }

    if(!Array.isArray(events) || events.length == 0){
        ctx.status = 400;
        ctx.body = {error: "Any correct events was not found"};
        return;
    }

    await statsService.addMetric(autoId, events);

    ctx.status = 200;
    ctx.body = { ok: true };
  } catch (err) {
    console.error(err);
    ctx.status = 500;
    ctx.body = { error: "Server error" };
  }
});

export default router;
