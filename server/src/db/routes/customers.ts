import { customersTable } from "../schema.ts";
import { eq } from "drizzle-orm";
import type { Db } from "../index.ts";

export function createCustomerHandlers(db: Db) {
  return {
    async getCustomers() {
      const customers = await db.select().from(customersTable);
      return { customers };
    },
    async getCustomerById(id: number) {
      const customer = await db.query.customersTable.findFirst({
        where: eq(customersTable.id, id),
      });
      if (!customer) {
        throw new Error("Customer not found");
      }
      return { customer };
    },
    async createCustomer(customerData: typeof customersTable.$inferInsert) {
      const insertedCustomers = await db.insert(customersTable).values(customerData)
        .returning();
      if (insertedCustomers.length !== 1) {
        throw new Error("Failed to insert customer. Length is not 1");
      }
      return { customer: insertedCustomers[0] };
    },
    async updateCustomer(id: number, customerData: typeof customersTable.$inferSelect) {
      const { id: _id, ...customerWithoutId } = customerData;
      const updatedCustomers = await db.update(customersTable).set(
        customerWithoutId,
      ).where(eq(customersTable.id, id)).returning();
      if (updatedCustomers.length !== 1) {
        throw new Error("Failed to update customer. Length is not 1");
      }
      return { customer: updatedCustomers[0] };
    },
    async deleteCustomer(id: number) {
      const deletedCustomers = await db.delete(customersTable).where(
        eq(customersTable.id, id),
      ).returning();
      if (deletedCustomers.length !== 1) {
        throw new Error("Failed to delete customer. Length is not 1");
      }
      return { customer: deletedCustomers[0] };
    }
  };
}