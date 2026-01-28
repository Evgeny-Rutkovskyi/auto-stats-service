import { EntitySchema } from "typeorm";

export const ListingStat = new EntitySchema({
  name: "ListingStat",
  tableName: "listing_stats",
  columns: {
    autoId: {
      type: Number,
      primary: true,
      generated: false,
    },
    listingViews: {
      type: Number,
      default: 0,
    },
    phoneViews: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: "timestamptz",
      createDate: true,
    },
    updatedAt: {
      type: 'timestamptz',
      updateDate: true,
    },
  },
});
