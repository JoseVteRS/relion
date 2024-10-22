import { presents } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type Present = InferSelectModel<typeof presents>;