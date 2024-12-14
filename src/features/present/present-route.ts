import { db as dbPrisma } from "@/db/prisma";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

import {
  createPresentSchema,
  updatePresentSchema,
} from "@/features/present/schemas";

const app = new Hono()
  .get("/", verifyAuth(), async (c) => {
    const auth = c.get("authUser");
    const authUserId = auth?.session?.user?.id;
    if (!authUserId) {
      return c.json({ error: "Not found" }, 404);
    }

    const presents = await dbPrisma.present.findMany({
      where: {
        ownerId: authUserId,
      },
      include: {
        list: true,
        owner: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    if (!presents) {
      return c.json({ error: "Not found" }, 404);
    }

    return c.json({ data: presents });
  })
  .get(
    "/:presentId/private",
    verifyAuth(),
    zValidator("param", z.object({ presentId: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const authUserId = auth?.session?.user?.id;
      if (!authUserId) {
        return c.json({ error: "Not found" }, 404);
      }

      const { presentId } = c.req.valid("param");

      const present = await dbPrisma.present.findUnique({
        where: {
          id: presentId,
          ownerId: authUserId,
        },
      });

      if (!present) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data: present });
    }
  )
  .post(
    "/",
    verifyAuth(),
    zValidator("json", createPresentSchema),
    async (c) => {
      const auth = c.get("authUser");

      if (!auth.session) {
        return c.json({ error: "Not found" }, 404);
      }

      const userAuthId = auth?.session?.user?.id;
      const userAuthName = auth?.session?.user?.name;

      if (!userAuthId) {
        return c.json({ error: "Not found" }, 404);
      }
      const { name, link, description, status, listId } = c.req.valid("json");

      const newPresent = await dbPrisma.present.create({
        data: {
          ownerId: userAuthId,
          name,
          link: link ?? null,
          status,
          description: description ?? null,
          listId: listId ?? undefined,
        },
      });

      //TODO: Create a notification when a present is created. Only if the list has a favorite

      return c.json({ data: newPresent }, 200);
    }
  )
  .patch(
    "/:presentId",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        presentId: z.string(),
      })
    ),
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

      const updatedPresent = await dbPrisma.present.update({
        where: {
          id: presentId,
          ownerId: authUserId,
        },
        data: {
          name,
          status,
          description,
          link,
          listId,
        },
      });

      if (!updatedPresent) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data: updatedPresent });
    }
  )
  .delete(
    "/:presentId",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        presentId: z.string(),
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { presentId } = c.req.valid("param");
      if (!presentId) {
        return c.json({ error: "Missing id" }, 400);
      }

      const authUserId = auth?.session?.user?.id;
      if (!authUserId) {
        return c.json({ error: "Not found" }, 404);
      }

      const deletedPresent = await dbPrisma.present.delete({
        where: {
          id: presentId,
          ownerId: authUserId,
        },
      });

      if (!deletedPresent) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data: deletedPresent });
    }
  );

export default app;
