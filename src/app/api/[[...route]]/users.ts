import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/db/drizzle";
import { tiers, users } from "@/db/schema";
import { eq } from "drizzle-orm";

const app = new Hono().post(
  "/",
  zValidator(
    "json",
    z.object({
      name: z.string().min(3).max(100),
      email: z.string().email(),
      password: z.string().min(3),
    })
  ),
  async (c) => {
    const { name, email, password } = c.req.valid("json");

    const hashedPassword = await bcrypt.hash(password, 12);

    const tier = await db.select().from(tiers).where(eq(tiers.name, "FREE"));
    const query = await db.select().from(users).where(eq(users.email, email));
    

    if (query[0]) {
      return c.json({ error: "Email already exists" }, 400);
    }

    await db.insert(users).values({
      email,
      name,
      password: hashedPassword,
      tierId: tier[0].id,
    });

    return c.json(null, 200);
  }
);

export default app;
