import { timeEntriesTable } from "../schema.ts";
import { eq } from "drizzle-orm";
import type { Db } from "../index.ts";

export function createJobTimeEntryHandlers(db: Db) {
  return {
    async getJobTimeEntries() {
      const jobTimeEntries = await db.select().from(timeEntriesTable);
      return { jobTimeEntries };
    },
    async getJobTimeEntryById(id: number) {
      const jobTimeEntry = await db.query.timeEntriesTable.findFirst({
        where: eq(timeEntriesTable.id, id),
      });
      if (!jobTimeEntry) {
        throw new Error("Job time entry not found");
      }
      return { jobTimeEntry };
    },
    async createJobTimeEntry(
      jobTimeEntryData: typeof timeEntriesTable.$inferInsert,
    ) {
      const insertedJobTimeEntries = await db.insert(timeEntriesTable).values(
        jobTimeEntryData,
      )
        .returning();
      if (insertedJobTimeEntries.length !== 1) {
        throw new Error("Failed to insert job time entry. Length is not 1");
      }
      return { jobTimeEntry: insertedJobTimeEntries[0] };
    },
    async updateJobTimeEntry(
      id: number,
      jobTimeEntryData: typeof timeEntriesTable.$inferSelect,
    ) {
      const { id: _id, ...jobTimeEntryWithoutId } = jobTimeEntryData;
      const updatedJobTimeEntries = await db.update(timeEntriesTable).set(
        jobTimeEntryWithoutId,
      ).where(eq(timeEntriesTable.id, id)).returning();
      if (updatedJobTimeEntries.length !== 1) {
        throw new Error("Failed to update job time entry. Length is not 1");
      }
      return { jobTimeEntry: updatedJobTimeEntries[0] };
    },
    async deleteJobTimeEntry(id: number) {
      const deletedJobTimeEntries = await db.delete(timeEntriesTable).where(
        eq(timeEntriesTable.id, id),
      ).returning();
      if (deletedJobTimeEntries.length !== 1) {
        throw new Error("Failed to delete job time entry. Length is not 1");
      }
      return { jobTimeEntry: deletedJobTimeEntries[0] };
    },
  };
}
