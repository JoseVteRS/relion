import { db as dbPrisma } from "@/db/prisma";
import { ErrorList } from "@/features/list/errors-enum";
import { ErrorMessage } from "@/lib/error-messages";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { ListStatus, PresentStatus } from "@prisma/client";
import { Hono } from "hono";
import { z } from "zod";
import { createListSchema, updateListSchema } from "./schemas";

const app = new Hono()
  .get("/", verifyAuth(), async (c) => {
    const auth = c.get("authUser");
    const authUserId = auth?.token?.id;

    if (!authUserId) {
      return c.json({ error: ErrorMessage.user.Unauthorized }, 403);
    }

    const lists = await dbPrisma.list.findMany({
      where: {
        ownerId: authUserId,
      },
      include: {
        presents: true,
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        eventDate: "asc",
      },
    });

    const countLists = await dbPrisma.list.count({
      where: {
        ownerId: authUserId,
      },
    });

    if (!lists || countLists === 0) {
      return c.json({ error: ErrorList.NotFound }, 404);
    }

    return c.json({ data: lists, count: countLists });
  })
  .get(
    "/:id/private",
    zValidator("param", z.object({ id: z.optional(z.string()) })),
    verifyAuth(),
    async (c) => {
      const { id } = c.req.valid("param");
      const auth = c.get("authUser");
      const authUserId = auth?.token?.id;

      if (!authUserId) {
        return c.json({ error: ErrorList.NotFound }, 404);
      }

      if (!id) {
        return c.json({ error: ErrorList.InvalidInput }, 400);
      }

      const ownerData = {
        id: true,
        name: true,
      };

      const list = await dbPrisma.list.findUnique({
        where: {
          id,
          ownerId: authUserId,
        },
        include: {
          presents: true,
          owner: {
            select: ownerData,
          },
        },
      });

      if (!list) {
        return c.json({ error: ErrorList.NotFound }, 404);
      }

      return c.json({ data: list });
    }
  )
  .get(
    "/:id/public",
    verifyAuth(),
    zValidator("param", z.object({ id: z.optional(z.string()) })),
    async (c) => {
      const id = c.req.param("id");

      const auth = c.get("authUser");
      const authUserId = auth?.token?.id;
      if (!authUserId) {
        return c.json({ error: ErrorMessage.user.Unauthorized }, 403);
      }

      const list = await dbPrisma.list.findUnique({
        where: {
          id,
          status: ListStatus.PUBLIC,
        },
        include: {
          owner: {
            select: {
              name: true,
            },
          },
          presents: {
            where: {
              status: PresentStatus.PUBLIC,
            },
          },
        },
      });

      if (!list) {
        return c.json({ error: ErrorMessage.lists.NotFoundLists }, 404);
      }

      return c.json({ data: list });
    }
  )
  .get(
    "/:listId/shared",
    verifyAuth(),
    zValidator("param", z.object({ listId: z.optional(z.string()) })),
    async (c) => {
      const auth = c.get("authUser");
      const authUserId = auth?.token?.id;
      if (!authUserId) {
        return c.json({ error: ErrorMessage.user.Unauthorized }, 403);
      }
      const { listId } = c.req.valid("param");

      const sharedList = await dbPrisma.list.findFirst({
        where: {
          id: listId,
          status: ListStatus.PUBLIC,
          ownerId: {
            not: authUserId,
          },
        },
        include: {
          owner: {
            select: {
              name: true,
            },
          },
          presents: {
            where: {
              status: PresentStatus.PUBLIC,
            },
          },
        },
      });

      if (!sharedList) {
        return c.json({ error: ErrorList.NotFound }, 404);
      }

      return c.json({ data: sharedList });
    }
  )
  .post("/", verifyAuth(), zValidator("json", createListSchema), async (c) => {
    const auth = c.get("authUser");
    const authUserId = auth?.token?.id;

    if (!authUserId) {
      return c.json({ error: ErrorList.Unauthorized }, 403);
    }

    const values = c.req.valid("json");

    if (!values) {
      return c.json({ error: ErrorList.InvalidInput }, 400);
    }

    const eventDate = new Date(values.eventDate!);

    try {
      const newList = await dbPrisma.list.create({
        data: {
          name: values.name,
          eventDate: eventDate,
          status: values.status,
          ownerId: authUserId,
        },
      });

      return c.json({ data: newList }, 201);
    } catch (error) {
      console.error(
        "api:post:create_list - Error al crear nueva lista:",
        error
      );
      return c.json({ error: ErrorList.ServerError }, 500);
    }
  })
  .patch(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.optional(z.string()) })),
    zValidator("json", updateListSchema),
    async (c) => {
      const auth = c.get("authUser");
      const authUserId = auth?.token?.id;
      if (!authUserId) {
        return c.json({ error: ErrorList.NotFound }, 404);
      }

      const { id } = c.req.valid("param");
      const values = c.req.valid("json");
      if (!id) {
        return c.json({ error: ErrorList.InvalidInput }, 400);
      }

      if (!values) {
        return c.json({ error: ErrorList.InvalidInput }, 400);
      }

      const updatedList = await dbPrisma.list.update({
        where: {
          id,
          ownerId: authUserId,
        },
        data: {
          ...values,
          updatedAt: new Date(),
        },
      });

      if (!updatedList) {
        return c.json({ error: ErrorList.NotFound }, 404);
      }

      return c.json({ data: updatedList });
    }
  )

  .patch(
    "/:id/status",
    verifyAuth(),
    zValidator("param", z.object({ id: z.optional(z.string()) })),
    zValidator("json", z.object({ status: z.nativeEnum(ListStatus) })),
    async (c) => {
      const { id } = c.req.valid("param");
      const { status } = c.req.valid("json");

      const auth = c.get("authUser");
      const authUserId = auth?.token?.id;
      if (!authUserId) {
        return c.json({ error: ErrorList.NotFound }, 404);
      }

      if (!id || !status) {
        return c.json({ error: ErrorList.InvalidInput }, 400);
      }

      const updatedListStatus = await dbPrisma.list.update({
        where: {
          id,
          ownerId: authUserId,
        },
        data: {
          status,
        },
      });

      if (!updatedListStatus) {
        return c.json({ error: ErrorList.NotFound }, 404);
      }

      return c.json({ data: updatedListStatus });
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
        return c.json({ error: ErrorList.InvalidInput }, 400);
      }

      const authUserId = auth?.token?.id;
      if (!authUserId) {
        return c.json({ error: ErrorList.NotFound }, 404);
      }

      try {
        const deletedList = await dbPrisma.list.delete({
          where: {
            id,
            ownerId: authUserId,
          },
        });

        if (!deletedList) {
          return c.json({ error: ErrorList.NotFound }, 404);
        }

        return c.json({ data: deletedList });
      } catch (error) {
        console.error(
          "api:delete:delete_list - Error al eliminar lista:",
          error
        );
        return c.json({ error: ErrorList.ServerError }, 500);
      }
    }
  );

export default app;
