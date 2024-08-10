import { Hono } from "hono";
import { getAuthUser, verifyAuth } from "@hono/auth-js";
import { db } from "@/db/drizzle";
import { insertPresentSchema, lists, presents } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { and, desc, eq, isNull } from "drizzle-orm";
import { z } from "zod";
import {
  createPresetFormSchema,
  updatePresetFormSchema,
} from "@/features/present/forms/form-schemas";


const app = new Hono()
  .get("/for-options", verifyAuth(), async (c) => {
    const auth = c.get("authUser");
    const authUserId = auth?.session?.user?.id;
    if (!authUserId) {
      return c.json({ error: "Not found" }, 404);
    }

    const data = await db
      .select({
        id: presents.id,
        name: presents.name,
        link: presents.link,
        description: presents.description,
        status: presents.status,
      })
      .from(presents)
      .where(and(eq(presents.userId, authUserId), isNull(presents.listId)));

    if (!data) {
      return c.json({ error: "Not found" }, 404);
    }

    return c.json({ data });
  })
  .patch("pick/:id", async (c) => {
    const authUser = await getAuthUser(c);
    const authUserId = authUser?.user?.id;

    return c.json({ authUserId });
  })
  .get("/", verifyAuth(), async (c) => {
    const auth = c.get("authUser");

    const authUserId = auth?.session?.user?.id;

    if (!authUserId) {
      return c.json({ error: "Not found" }, 404);
    }

    const data = await db
      .select({
        id: presents.id,
        name: presents.name,
        link: presents.link,
        description: presents.description,
        status: presents.status,
        list: lists.name,
      })
      .from(presents)
      .leftJoin(lists, eq(presents.listId, lists.id))
      .where(eq(presents.userId, authUserId))
      .orderBy(desc(presents.createdAt));

    if (!data) {
      return c.json({ error: "Not found" }, 404);
    }

    return c.json({ data });
  })
  .get(
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
      const authUserId = auth?.session?.user?.id;
      const { id } = c.req.valid("param");
      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }
      if (!authUserId) {
        return c.json({ error: "Not found" }, 404);
      }

      const [data] = await db
        .select({
          id: presents.id,
          name: presents.name,
          link: presents.link,
          description: presents.description,
          status: presents.status,
          list: {
            id: lists.id,
            name: lists.name,
          },
        })
        .from(presents)
        .leftJoin(lists, eq(presents.listId, lists.id))
        .where(and(eq(presents.userId, authUserId), eq(presents.id, id)));

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  )
  .post(
    "/",
    verifyAuth(),
    zValidator("json", createPresetFormSchema),
    async (c) => {
      const auth = c.get("authUser");

      if (!auth.session) {
        return c.json({ error: "Not found" }, 404);
      }

      const userId = auth?.session?.user?.id;

      if (!userId) {
        return c.json({ error: "Not found" }, 404);
      }
      const { name, link, description, status, listId } = c.req.valid("json");

      const [data] = await db
        .insert(presents)
        .values({
          userId,
          name,
          link,
          description,
          status,
          listId: listId ? listId : null,
        })
        .returning();

      return c.json({ data }, 201);
    }
  )
  .patch(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.optional(z.string()) })),
    zValidator("json", updatePresetFormSchema),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const authUserId = auth?.session?.user?.id;
      if (!authUserId) {
        return c.json({ error: "Not found" }, 404);
      }

      const [data] = await db
        .update(presents)
        .set(values)
        .where(and(eq(presents.id, id), eq(presents.userId, authUserId)))
        .returning();

      if (!data) {
        return c.json({ error: "Not found" }, 404);
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
        return c.json({ error: "Missing id" }, 400);
      }

      const authUserId = auth?.session?.user?.id;
      if (!authUserId) {
        return c.json({ error: "Not found" }, 404);
      }

      const [data] = await db
        .delete(presents)
        .where(and(eq(presents.id, id), eq(presents.userId, authUserId)))
        .returning({ id: presents.id });

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  );

export default app;
