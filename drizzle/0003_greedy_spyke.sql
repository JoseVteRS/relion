ALTER TABLE "subscription" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_userId_unique";--> statement-breakpoint
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_user_id_unique" UNIQUE("user_id");