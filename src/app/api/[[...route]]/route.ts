import { Context, Hono } from "hono";
import { handle } from "hono/vercel";
import { AuthConfig, initAuthConfig } from "@hono/auth-js";
import authConfig from "@/auth.config";

import list from "./lists";
import presents from "./presents";
import users from "./users";
import picks from "./picks";
import subscriptions from "./subscriptions";
import firstList from "./first-list";
import favorites from "./follow-list";

export const runtime = "nodejs";

function getAuthConfig(c: Context): AuthConfig {
  return {
    secret: c.env.AUTH_SECRET,
    ...authConfig,
  };
}

const app = new Hono().basePath("/api");

app.use("*", initAuthConfig(getAuthConfig));

const routes = app
  .route("/lists", list)
  .route("/presents", presents)
  .route("/users", users)
  .route("/picks", picks)
  .route("/subscriptions", subscriptions)
  .route("/firstList", firstList)
  .route("/favorites", favorites);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
