import { db } from "@/db/drizzle";
import { favoriteLists, lists, pickedPresents, presents, users } from "@/db/schema";
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
      // Total de listas creadas
      db.query.lists.findMany({
        where: eq(lists.userId, authUserId),
        columns: {
          id: true,
        },
      }),

      //Todos los regalos creados
      db.query.presents.findMany({
        where: eq(presents.userId, authUserId),
        columns: {
          id: true,
        },
      }),

      // Regalos reservados por mi
      db.query.presents.findMany({
        where: and(
          eq(presents.pickedBy, authUserId),
          eq(presents.isPicked, true),
          not(isNull(presents.listId))
        ),
        columns: {
          id: true,
        },
      }),

      // Eventos próximos (30 días)
      db
        .select({
          id: lists.id,
          name: lists.name,
          eventDate: lists.eventDate,
          listOwner: users.name,
        })
        .from(favoriteLists)
        .innerJoin(lists, eq(favoriteLists.listId, lists.id))
        .leftJoin(users, eq(lists.userId, users.id))
        .where(
          and(
            eq(favoriteLists.userId, authUserId),
            not(isNull(lists.eventDate)),      
            gte(lists.eventDate, new Date()),
            lte(lists.eventDate, new Date(Date.now() + SIXTY_DAYS_IN_MS))
          )
        )
        .limit(5)
        .orderBy(asc(lists.eventDate)),
    ]);

  const stats = {
    listsCount: listsCount.length,
    presentsCount: presentsCount.length,
    pickedPresentsCount: pickedPresentsCount.length,
    nearEvents,
  };

  return c.json({ data: stats });
});

export default app;
