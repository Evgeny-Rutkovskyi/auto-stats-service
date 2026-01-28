import { AppDataSource } from "../db/database.js";
import { ListingStat } from "../entities/stats.entity.js";
import { MetricEvent } from "../enums/metric-event.enum.js";

export class StatsService {
  constructor() {
    this.repo = AppDataSource.getRepository(ListingStat);
  }

  async getStats(autoId) {
    const row = await this.repo.findOne({ where: { autoId } });
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
      return { ok: true };
    }

    await AppDataSource.transaction(async (manager) => {
      const repo = manager.getRepository(ListingStat);
      const updateRes = await repo
        .createQueryBuilder()
        .update(ListingStat)
        .set({
          listingViews: () => `"listingViews" + ${incListing}`,
          phoneViews: () => `"phoneViews" + ${incPhone}`,
          updatedAt: () => "NOW()",
        })
        .where(`"autoId" = :autoId`, { autoId })
        .execute();

      if ((updateRes.affected || 0) > 0) return;

      try {
        await repo.insert({
          autoId,
          listingViews: incListing,
          phoneViews: incPhone,
        });
      } catch (err) {
        throw err;
      }
    });

    return { ok: true };
  }
}
