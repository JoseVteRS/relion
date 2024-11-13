import { db } from "@/db/drizzle";
import { lists, pickedPresents, presents } from "@/db/schema";
import { getAuthUser, verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { and, asc, desc, eq, isNull, not } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

import {
  createPresentSchema,
  updatePresentSchema,
} from "@/features/present/schemas";
import { ErrorMessage } from "@/lib/error-messages";

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
        isPicked: presents.isPicked,
      })
      .from(presents)
      .where(and(eq(presents.userId, authUserId), isNull(presents.listId)));

    if (!data) {
      return c.json({ error: "Not found" }, 404);
    }

    return c.json({ data });
  })
  .get(
    "list-presents/:listId",
    verifyAuth(),
    zValidator("param", z.object({ listId: z.string() })),
    async (c) => {
      const { listId } = c.req.valid("param");

      //TODO: For auth user for the moment
      const auth = c.get("authUser");
      const authUserId = auth?.session?.user?.id;
      if (!authUserId) {
        return c.json({ error: ErrorMessage.user.Unauthorized }, 403);
      }

      const data = await db
        .select({
          id: presents.id,
          name: presents.name,
          link: presents.link,
          description: presents.description,
          status: presents.status,
          isPicked: presents.isPicked,
          userId: presents.userId,
          pickedBy: pickedPresents.userId,
        })
        .from(presents)
        .leftJoin(pickedPresents, eq(presents.id, pickedPresents.presentId))
        .where(not(eq(presents.userId, authUserId)))
        .orderBy(asc(presents.name));

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  )
  .patch("pick/:id", async (c) => {
    const authUser = await getAuthUser(c);
    const authUserId = authUser?.token?.id;

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
        list: lists,
      })
      .from(presents)
      .leftJoin(lists, eq(presents.listId, lists.id))
      .where(eq(presents.userId, authUserId))
      .orderBy(desc(presents.name));

    if (!data) {
      return c.json({ error: "Not found" }, 404);
    }

    return c.json({ data });
  })
  .get("/:presentId", verifyAuth(), async (c) => {
    const auth = c.get("authUser");
    const authUserId = auth?.session?.user?.id;
    if (!authUserId) {
      return c.json({ error: "Not found" }, 404);
    }

    const { presentId } = c.req.param();
    if (!presentId) {
      return c.json({ error: "Missing id" }, 400);
    }

    const [data] = await db
      .select()
      .from(presents)
      .leftJoin(lists, eq(presents.listId, lists.id))
      .where(and(eq(presents.userId, authUserId), eq(presents.id, presentId)));

    if (!data) {
      return c.json({ error: "Not found" }, 404);
    }

    return c.json({ data });
  })
  .post(
    "/",
    verifyAuth(),
    zValidator("json", createPresentSchema),
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

      const data = await db
        .insert(presents)
        .values({
          userId,
          name,
          link,
          description,
          status,
          listId: listId ? listId : null,
          createdAt: new Date(),
        })
        .returning();

      return c.json({ data: data[0] }, 200);
    }
  )
  .patch(
    "/:presentId",
    verifyAuth(),
    zValidator("json", updatePresentSchema),
    async (c) => {
      const auth = c.get("authUser");

      const authUserId = auth?.session?.user?.id;
      if (!authUserId) {
        return c.json({ error: "Not found" }, 404);
      }

      const { presentId } = c.req.param();
      if (!presentId) {
        return c.json({ error: "Missing present ID" }, 400);
      }

      const { name, status, description, link, listId } = c.req.valid("json");
      const [data] = await db
        .update(presents)
        .set({ name, status, description, link, listId, updatedAt: new Date() })
        .where(and(eq(presents.id, presentId), eq(presents.userId, authUserId)))
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
        .returning({ id: presents.id, listId: presents.listId });

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  );

export default app;
