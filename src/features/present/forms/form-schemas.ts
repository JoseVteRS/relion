import { insertPresentSchema } from "@/db/schema";
import { z } from "zod";

export const createPresetFormSchema = insertPresentSchema.pick({
  name: true,
  link: true,
  description: true,
  status: true,
  listId: true,
});

export const updatePresetFormSchema = insertPresentSchema.pick({
  name: true,
  link: true,
  description: true,
  status: true,
  listId: true,
});

export type UpdatePresentFormValues = z.input<typeof updatePresetFormSchema>;
