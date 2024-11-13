import { verifyAuth } from "@hono/auth-js";
import { createCheckout, getSubscription } from "@lemonsqueezy/lemonsqueezy.js";
import { createId } from "@paralleldrive/cuid2";
import crypto from "crypto";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { db } from "@/db/drizzle";
import { subscriptions, tiers, users } from "@/db/schema";
import { setupLemon } from "@/lib/lemon-squeeze";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

setupLemon();

const app = new Hono()
  .get("/current", verifyAuth(), async (c) => {
    const auth = c.get("authUser");
    if (!auth?.token?.id) {
      throw new HTTPException(401, {
        res: c.json({ error: "Unauthorized" }, 401),
      });
    }

    const [data] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, auth.token.id));

    if (!data) {
      return c.json({ data: null });
    }

    return c.json({ data });
  })
  .post("/checkout", verifyAuth(), async (c) => {
    const auth = c.get("authUser");
    if (!auth?.token?.id) {
      throw new HTTPException(401, {
        res: c.json({ error: "Unauthorized" }, 401),
      });
    }

    const [existing] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, auth.token.id));

    if (existing?.subscriptionId) {
      const subscription = await getSubscription(existing.subscriptionId);
      const portalUrl = subscription.data?.data.attributes.urls.customer_portal;

      if (!portalUrl) {
        throw new HTTPException(500, {
          res: c.json({ error: "Internal Server Error" }, 500),
        });
      }

      return c.json({ data: portalUrl });
    }

    const checkout = await createCheckout(
      process.env.LEMONSQUEEZY_STORE_ID!,
      process.env.LEMONSQUEEZY_PRODUCT_ID!,
      {
        checkoutData: {
          custom: {
            user_id: auth.token.id,
          },
        },
        productOptions: {
          redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/`,
        },
      }
    );

    const checkoutUrl = checkout?.data?.data.attributes.url;

    if (!checkoutUrl) {
      throw new HTTPException(500, {
        res: c.json({ error: "Internal Server Error" }, 500),
      });
    }

    return c.json({ data: checkoutUrl });
  })
  .post("/portal", verifyAuth(), async (c) => {
    const auth = c.get("authUser");
    if (!auth?.token?.id) {
      throw new HTTPException(401, {
        res: c.json({ error: "Unauthorized" }, 401),
      });
    }

    const [existing] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, auth.token.id));

    if (!existing) {
      throw new HTTPException(404, {
        res: c.json({ error: "Not found" }, 404),
      });
    }

    const subscription = await getSubscription(existing.subscriptionId);

    const portalUrl = subscription.data?.data.attributes.urls.customer_portal;

    if (!portalUrl) {
      throw new HTTPException(500, {
        res: c.json({ error: "Internal Server Error" }, 500),
      });
    }

    return c.json({ data: portalUrl });
  })
  .post("/webhook", async (c) => {
    const text = await c.req.text();

    const hmac = crypto.createHmac(
      "sha256",
      process.env.LEMONSQUEEZY_WEBHOOK_SECRET!
    );
    const digest = Buffer.from(hmac.update(text).digest("hex"), "utf8");
    const signature = Buffer.from(
      c.req.header("x-signature") as string,
      "utf8"
    );

    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new HTTPException(401);
    }

    const payload = JSON.parse(text);
    const event = payload.meta.event_name;

    const subscriptionId = payload.data.id;
    const userId = payload.meta.custom_data.user_id;
    const status = payload.data.attributes.status;

    if (event === "subscription_created") {
      await db.insert(subscriptions).values({
        id: createId(),
        subscriptionId,
        userId,
        status,
      });

      await db.update(users).set({
        tierId: process.env.REGALAM_TIER_PREMIUM_ID,
      });
    }

    if (event === "subscription_updated") {
      await db
        .update(subscriptions)
        .set({
          status,
        })
        .where(eq(subscriptions.subscriptionId, subscriptionId));
    }

    if (event === "subscription_cancelled") {
      await db.update(users).set({
        tierId: process.env.REGALAM_TIER_FREE_ID,
      });
    }

    return c.json({}, 200);
  })
  .get(
    "/tier/:tierId",
    verifyAuth(),
    zValidator("param", z.object({ tierId: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      if (!auth?.token?.id) {
        throw new HTTPException(401, {
          res: c.json({ error: "Unauthorized" }, 401),
        });
      }

      const tierId = c.req.param("tierId");

      const [tier] = await db.select().from(tiers).where(eq(tiers.id, tierId));

      return c.json({ data: tier });
    }
  );

export default app;
