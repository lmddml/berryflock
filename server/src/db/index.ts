import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { drizzle } from "drizzle-orm/node-postgres";
import { customersTable, unitsTable } from "./schema.ts";
import { eq } from "drizzle-orm";
import * as schema from "./schema.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

const db = drizzle(Deno.env.get("DATABASE_URL")!, { schema });

const router = new Router();
router
  .get("/customers", async (context) => {
    const customers = await db.select().from(customersTable);
    context.response.body = customers;
  })
  .get("/customers/:id", async (context) => {
    const customer = await db.query.customersTable.findFirst({
      where: eq(customersTable.id, Number(context.params.id)),
    });
    if (!customer) {
      throw new Error("Customer not found");
    }
    context.response.body = customer;
  })
  .post("/customers", async (context) => {
    const customer = await context.request.body
      .json() as typeof customersTable.$inferInsert;
    const insertedCustomers = await db.insert(customersTable).values(customer)
      .returning();
    if (insertedCustomers.length !== 1) {
      throw new Error("Failed to insert customer. Length is not 1");
    }
    context.response.body = insertedCustomers[0];
  })
  .put("/customers/:id", async (context) => {
    const customer = await context.request.body
      .json() as typeof customersTable.$inferSelect;
    const { id: _id, ...customerWithoutId } = customer;
    const updatedCustomers = await db.update(customersTable).set(
      customerWithoutId,
    ).where(
      eq(customersTable.id, Number(context.params.id)),
    ).returning();
    if (updatedCustomers.length !== 1) {
      throw new Error("Failed to update customer. Length is not 1");
    }
    context.response.body = updatedCustomers[0];
  })
  .delete("/customers/:id", async (context) => {
    const deletedCustomers = await db.delete(customersTable).where(
      eq(customersTable.id, Number(context.params.id)),
    ).returning();
    if (deletedCustomers.length !== 1) {
      throw new Error("Failed to delete customer. Length is not 1");
    }
    context.response.body = deletedCustomers[0];
  })
  // Units routes
  .get("/units", async (context) => {
    const units = await db.select().from(unitsTable);
    context.response.body = units;
  })
  .get("/units/:id", async (context) => {
    const unit = await db.query.unitsTable.findFirst({
      where: eq(unitsTable.id, Number(context.params.id)),
    });
    if (!unit) {
      throw new Error("Unit not found");
    }
    context.response.body = unit;
  })
  .post("/units", async (context) => {
    const unit = await context.request.body
      .json() as typeof unitsTable.$inferInsert;
    const insertedUnits = await db.insert(unitsTable).values(unit)
      .returning();
    if (insertedUnits.length !== 1) {
      throw new Error("Failed to insert unit. Length is not 1");
    }
    context.response.body = insertedUnits[0];
  })
  .put("/units/:id", async (context) => {
    const unit = await context.request.body
      .json() as typeof unitsTable.$inferSelect;
    const { id: _id, ...unitWithoutId } = unit;
    const updatedUnits = await db.update(unitsTable).set(
      unitWithoutId,
    ).where(
      eq(unitsTable.id, Number(context.params.id)),
    ).returning();
    if (updatedUnits.length !== 1) {
      throw new Error("Failed to update unit. Length is not 1");
    }
    context.response.body = updatedUnits[0];
  })
  .delete("/units/:id", async (context) => {
    const deletedUnits = await db.delete(unitsTable).where(
      eq(unitsTable.id, Number(context.params.id)),
    ).returning();
    if (deletedUnits.length !== 1) {
      throw new Error("Failed to delete unit. Length is not 1");
    }
    context.response.body = deletedUnits[0];
  });


const app = new Application();
app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
