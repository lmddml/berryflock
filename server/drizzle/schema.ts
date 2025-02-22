import { pgTable, serial, text, foreignKey, integer, timestamp, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const dinosaurs = pgTable("dinosaurs", {
	id: serial().primaryKey().notNull(),
	name: text(),
	description: text(),
});

export const tasks = pgTable("tasks", {
	id: serial().primaryKey().notNull(),
	dinosaurId: integer("dinosaur_id"),
	description: text(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow(),
	isComplete: boolean("is_complete"),
}, (table) => [
	foreignKey({
			columns: [table.dinosaurId],
			foreignColumns: [dinosaurs.id],
			name: "tasks_dinosaur_id_fkey"
		}),
]);
