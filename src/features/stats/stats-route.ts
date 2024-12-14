import { db as dbPrisma } from "@/db/prisma";
import {
    favoriteLists,
    lists,
    pickedPresents,
    presents,
    users,
} from "@/db/schema";
import { ErrorList } from "@/features/list/errors-enum";
import { verifyAuth } from "@hono/auth-js";
import { and, asc, desc, eq, gte, isNull, lte, not, sql } from "drizzle-orm";
import { Hono } from "hono";

const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000;
const SIXTY_DAYS_IN_MS = 60 * 24 * 60 * 60 * 1000;

const app = new Hono().get("/", verifyAuth(), async (c) => {
  const auth = c.get("authUser");
  const authUserId = auth?.token?.id;

  if (!authUserId) {
    return c.json({ error: ErrorList.Unauthorized }, 404);
  }

  const [listsCount, presentsCount, pickedPresentsCount, nearEvents] =
    await Promise.all([
      // Total de listas creadas listsCount
      dbPrisma.list.count({
        where: {
          ownerId: authUserId,
        },
      }),

      //Todos los regalos creados presentsCount
      dbPrisma.present.count({
        where: {
          ownerId: authUserId,
        },
      }),

      // Regalos reservados por mi pickedPresentsCount
      dbPrisma.pick.count({
        where: {
          pickedById: authUserId,
        },
      }),

      // Eventos próximos (30 días)
      dbPrisma.favorite.findMany({
        where: {
          userId: authUserId,
          list: {
            eventDate: {
              gte: new Date(),
              lte: new Date(Date.now() + SIXTY_DAYS_IN_MS),
            },
          },
        },
        select: {
          list: {
            select: {
              id: true,
              name: true,
              eventDate: true,
              owner: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          list: {
            eventDate: "asc",
          },
        },
        take: 5,
      }),
    ]);

  const stats = {
    listsCount: listsCount,
    presentsCount: presentsCount,
    pickedPresentsCount: pickedPresentsCount,
    nearEvents,
  };

  return c.json({ data: stats });
});

export default app;
