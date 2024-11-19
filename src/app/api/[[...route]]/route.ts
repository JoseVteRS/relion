import authConfig from "@/auth.config";
import { AuthConfig, initAuthConfig } from "@hono/auth-js";
import { Context, Hono } from "hono";
import { handle } from "hono/vercel";

import firstList from "./first-list";
import favorites from "./follow-list";
import list from "./lists";
import picks from "./picks";
import presents from "./presents";
import stats from "./stats";
import subscriptions from "./subscriptions";
import users from "./users";

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
  .route("/favorites", favorites)
  .route("/stats", stats);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
