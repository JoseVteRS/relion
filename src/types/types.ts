import { lists as listsSchema, presents as presentsSchema } from "@/db/schema";


export type List = typeof listsSchema.$inferSelect;
export type ListWithUserWithPresents = List & {
  user: { name: string };
  presents: (typeof presentsSchema.$inferSelect)[];
};


export type Present = typeof presentsSchema.$inferSelect;

