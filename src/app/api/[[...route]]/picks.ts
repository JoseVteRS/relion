import { db } from "@/db/drizzle";
import { pickedPresents, presents } from "@/db/schema";
import { ErrorMessage } from "@/lib/error-messages";
import { getAuthUser } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { and, eq, isNull, not } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .post(
    "/:presentId",
    zValidator("param", z.object({ presentId: z.string() })),
    async (c) => {
      const authUser = await getAuthUser(c);
      const authUserId = authUser?.token?.id;
      const { presentId } = c.req.valid("param");

      if (!authUserId) {
        return c.json({ error: ErrorMessage.user.Unauthorized }, 404);
      }

      // Comprobar que el usuario logueado no sea el propietario del present
      // const present = await db.query.presents.findFirst({
      //   where: and(
      //     eq(presents.id, presentId),
      //     eq(presents.userId, authUserId),
      //     eq(presents.isPicked, false),
      //     not(eq(presents.pickedBy, authUserId))
      //   ),
      // });

      // if (present) {
      //   return c.json(
      //     { error: "No se ha podido encontrar el regalo o ya ha sido elegido" },
      //     404
      //   );
      // }

      // Crear el pick
      await db
        .update(presents)
        .set({
          pickedBy: authUserId,
          isPicked: true,
        })
        .where(
          and(
            eq(presents.id, presentId),
            isNull(presents.pickedBy),
            eq(presents.isPicked, false),
            not(eq(presents.userId, authUserId))
          )
        );

      return c.json({ presentId });
    }
  )
  .patch(
    "/:presentId",
    zValidator("param", z.object({ presentId: z.string() })),
    async (c) => {
      const authUser = await getAuthUser(c);
      const authUserId = authUser?.token?.id;
      const { presentId } = c.req.valid("param");

      if (!authUserId) {
        return c.json({ error: "Not found" }, 404);
      }

      // Comprobar que el regalo existe, no está elegido,
      // y que el usuario actual no es el propietario
      // const present = await db.query.presents.findFirst({
      //   where: and(
      //     eq(presents.id, presentId),
      //     eq(presents.isPicked, false),
      //     not(eq(presents.userId, authUserId)),
      //     eq(presents.pickedBy, authUserId)
      //   ),
      // });

      // if (present) {
      //   return c.json(
      //     {
      //       error:
      //         "No se ha podido encontrar el regalo, ya ha sido elegido, o es tu propio regalo",
      //     },
      //     404
      //   );
      // }

      // Eliminar el pick
      const presentUpdated = await db
        .update(presents)
        .set({ pickedBy: null, isPicked: false })
        .where(
          and(
            eq(presents.id, presentId),
            eq(presents.pickedBy, authUserId),
            eq(presents.isPicked, true)
          )
        )
        .returning();

      if (presentUpdated) {
        return c.json({ error: "No se ha podido dejar el regalo libre" }, 404);
      }

      return c.json({ presentId });
    }
  );

export default app;
