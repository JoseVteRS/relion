CREATE TABLE IF NOT EXISTS "subscription" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"subscription_id" text NOT NULL,
	"status" text NOT NULL,
	CONSTRAINT "subscription_userId_unique" UNIQUE("userId"),
	CONSTRAINT "subscription_subscription_id_unique" UNIQUE("subscription_id")
);
--> statement-breakpoint
ALTER TABLE "list" ALTER COLUMN "eventDate" SET NOT NULL;