module.exports = class Init1769604097732 {
  name = "Init1769604097732";

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "listing_stats" (
        "autoId" integer NOT NULL,
        "listingViews" integer NOT NULL DEFAULT '0',
        "phoneViews" integer NOT NULL DEFAULT '0',
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_a49188e69957cda44c05109e836" PRIMARY KEY ("autoId")
      )`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "listing_stats"`);
  }
};
