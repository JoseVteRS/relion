import { db as dbPrisma } from "@/db/prisma";

import { ErrorMessage } from "@/lib/error-messages";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { PickStatus } from "@prisma/client";

import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .get("/", verifyAuth(), async (c) => {
    const authUser = c.get("authUser");
    const authUserId = authUser?.token?.id;

    if (!authUserId) {
      return c.json({ error: ErrorMessage.user.Unauthorized }, 401);
    }

    const picks = await dbPrisma.pick.findMany({
      where: {
        pickedById: authUserId,
      },
      include: {
        present: {
          include: {
            list: {
              include: {
                owner: {
                  select: { name: true },
                },
              },
            },
          },
        },
      },
    });

    return c.json({ data: picks });
  })
  .get(
    "/:presentId",
    verifyAuth(),
    zValidator("param", z.object({ presentId: z.string() })),
    async (c) => {
      const authUser = c.get("authUser");
      const authUserId = authUser?.token?.id;

      if (!authUserId) {
        return c.json({ error: "Not found" }, 404);
      }

      const { presentId } = c.req.valid("param");

      const pick = await dbPrisma.pick.findFirst({
        where: {
          presentId,
        },
        include: {
          pickedBy: true,
        },
      });

      if (!pick) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data: pick });
    }
  )
  .post(
    "/:presentId/pick",
    verifyAuth(),
    zValidator("param", z.object({ presentId: z.string() })),
    async (c) => {
      const authUser = c.get("authUser");
      const authUserId = authUser?.token?.id;

      if (!authUserId) {
        return c.json({ error: ErrorMessage.user.Unauthorized }, 401);
      }

      const { presentId } = c.req.valid("param");

      // Check if the user has already picked the present
      const existPick = await dbPrisma.pick.findUnique({
        where: {
          presentId,
        },
        include: {
          present: true,
        },
      });

      // Validaciones de pick existente
      if (existPick) {
        if (existPick.pickedById === authUserId)
          return c.json(
            { error: ErrorMessage.presents.AlreadyPickedByUser },
            400
          );

        if (
          existPick.status === PickStatus.RESERVED ||
          existPick.pickedById !== authUserId
        )
          return c.json({ error: ErrorMessage.presents.AlreadyPicked }, 400);

        if (existPick.present?.pickedById === authUserId)
          return c.json(
            { error: ErrorMessage.presents.NotAllowedToPickYourOwnPresent },
            403
          );
      }

      const [createPick, updatePresent] = await Promise.all([
        dbPrisma.pick.create({
          data: {
            presentId,
            pickedById: authUserId,
            status: PickStatus.RESERVED,
          },
        }),
        dbPrisma.present.update({
          where: { id: presentId },
          data: {
            isPicked: true,
            pickedBy: {
              connect: { id: authUserId },
            },
          },
        }),
      ]);

      if (!createPick || !updatePresent) {
        return c.json({ error: "No se ha podido reservar el regalo" }, 404);
      }

      return c.json({ pickId: createPick });
    }
  )
  .patch(
    "/:presentId/status",
    verifyAuth(),
    zValidator("param", z.object({ presentId: z.string() })),
    zValidator("json", z.object({ status: z.nativeEnum(PickStatus) })),
    async (c) => {
      const authUser = c.get("authUser");
      const authUserId = authUser?.token?.id;

      if (!authUserId) {
        return c.json({ error: ErrorMessage.user.Unauthorized }, 401);
      }

      const { presentId } = c.req.valid("param");
      const { status } = c.req.valid("json");

      if (!presentId) {
        return c.json({ error: "Bad request" }, 400);
      }

      const pick = await dbPrisma.pick.update({
        where: { presentId, pickedById: authUserId },
        data: { status },
      });

      if (!pick) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data: pick });
    }
  )
  .delete(
    "/:presentId",
    verifyAuth(),
    zValidator("param", z.object({ presentId: z.string() })),
    async (c) => {
      const authUser = c.get("authUser");
      const authUserId = authUser?.token?.id;

      if (!authUserId) {
        return c.json({ error: ErrorMessage.user.Unauthorized }, 401);
      }

      const { presentId } = c.req.valid("param");

      // Primero verificamos que el pick existe y pertenece al usuario
      const pick = await dbPrisma.pick.findFirst({
        where: {
          presentId,
          pickedById: authUserId,
        },
      });

      if (!pick) {
        return c.json({ error: "Pick no encontrado" }, 404);
      }

      // Realizamos las operaciones en una transacción
      await dbPrisma.$transaction([
        dbPrisma.pick.delete({
          where: {
            presentId: pick.presentId, // Usamos solo presentId ya que es @unique
          },
        }),
        dbPrisma.present.update({
          where: { id: presentId },
          data: { isPicked: false, pickedBy: { disconnect: true } },
        }),
      ]);

      return c.json({ data: true });
    }
  );

export default app;
