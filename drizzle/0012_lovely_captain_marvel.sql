CREATE TABLE IF NOT EXISTS "pickedPresent" (
	"id" text PRIMARY KEY NOT NULL,
	"presentId" text NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pickedPresent" ADD CONSTRAINT "pickedPresent_presentId_present_id_fk" FOREIGN KEY ("presentId") REFERENCES "public"."present"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pickedPresent" ADD CONSTRAINT "pickedPresent_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
