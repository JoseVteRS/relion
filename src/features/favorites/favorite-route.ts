import { db as dbPrisma } from "@/db/prisma";
import { favoriteLists } from "@/db/schema";
import { ErrorMessage } from "@/lib/error-messages";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { ListStatus, PresentStatus } from "@prisma/client";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .get("/", verifyAuth(), async (c) => {
    const auth = c.get("authUser");
    const authUserId = auth?.token?.id;
    if (!authUserId) {
      return c.json({ error: ErrorMessage.user.Unauthorized }, 404);
    }

    const favoriteLists = await dbPrisma.favorite.findMany({
      where: {
        userId: authUserId,
        list: {
          status: ListStatus.PUBLIC,
        },
      },
      include: {
        list: {
          include: {
            owner: {
              select: {
                id: true,
                name: true,
              },
            },
            _count: {
              select: {
                presents: true,
              },
            },
            presents: {
              where: {
                status: PresentStatus.PUBLIC,
              },
            },
          },
        },
      },
    });

    if (!favoriteLists) {
      return c.json({ data: [] }, 200);
    }

    return c.json({ data: favoriteLists }, 200);
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
      if (!listId) return c.json({ error: "listId is required" }, 400);

      const favorite = await dbPrisma.favorite.findFirst({
        where: {
          listId: listId,
          userId: authUserId,
        },
        include: {
          list: {
            include: {
              owner: {
                select: {
                  id: true,
                  name: true,
                },
              },
              _count: {
                select: {
                  presents: true,
                },
              },
              presents: {
                where: {
                  status: PresentStatus.PUBLIC,
                },
              },
            },
          },
        },
      });

      if (!favorite) return c.json({ data: null });

      return c.json({ data: favorite }, 200);
    }
  )
  .post(
    "/:listId/follow",
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

      const existsFollow = await dbPrisma.favorite.findFirst({
        where: {
          userId: authUserId,
          listId,
        },
      });

      if (existsFollow) {
        return c.json({ error: "Ya estás siguiendo esta lista" }, 400);
      }

      const favorite = await dbPrisma.favorite.create({
        data: {
          userId: authUserId,
          listId,
        },
      });

      return c.json({ data: favorite }, 200);
    }
  )
  .delete(
    "/:listId/unfollow",
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

      const existsFollow = await dbPrisma.favorite.findFirst({
        where: {
          userId: authUserId,
          listId,
        },
      });

      if (!existsFollow) {
        return c.json({ error: "No estás siguiendo esta lista" }, 400);
      }

      await dbPrisma.favorite.delete({
        where: {
          id: existsFollow.id,
        },
      });

      return c.json({ message: "Lista eliminada de favoritos" }, 200);
    }
  );

export default app;
