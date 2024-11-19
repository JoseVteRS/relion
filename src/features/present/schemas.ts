import { z } from "zod";

export const createPresentSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  link: z.string().url("Debe ser una URL válida").optional(),
  description: z.string().optional(),
  status: z.boolean().optional().default(true),
  listId: z.string().optional(),
});

export const updatePresentSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  link: z.string().url("Debe ser una URL válida").optional(),
  description: z.string().optional(),
  status: z.boolean().optional().default(true),
  listId: z.string().optional(),
});
