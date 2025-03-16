import { resourcesTable } from "../schema.ts";
import { eq } from "drizzle-orm";
import type { Db } from "../index.ts";

export function createJobResourceHandlers(db: Db) {
  return {
    async getJobResources() {
      const jobResources = await db.select().from(resourcesTable);
      return { jobResources };
    },
    async getJobResourceById(id: number) {
      const jobResource = await db.query.resourcesTable.findFirst({
        where: eq(resourcesTable.id, id),
      });
      if (!jobResource) {
        throw new Error("Job resource not found");
      }
      return { jobResource };
    },
    async createJobResource(jobResourceData: typeof resourcesTable.$inferInsert) {
      const insertedJobResources = await db.insert(resourcesTable).values(jobResourceData)
        .returning();
      if (insertedJobResources.length !== 1) {
        throw new Error("Failed to insert job resource. Length is not 1");
      }
      return { jobResource: insertedJobResources[0] };
    },
    async updateJobResource(id: number, jobResourceData: typeof resourcesTable.$inferSelect) {
      const { id: _id, ...jobResourceWithoutId } = jobResourceData;
      const updatedJobResources = await db.update(resourcesTable).set(
        jobResourceWithoutId,
      ).where(eq(resourcesTable.id, id)).returning();
      if (updatedJobResources.length !== 1) {
        throw new Error("Failed to update job resource. Length is not 1");
      }
      return { jobResource: updatedJobResources[0] };
    },
    async deleteJobResource(id: number) {
      const deletedJobResources = await db.delete(resourcesTable).where(
        eq(resourcesTable.id, id),
      ).returning();
      if (deletedJobResources.length !== 1) {
        throw new Error("Failed to delete job resource. Length is not 1");
      }
      return { jobResource: deletedJobResources[0] };
    }
  };
}