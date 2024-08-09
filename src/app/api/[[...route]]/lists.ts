import { Hono } from "hono";
import { verifyAuth, getAuthUser } from "@hono/auth-js";
import { insertListsSchema, lists, presents, users } from "@/db/schema";
import { db } from "@/db/drizzle";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { and, asc, desc, eq, inArray, is, not } from "drizzle-orm";
import { ErrorList } from "@/features/list/errors-enum";

interface ProcessedList {
  id: string;
  name: string | null;
  description: string | null;
  status: boolean | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  presents: string[];
}

const app = new Hono()
  .get("/", verifyAuth(), async (c) => {
    const auth = c.get("authUser");
    const authUserId = auth?.session?.user?.id;
    if (!authUserId) {
      return c.json({ error: "No encontrado" }, 404);
    }

    const data = await db
      .query.lists.findMany({
        where: eq(lists.userId, authUserId),
        with:{
          presents: true,
          user: {
            columns: {
              name: true
            }
          }
        },
      })

    return c.json({ data });
  })
  .get(
    "list/:id",
    zValidator("param", z.object({ id: z.optional(z.string()) })),
    async (c) => {
      const id = c.req.param("id");
      // const auth = await getAuthUser(c);
      // const authUserId = auth?.session?.user?.id;

      const list = await db.query.lists.findFirst({
        where: and(eq(lists.id, id), eq(lists.status, true)),
        with: {
          presents: {
            columns: {
              id: true,
              name: true,
              link: true,
              isPicked: true,
              description: true,
            },
            orderBy: [asc(presents.isPicked)],
          },
          user: {
            columns: {
              name: true,
            },
          },
        },
      });

      if (!list) {
        return c.json({ error: "No encontrado" }, 404);
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
      const authUserId = auth?.session?.user?.id;

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
  .post(
    "/",
    verifyAuth(),
    zValidator(
      "json",
      insertListsSchema
        .omit({ id: true })
        .pick({
          name: true,
          description: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        })
        .extend({
          presentIds: z.array(z.string()).optional(),
        })
    ),
    async (c) => {
      const auth = c.get("authUser");

      if (!auth.session) {
        return c.json({ error: ErrorList.NotFound }, 404);
      }

      const authUserId = auth?.session?.user?.id;

      if (!authUserId) {
        return c.json({ error: ErrorList.NotFound }, 404);
      }

      const { name, description, status, presentIds } = c.req.valid("json");

      try {
        const existingLists = await db
          .select({
            id: lists.id,
          })
          .from(lists)
          .where(eq(lists.userId, authUserId));

        if (existingLists.length >= 3) {
          return c.json({ error: ErrorList.MaxListsExceeded }, 400);
        }

        const [newList] = await db
          .insert(lists)
          .values({
            userId: authUserId,
            name,
            description,
            status,
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
          createdAt: true,
          updatedAt: true,
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

      const authUserId = auth?.session?.user?.id;
      if (!authUserId) {
        return c.json({ error: ErrorList.NotFound }, 404);
      }

      const [data] = await db
        .update(lists)
        .set(values)
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

      const authUserId = auth?.session?.user?.id;
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
