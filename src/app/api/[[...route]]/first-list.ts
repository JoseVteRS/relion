import { Hono } from "hono";
import { verifyAuth } from "@hono/auth-js";
import {
  insertListsSchema,
  insertPresentSchema,
  lists,
  presents,
} from "@/db/schema";
import { db } from "@/db/drizzle";
import { zValidator } from "@hono/zod-validator";
import { ErrorList } from "@/features/list/errors-enum";
import { eq } from "drizzle-orm";
import { z } from "zod";

const app = new Hono()
  .post(
    "/lists",
    verifyAuth(),
    zValidator(
      "json",
      insertListsSchema.pick({
        id: true,
        name: true,
        description: true,
        status: true,
        eventDate: true,
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const values = c.req.valid("json");
      const authUserId = auth?.token?.id;
      if (!authUserId) {
        return c.json({ error: ErrorList.NotFound }, 404);
      }

      const eventDate = new Date(values.eventDate!);

      try {
        // Comprobar si existe una lista con ese ID
        const existingList = await db.query.lists.findFirst({
          where: eq(lists.id, values.id!),
        });

        if (existingList) {
          return c.json({ error: ErrorList.AlreadyExists }, 409);
        }

        const [newList] = await db
          .insert(lists)
          .values({
            id: values.id,
            userId: authUserId,
            name: values.name,
            description: values.description,
            status: values.status,
            eventDate: eventDate,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          .returning();

        return c.json({ data: newList }, 201);
      } catch (error) {
        return c.json({ error: ErrorList.ServerError }, 500);
      }
    }
  )
  .post(
    "/presents",
    verifyAuth(),
    zValidator(
      "json",
      z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          description: z.string(),
          link: z.string(),
          listId: z.string(),
        })
      )
    ),
    async (c) => {
      const auth = c.get("authUser");
      const authUserId = auth?.token?.id;
      if (!authUserId) {
        return c.json({ error: ErrorList.Unauthorized }, 401);
      }

      const values = c.req.valid("json");

      console.log({ values });

      try {
        // Verificar si la lista existe y pertenece al usuario
        const list = await db.query.lists.findFirst({
          where: eq(lists.id, values[0].listId!),
          columns: {
            userId: true,
          },
        });

        if (!list || list.userId !== authUserId) {
          throw new Error(ErrorList.NotFound);
        }

        // Preparar los datos para la inserción
        const presentsToInsert = values.map((present) => ({
          ...present,
          userId: authUserId,
        }));

        // Insertar los regalos en la base de datos
        const insertedPresents = await db
          .insert(presents)
          .values(presentsToInsert)
          .returning();

        return c.json({ data: insertedPresents }, 201);
      } catch (error) {
        if (error instanceof Error && error.message === ErrorList.NotFound) {
          return c.json({ error: ErrorList.NotFound }, 404);
        }
        return c.json({ error: ErrorList.ServerError }, 500);
      }
    }
  );

export default app;
