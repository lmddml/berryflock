import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

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

export const unitsTable = pgTable("units", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  plural: varchar({ length: 255 }).notNull(),
  abbreviation: varchar({ length: 255 }).notNull(),
});
