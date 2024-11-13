import { ConfirmEmail } from "@/components/emails/confirm-email";
import { db } from "@/db/drizzle";
import { insertListsSchema, lists, presents } from "@/db/schema";
import { ErrorList } from "@/features/list/errors-enum";
import { ErrorMessage } from "@/lib/error-messages";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { and, asc, count, countDistinct, desc, eq, not } from "drizzle-orm";
import { Context, Hono } from "hono";
import { Resend } from "resend";
import { z } from "zod";

const app = new Hono()
  .get(
    "/list-private/:id",
    zValidator("param", z.object({ id: z.optional(z.string()) })),
    verifyAuth(),
    async (c) => {
      const { id } = c.req.valid("param");
      const auth = c.get("authUser");
      const authUserId = auth?.token?.id;

      if (!authUserId) {
        return c.json({ error: ErrorList.NotFound }, 404);
      }

      if (!id) {
        return c.json({ error: ErrorList.InvalidInput }, 400);
      }

      const list = await db.query.lists.findFirst({
        where: and(eq(lists.id, id), eq(lists.userId, authUserId)),
        with: {
          presents: {
            orderBy: asc(presents.name),
          },
        },
      });

      if (!list) {
        return c.json({ error: ErrorList.NotFound }, 404);
      }

      return c.json({ data: list });
    }
  )
  .get("/count-by-user", verifyAuth(), async (c) => {
    const auth = c.get("authUser");
    const authUserId = auth?.token?.id;

    if (!authUserId) {
      return c.json({ error: ErrorList.NotFound }, 404);
    }

    const [coutLists] = await db
      .select({ count: countDistinct(lists.id) })
      .from(lists)
      .where(eq(lists.userId, authUserId));

    return c.json({ data: coutLists });
  })
  .get(
    "/list/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.optional(z.string()) })),
    async (c) => {
      const id = c.req.param("id");

      //TODO: For auth user for the moment
      const auth = c.get("authUser");
      const authUserId = auth?.token?.id;
      if (!authUserId) {
        return c.json({ error: ErrorMessage.user.Unauthorized }, 403);
      }

      const list = await db.query.lists.findFirst({
        where: and(
          eq(lists.id, id),
          eq(lists.status, true),
          not(eq(lists.userId, authUserId))
        ),
        with: {
          user: {
            columns: {
              name: true,
            },
          },
          presents: {
            where: eq(presents.status, true),
            columns: {
              id: true,
              name: true,
              description: true,
              isPicked: true,
              link: true,
              pickedBy: true,
              createdAt: true,
              updatedAt: true,
            },
            orderBy: asc(presents.isPicked),
          },
        },
      });

      if (!list) {
        return c.json({ error: ErrorMessage.lists.NotFoundLists }, 404);
      }

      return c.json({ data: list });
    }
  )
  .get(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.optional(z.string()) })),
    async (c) => {
      const auth = c.get("authUser");
      const authUserId = auth?.token?.id;

      const id = c.req.param("id");
      if (!id) {
        return c.json({ error: ErrorList.InvalidInput }, 400);
      }

      if (!authUserId) {
        return c.json({ error: "No encontrado" }, 404);
      }

      const list = await db.query.lists.findFirst({
        where: and(eq(lists.userId, authUserId), eq(lists.id, id)),
        with: {
          presents: true,
        },
      });

      return c.json({ data: list });
    }
  )
  .get("/", verifyAuth(), async (c) => {
    const auth = c.get("authUser");
    const authUserId = auth?.token?.id;

    if (!authUserId) {
      return c.json({ error: ErrorMessage.user.Unauthorized }, 403);
    }

    const data = await db.query.lists.findMany({
      where: eq(lists.userId, authUserId),

      with: {
        presents: {
          columns: {
            id: true,
          },
        },
        user: {
          columns: {
            name: true,
          },
        },
      },
    });

    return c.json({ data });
  })
  .post(
    "/",
    verifyAuth(),
    zValidator(
      "json",
      insertListsSchema.omit({ id: true }).pick({
        name: true,
        description: true,
        status: true,
        eventDate: true,
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const authUserId = auth?.token?.id;
      if (!authUserId) {
        return c.json({ error: ErrorList.NotFound }, 404);
      }

      const values = c.req.valid("json");

      const eventDate = new Date(values.eventDate!);

      try {
        const [newList] = await db
          .insert(lists)
          .values({
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
        console.error(
          "api:post:create_list - Error al crear nueva lista:",
          error
        );
        return c.json({ error: ErrorList.ServerError }, 500);
      }
    }
  )
  .patch(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.optional(z.string()) })),
    zValidator(
      "json",
      insertListsSchema
        .omit({ id: true })
        .pick({
          name: true,
          description: true,
          status: true,
        })
        .extend({
          presentIds: z.array(z.string()).optional(),
        })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!id) {
        return c.json({ error: ErrorList.InvalidInput }, 400);
      }

      const authUserId = auth?.token?.id;
      if (!authUserId) {
        return c.json({ error: ErrorList.NotFound }, 404);
      }

      const [data] = await db
        .update(lists)
        .set({ ...values, updatedAt: new Date() })
        .where(and(eq(lists.id, id), eq(lists.userId, authUserId)))
        .returning();

      if (!data) {
        return c.json({ error: ErrorList.NotFound }, 404);
      }

      return c.json({ data });
    }
  )
  .delete(
    "/:id",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        id: z.optional(z.string()),
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");
      if (!id) {
        return c.json({ error: ErrorList.InvalidInput }, 400);
      }

      const authUserId = auth?.token?.id;
      if (!authUserId) {
        return c.json({ error: ErrorList.NotFound }, 404);
      }

      const [data] = await db
        .delete(lists)
        .where(and(eq(lists.id, id), eq(lists.userId, authUserId)))
        .returning({ id: lists.id });

      if (!data) {
        return c.json({ error: ErrorList.NotFound }, 404);
      }

      return c.json({ data });
    }
  );

export default app;
