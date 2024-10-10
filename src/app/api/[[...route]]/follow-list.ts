import { Hono } from "hono";
import { verifyAuth } from "@hono/auth-js";
import { favoriteLists } from "@/db/schema";
import { db } from "@/db/drizzle";
import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { ErrorMessage } from "@/lib/error-messages";
import { z } from "zod";

const app = new Hono()
  .get("/", verifyAuth(), async (c) => {
    const auth = c.get("authUser");
    const authUserId = auth?.token?.id;
    if (!authUserId) {
      return c.json({ error: ErrorMessage.user.Unauthorized }, 404);
    }

    const data = await db.query.favoriteLists.findMany({
      where: and(eq(favoriteLists.userId, authUserId)),
      with: {
        list: {
          with: {
            user: {
              columns: {
                id: true,
                name: true,
              },
            },
            presents: true,
          },
        },
      },
    });

    return c.json({ data }, 200);
  })
  .get(
    "/:listId",
    verifyAuth(),
    zValidator("param", z.object({ listId: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const authUserId = auth?.token?.id;
      if (!authUserId) {
        return c.json({ error: ErrorMessage.user.Unauthorized }, 404);
      }

      const { listId } = c.req.valid("param");

      if (!listId) {
        return c.json({ error: "Param id is required" }, 404);
      }

      const favoriteList = await db.query.favoriteLists.findFirst({
        where: and(
          eq(favoriteLists.listId, listId),
          eq(favoriteLists.userId, authUserId)
        ),
        with: {
          list: true,
        },
      });

      if (!favoriteList) {
        return c.json({ data: false }, 200);
      }

      return c.json({ data: true }, 200);
    }
  )
  .post(
    "follow/:listId",
    verifyAuth(),
    zValidator("param", z.object({ listId: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const authUserId = auth?.token?.id;
      if (!authUserId) {
        return c.json({ error: ErrorMessage.user.Unauthorized }, 404);
      }
      const { listId } = c.req.valid("param");

      if (!listId) {
        return c.json({ error: "Param id is required" }, 404);
      }

      const favoriteList = await db.query.favoriteLists.findFirst({
        where: and(
          eq(favoriteLists.listId, listId),
          eq(favoriteLists.userId, authUserId)
        ),
      });

      if (favoriteList) {
        return c.json({ error: "Ya estás siguiendo esta lista" }, 400);
      }

      await db.insert(favoriteLists).values({
        userId: authUserId,
        listId,
      });

      return c.json({ message: "Listado agregado a favoritos" }, 200);
    }
  )
  .delete(
    "unfollow/:listId",
    verifyAuth(),
    zValidator("param", z.object({ listId: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const authUserId = auth?.token?.id;
      if (!authUserId) {
        return c.json({ error: ErrorMessage.user.Unauthorized }, 404);
      }
      const { listId } = c.req.valid("param");

      if (!listId) {
        return c.json({ error: "Param id is required" }, 404);
      }

      await db
        .delete(favoriteLists)
        .where(
          and(
            eq(favoriteLists.listId, listId),
            eq(favoriteLists.userId, authUserId)
          )
        );

      return c.json({ message: "Listado eliminado de favoritos" }, 200);
    }
  );

export default app;
