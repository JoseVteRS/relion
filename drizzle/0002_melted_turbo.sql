CREATE TABLE IF NOT EXISTS "present" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"link" text,
	"status" boolean DEFAULT true,
	"createdAt" timestamp,
	"updatedAt" timestamp
);
