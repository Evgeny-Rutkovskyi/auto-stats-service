import { MetricEvent } from "../enums/metric-event.enum.js";
import { query } from "../db/database.js";

export class StatsService {
  constructor() {}

  async getStats(autoId) {
    const { rows } = await query(
      `SELECT "autoId", "listingViews", "phoneViews"
       FROM listing_stats
       WHERE "autoId" = $1`,
      [autoId]
    );
    
    const row = rows[0];
    if(!row) return {message: "This car don't have any statistic"};

    return {
      autoId,
      listingViews: row.listingViews,
      phoneViews: row.phoneViews,
    };
  }

  async addMetric(autoId, events) {
    const incListing = events.includes(MetricEvent.LISTING_VIEW) ? 1 : 0;
    const incPhone = events.includes(MetricEvent.PHONE_VIEW) ? 1 : 0;

    if (!incListing && !incPhone) {
      return {error: "Any correct events was not found"};
    }

    await query(
      `
      INSERT INTO listing_stats ("autoId", "listingViews", "phoneViews")
      VALUES ($1, $2, $3)
      ON CONFLICT ("autoId")
      DO UPDATE SET
        "listingViews" = listing_stats."listingViews" + EXCLUDED."listingViews",
        "phoneViews" = listing_stats."phoneViews"   + EXCLUDED."phoneViews"
      `,
      [autoId, incListing, incPhone]
    );

    return { ok: true };
  }
}
