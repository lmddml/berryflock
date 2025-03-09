import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { drizzle } from "drizzle-orm/node-postgres";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import * as schema from "./schema.ts";
import { createUnitHandlers } from "./routes/units.ts";
import { createCustomerHandlers } from "./routes/customers.ts";

const db = drizzle(Deno.env.get("DATABASE_URL")!, { schema });

const app = new Application();
app.use(oakCors()); // Enable CORS for All Routes

const router = new Router();

const {
  createUnit,
  deleteUnit,
  getUnitById,
  getUnits,
  updateUnit,
} = createUnitHandlers(db);

const {
  createCustomer,
  deleteCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer,
} = createCustomerHandlers(db);

router
  .get("/units", async (context) => {
    const result = await getUnits();
    context.response.body = result;
  })
  .get("/units/:id", async (context) => {
    const id = Number(context.params.id);
    const result = await getUnitById(id);
    context.response.body = result;
  })
  .post("/units", async (context) => {
    const unit = await context.request.body
      .json() as typeof schema.unitsTable.$inferInsert;
    const result = await createUnit(unit);
    context.response.body = result;
  })
  .put("/units/:id", async (context) => {
    const id = Number(context.params.id);
    const unit = await context.request.body
      .json() as typeof schema.unitsTable.$inferSelect;
    const result = await updateUnit(id, unit);
    context.response.body = result;
  })
  .delete("/units/:id", async (context) => {
    const id = Number(context.params.id);
    const result = await deleteUnit(id);
    context.response.body = result;
  })
  .get("/customers", async (context) => {
    const result = await getCustomers();
    context.response.body = result;
  })
  .get("/customers/:id", async (context) => {
    const id = Number(context.params.id);
    const result = await getCustomerById(id);
    context.response.body = result;
  })
  .post("/customers", async (context) => {
    const customer = await context.request.body
      .json() as typeof schema.customersTable.$inferInsert;
    const result = await createCustomer(customer);
    context.response.body = result;
  })
  .put("/customers/:id", async (context) => {
    const id = Number(context.params.id);
    const customer = await context.request.body
      .json() as typeof schema.customersTable.$inferSelect;
    const result = await updateCustomer(id, customer);
    context.response.body = result;
  })
  .delete("/customers/:id", async (context) => {
    const id = Number(context.params.id);
    const result = await deleteCustomer(id);
    context.response.body = result;
  });

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });

type Db = typeof db;

export { type Db };