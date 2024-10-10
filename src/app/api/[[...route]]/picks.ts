import { db } from "@/db/drizzle";
import { lists, pickedPresents, presents } from "@/db/schema";
import { ErrorMessage } from "@/lib/error-messages";
import { getAuthUser } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { and, eq, gt, isNull, lt, not, sql } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .post(
    "/:presentId",
    zValidator("param", z.object({ presentId: z.string() })),
    async (c) => {
      const authUser = await getAuthUser(c);
      const authUserId = authUser?.token?.id;

      if (!authUserId) {
        return c.json({ error: ErrorMessage.user.Unauthorized }, 401);
      }

      const { presentId } = c.req.valid("param");

      const present = await db.query.presents.findFirst({
        where: eq(presents.id, presentId),
        with: {
          list: true,
        },
      });

      if (!present) {
        console.log("pick:post:present-not-found");
        return c.json({ error: ErrorMessage.presents.NotFoundWithId }, 404);
      }

      if (present.pickedBy !== null || present.isPicked) {
        console.log("pick:post:already-picked");
        return c.json({ error: ErrorMessage.presents.AlreadyPicked }, 400);
      }

      if (present.userId === authUserId) {
        console.log("pick:post:not-allowed-to-pick-your-own-present");
        return c.json(
          { error: ErrorMessage.presents.NotAllowedToPickYourOwnPresent },
          403
        );
      }

      if (present!.list!.eventDate! <= new Date()) {
        console.log("pick:post:list-expired");
        return c.json({ error: ErrorMessage.lists.Expired }, 400);
      }

      const [updatedPresent] = await db
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
            not(eq(presents.userId, authUserId)),
          )
        )
        .returning();

      console.log({ updatedPresent });

      // if (!updatedPresent) {
      //   return c.json({ error: ErrorMessage.presents.NotAvailable }, 400);
      // }

      return c.json({ presentId: "updatedPresent.id" });
    }
  )
  .patch(
    "/:presentId",
    zValidator("param", z.object({ presentId: z.string() })),
    async (c) => {
      const authUser = await getAuthUser(c);
      const authUserId = authUser?.token?.id;

      if (!authUserId) {
        return c.json({ error: "Not found" }, 404);
      }

      const { presentId } = c.req.valid("param");

      const present = await db.query.presents.findFirst({
        where: eq(presents.id, presentId),
        with: {
          list: true,
        },
      });

      if (!present) {
        return c.json({ error: ErrorMessage.presents.NotFoundWithId }, 404);
      }

      if (present.pickedBy !== authUserId) {
        return c.json(
          { error: ErrorMessage.presents.NotAllowedToPickYourOwnPresent },
          403
        );
      }

      if (present!.list!.eventDate! <= new Date()) {
        return c.json({ error: ErrorMessage.lists.Expired }, 400);
      }

      const listEventDate = present!.list!.eventDate!;

      // Eliminar el pick
      const [presentUpdated] = await db
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

      if (!presentUpdated) {
        return c.json({ error: "No se ha podido dejar el regalo libre" }, 404);
      }

      return c.json({ presentId });
    }
  );

export default app;
