CREATE TABLE "dinosaurs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"dinosaur_id" integer,
	"description" text,
	"date_created" timestamp DEFAULT now(),
	"is_complete" boolean
);
--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_dinosaur_id_fkey" FOREIGN KEY ("dinosaur_id") REFERENCES "public"."dinosaurs"("id") ON DELETE no action ON UPDATE no action;