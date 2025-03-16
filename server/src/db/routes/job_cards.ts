import { jobCardsTable } from "../schema.ts";
import { eq } from "drizzle-orm";
import type { Db } from "../index.ts";

export function createJobCardHandlers(db: Db) {
  return {
    async getJobCards() {
      const jobCards = await db.select().from(jobCardsTable);
      return { jobCards };
    },
    async getJobCardById(id: number) {
      const jobCard = await db.query.jobCardsTable.findFirst({
        where: eq(jobCardsTable.id, id),
      });
      if (!jobCard) {
        throw new Error("Job card not found");
      }
      return { jobCard };
    },
    async createJobCard(jobCardData: typeof jobCardsTable.$inferInsert) {
      const insertedJobCards = await db.insert(jobCardsTable).values(jobCardData)
        .returning();
      if (insertedJobCards.length !== 1) {
        throw new Error("Failed to insert job card. Length is not 1");
      }
      return { jobCard: insertedJobCards[0] };
    },
    async updateJobCard(id: number, jobCardData: typeof jobCardsTable.$inferSelect) {
      const { id: _id, ...jobCardWithoutId } = jobCardData;
      const updatedJobCards = await db.update(jobCardsTable).set(
        jobCardWithoutId,
      ).where(eq(jobCardsTable.id, id)).returning();
      if (updatedJobCards.length !== 1) {
        throw new Error("Failed to update job card. Length is not 1");
      }
      return { jobCard: updatedJobCards[0] };
    },
    async deleteJobCard(id: number) {
      const deletedJobCards = await db.delete(jobCardsTable).where(
        eq(jobCardsTable.id, id),
      ).returning();
      if (deletedJobCards.length !== 1) {
        throw new Error("Failed to delete job card. Length is not 1");
      }
      return { jobCard: deletedJobCards[0] };
    }
  };
}