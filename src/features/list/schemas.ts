import { z } from "zod";

export const createListSchema = z.object({
  name: z.string().min(1, "El nombre de la lista es obligatorio"),
  eventDate: z.date(),
  status: z.boolean().optional().default(true),
});

export const updateListSchema = z.object({
  name: z.string().min(1, "El nombre de la lista es obligatorio"),
  eventDate: z.date(),
  status: z.boolean().optional().default(true),
});
