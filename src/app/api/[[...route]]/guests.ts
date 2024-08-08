import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { guests } from "@/db/schema";
import { getAuthUser } from "@hono/auth-js";

const app = new Hono().post("/", async (c) => {
  const authUser = await getAuthUser(c);
  if (authUser) {
    return c.json({ error: "No puedes entrar como invitado" }, 400);
  }

  // Generar un número aleatorio entre 1000 y 9999
  const randomNumber = Math.floor(Math.random() * 9000) + 1000;

  // Crear el numberId para el invitado
  const guestNumberId = `guest-${crypto.randomUUID().replaceAll("-", "")}`;

  // Insertar el nuevo usuario invitado en la base de datos
  const [newGuest] = await db
    .insert(guests)
    .values({
      numberId: guestNumberId,
    })
    .returning();

  if (!newGuest) {
    return c.json({ error: "No se pudo crear el usuario invitado" }, 500);
  }

  return c.json({ newGuest }, 201);
});

export default app;
