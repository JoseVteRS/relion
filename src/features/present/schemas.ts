import { PresentStatus } from "@prisma/client";
import { z } from "zod";

export const createPresentSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  link: z.string().optional().refine((value) => !value || z.string().url().safeParse(value).success, {
    message: "Debe ser una URL válida",
  }),
  status: z.nativeEnum(PresentStatus),
  listId: z.string().optional(),
});

export const updatePresentSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  link: z.string().optional().refine((value) => !value || z.string().url().safeParse(value).success, {
    message: "Debe ser una URL válida",
  }),
  status: z.nativeEnum(PresentStatus),
  listId: z.string().optional(),
});
