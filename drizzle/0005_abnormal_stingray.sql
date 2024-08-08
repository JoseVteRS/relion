ALTER TABLE "present" ADD COLUMN "listId" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "present" ADD CONSTRAINT "present_listId_list_id_fk" FOREIGN KEY ("listId") REFERENCES "public"."list"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
