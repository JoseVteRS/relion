import { ListStatus } from "@prisma/client";
import { z } from "zod";

export const createListSchema = z.object({
  name: z.string().min(1, "El nombre de la lista es obligatorio"),
  eventDate: z.coerce.date(),
  status: z.nativeEnum(ListStatus),
});

export const updateListSchema = z.object({
  name: z.string().min(1, "El nombre de la lista es obligatorio"),
  eventDate: z.coerce.date(),
  status: z.nativeEnum(ListStatus),
});


