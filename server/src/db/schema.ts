import {
  date,
  integer,
  numeric,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const customersTable = pgTable("customers", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  datevId: integer().notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  street: varchar({ length: 255 }).notNull(),
  city: varchar({ length: 255 }).notNull(),
  postalCode: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 255 }).notNull(),
});

export const jobCardsTable = pgTable("job_cards", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  description: varchar({ length: 255 }).notNull(),
  createdAt: date().defaultNow(),
});

export const resourcesTable = pgTable("resources", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  jobCardId: integer().references(() => jobCardsTable.id).notNull(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
  group: varchar({ length: 255 }),
  price: numeric({ precision: 10, scale: 2 }).notNull(),
  quantity: integer().notNull(),
  unitId: integer().references(() => unitsTable.id).notNull(),
});

export const timeEntriesTable = pgTable("time_entries", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  jobCardId: integer().references(() => jobCardsTable.id).notNull(),
  start: timestamp().notNull(),
  end: timestamp().notNull(),
  pauseTime: integer().notNull(),
});

export const unitsTable = pgTable("units", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  plural: varchar({ length: 255 }).notNull(),
  abbreviation: varchar({ length: 255 }).notNull(),
});
