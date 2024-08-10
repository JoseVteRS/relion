import { db } from "@/db/drizzle";
import { pickedPresents, presents } from "@/db/schema";
import { getAuthUser } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { and, eq, not } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .post(
    "/:presentId",
    zValidator("param", z.object({ presentId: z.string() })),
    async (c) => {
      const authUser = await getAuthUser(c);
      const authUserId = authUser?.session?.user?.id;
      const { presentId } = c.req.valid("param");

      if (!authUserId) {
        return c.json({ error: "Not found" }, 404);
      }

      // Comprobar que el usuario logueado no sea el propietario del present
      const present = await db.query.presents.findFirst({
        where: and(
          eq(presents.id, presentId),
          not(eq(presents.userId, authUserId)),
          eq(presents.isPicked, false)
        ),
      });

      console.log({ present, authUserId });
      console.log({
        present: {
          id: presents?.id,
        },
      });

      if (!present) {
        return c.json(
          { error: "No se ha podido encontrar el regalo o ya ha sido elegido" },
          404
        );
      }

      // Crear el pick
      await db.insert(pickedPresents).values({
        presentId: present.id,
        userId: authUserId,
      });

      // Actualizar la propiedad isPicked a true en la tabla presents
      await db
        .update(presents)
        .set({ isPicked: true })
        .where(eq(presents.id, presentId));

      return c.json({ present });
    }
  )
  .delete(
    "/:presentId",
    zValidator("param", z.object({ presentId: z.string() })),
    async (c) => {
      const authUser = await getAuthUser(c);
      const authUserId = authUser?.session?.user?.id;
      const { presentId } = c.req.valid("param");

      if (!authUserId) {
        return c.json({ error: "Not found" }, 404);
      }

      // Comprobar que el usuario logueado no sea el propietario del present
      const present = await db.query.presents.findFirst({
        where: and(
          eq(presents.id, presentId),
          not(eq(presents.userId, authUserId)),
          eq(presents.isPicked, true)
        ),
      });

      if (!present) {
        return c.json(
          { error: "No se ha podido encontrar el regalo o ya ha sido elegido" },
          404
        );
      }

      // Crear el pick
      const pickedDeleted = await db
        .delete(pickedPresents)
        .where(
          and(
            eq(pickedPresents.presentId, presentId),
            eq(pickedPresents.userId, authUserId)
          )
        );

      if (!pickedDeleted) {
        return c.json({ error: "No se ha podido dejar el regalo libre" }, 404);
      }

      // Actualizar la propiedad isPicked a true en la tabla presents
      await db
        .update(presents)
        .set({ isPicked: false })
        .where(eq(presents.id, presentId));

      return c.json({ present });
    }
  );

export default app;
