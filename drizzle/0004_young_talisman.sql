ALTER TABLE "user" ALTER COLUMN "tierId" SET DEFAULT '8bda7b7b-0566-493c-b098-7711bddc1130';--> statement-breakpoint
ALTER TABLE "present" ADD COLUMN "pickedBy" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "present" ADD CONSTRAINT "present_pickedBy_user_id_fk" FOREIGN KEY ("pickedBy") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
