import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { drizzle } from "drizzle-orm/node-postgres";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import * as schema from "./schema.ts";
import { createUnitHandlers } from "./routes/units.ts";
import { createCustomerHandlers } from "./routes/customers.ts";
import { createJobCardHandlers } from "./routes/job_cards.ts";
import { createJobResourceHandlers } from "./routes/job_resources.ts";
import { createJobTimeEntryHandlers } from "./routes/job_time_entries.ts";

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

const {
  createJobCard,
  deleteJobCard,
  getJobCardById,
  getJobCards,
  updateJobCard,
} = createJobCardHandlers(db);

const {
  createJobResource,
  deleteJobResource,
  getJobResourceById,
  getJobResources,
  updateJobResource,
} = createJobResourceHandlers(db);

const {
  createJobTimeEntry,
  deleteJobTimeEntry,
  getJobTimeEntryById,
  getJobTimeEntries,
  updateJobTimeEntry,
} = createJobTimeEntryHandlers(db);

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
  })
  .get("/job_cards", async (context) => {
    const result = await getJobCards();
    context.response.body = result;
  })
  .get("/job_cards/:id", async (context) => {
    const id = Number(context.params.id);
    const result = await getJobCardById(id);
    context.response.body = result;
  })
  .post("/job_cards", async (context) => {
    const jobCard = await context.request.body
      .json() as typeof schema.jobCardsTable.$inferInsert;
    const result = await createJobCard(jobCard);
    context.response.body = result;
  })
  .put("/job_cards/:id", async (context) => {
    const id = Number(context.params.id);
    const jobCard = await context.request.body
      .json() as typeof schema.jobCardsTable.$inferSelect;
    const result = await updateJobCard(id, jobCard);
    context.response.body = result;
  })
  .delete("/job_cards/:id", async (context) => {
    const id = Number(context.params.id);
    const result = await deleteJobCard(id);
    context.response.body = result;
  })
  .get("/job_resources", async (context) => {
    const result = await getJobResources();
    context.response.body = result;
  })
  .get("/job_resources/:id", async (context) => {
    const id = Number(context.params.id);
    const result = await getJobResourceById(id);
    context.response.body = result;
  })
  .post("/job_resources", async (context) => {
    const jobResource = await context.request.body
      .json() as typeof schema.resourcesTable.$inferInsert;
    const result = await createJobResource(jobResource);
    context.response.body = result;
  })
  .put("/job_resources/:id", async (context) => {
    const id = Number(context.params.id);
    const jobResource = await context.request.body
      .json() as typeof schema.resourcesTable.$inferSelect;
    const result = await updateJobResource(id, jobResource);
    context.response.body = result;
  })
  .delete("/job_resources/:id", async (context) => {
    const id = Number(context.params.id);
    const result = await deleteJobResource(id);
    context.response.body = result;
  })
  .get("/job_time_entries", async (context) => {
    const result = await getJobTimeEntries();
    context.response.body = result;
  })
  .get("/job_time_entries/:id", async (context) => {
    const id = Number(context.params.id);
    const result = await getJobTimeEntryById(id);
    context.response.body = result;
  })
  .post("/job_time_entries", async (context) => {
    const jobTimeEntry = await context.request.body
      .json() as typeof schema.timeEntriesTable.$inferInsert;
    const result = await createJobTimeEntry(jobTimeEntry);
    context.response.body = result;
  })
  .put("/job_time_entries/:id", async (context) => {
    const id = Number(context.params.id);
    const jobTimeEntry = await context.request.body
      .json() as typeof schema.timeEntriesTable.$inferSelect;
    const result = await updateJobTimeEntry(id, jobTimeEntry);
    context.response.body = result;
  })
  .delete("/job_time_entries/:id", async (context) => {
    const id = Number(context.params.id);
    const result = await deleteJobTimeEntry(id);
    context.response.body = result;
  });

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });

type Db = typeof db;

export { type Db };
