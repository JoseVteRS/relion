import { insertListsSchema } from "@/db/schema";
import { z } from "zod";

export const createListFormSchema = z.object({});

export const updateListFormSchema = insertListsSchema
  .pick({
    name: true,
    description: true,
    status: true,
    eventDate: true,
  })
  .extend({
    presentIds: z.array(z.string()).optional(),
  });

export type FormValuesUpdateList = z.input<typeof updateListFormSchema>;
