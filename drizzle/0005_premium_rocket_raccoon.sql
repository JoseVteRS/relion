CREATE TABLE IF NOT EXISTS "favoriteList" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"listId" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favoriteList" ADD CONSTRAINT "favoriteList_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favoriteList" ADD CONSTRAINT "favoriteList_listId_list_id_fk" FOREIGN KEY ("listId") REFERENCES "public"."list"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
