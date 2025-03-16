import { unitsTable } from "../schema.ts";
import { eq } from "drizzle-orm";
import type { Db } from "../index.ts";

export function createUnitHandlers(db: Db) {
  return {
    async getUnits() {
      const units = await db.select().from(unitsTable);
      return units;
    },
    async getUnitById(id: number) {
      const unit = await db.query.unitsTable.findFirst({
        where: eq(unitsTable.id, id),
      });
      if (!unit) {
        throw new Error("Unit not found");
      }
      return unit;
    },
    async createUnit(unitData: typeof unitsTable.$inferInsert) {
      const insertedUnits = await db.insert(unitsTable).values(unitData)
        .returning();
      if (insertedUnits.length !== 1) {
        throw new Error("Failed to insert unit. Length is not 1");
      }
      return insertedUnits[0];
    },
    async updateUnit(id: number, unitData: typeof unitsTable.$inferSelect) {
      const { id: _id, ...unitWithoutId } = unitData;
      const updatedUnits = await db.update(unitsTable).set(unitWithoutId).where(
        eq(unitsTable.id, id),
      ).returning();
      if (updatedUnits.length !== 1) {
        throw new Error("Failed to update unit. Length is not 1");
      }
      return updatedUnits[0];
    },
    async deleteUnit(id: number) {
      const deletedUnits = await db.delete(unitsTable).where(
        eq(unitsTable.id, id),
      )
        .returning();
      if (deletedUnits.length !== 1) {
        throw new Error("Failed to delete unit. Length is not 1");
      }
      return deletedUnits[0];
    },
  };
}
