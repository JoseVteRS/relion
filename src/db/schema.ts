import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type { AdapterAccountType } from "next-auth/adapters";
import { z } from "zod";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  tierId: text("tierId")
    .references(() => tiers.id, {
      onDelete: "set default",
    })
    .default(process.env.REGALAM_TIER_FREE_ID! as string),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  presents: many(presents, {
    relationName: "user_presents"
  }),
  lists: many(lists, {
    relationName: "user_lists"
  }),
  tier: one(tiers, {
    fields: [users.tierId],
    references: [tiers.id],
    relationName: "user_tier"
  }),
}));

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);

export const tiers = pgTable("tier", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").default("FREE").notNull(),
  maxLists: integer("maxLists").default(3).notNull(),
  maxPresentsPerList: integer("maxPresentsPerList").default(6).notNull(),
});

export const tiersRelations = relations(tiers, ({ many }) => ({
  users: many(users, {
    relationName: "user_tier"
  }),
}));

export const insertTierSchema = createInsertSchema(tiers);

export const subscriptions = pgTable("subscription", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  subscriptionId: text("subscription_id").notNull().unique(),
  status: text("status").notNull(),
});

export const presents = pgTable("present", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  listId: text("listId").references(() => lists.id, { onDelete: "set null" }),
  name: text("name"),
  description: text("description"),
  isPicked: boolean("isPicked").default(false),
  link: text("link"),
  pickedBy: text("pickedBy").references(() => users.id, {
    onDelete: "set null",
  }),
  status: boolean("status").default(true),
  createdAt: timestamp("createdAt", { mode: "date" }),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const presentsRelations = relations(presents, ({ one }) => ({
  user: one(users, {
    fields: [presents.userId],
    references: [users.id],
    relationName: "user_presents"
  }),
  list: one(lists, {
    fields: [presents.listId],
    references: [lists.id],
    relationName: "list_presents"
  }),
  pickedBy: one(users, {
    fields: [presents.pickedBy],
    references: [users.id],
    relationName: "present_picker"
  }),
}));

export const insertPresentSchema = createInsertSchema(presents);

export const lists = pgTable("list", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name"),
  description: text("description"),
  status: boolean("status").default(true),
  createdAt: timestamp("createdAt", { mode: "date" }),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
  eventDate: timestamp("eventDate", { mode: "date" }).notNull(),
});

export const listsRelations = relations(lists, ({ one, many }) => ({
  user: one(users, {
    fields: [lists.userId],
    references: [users.id],
    relationName: "user_lists"
  }),
  presents: many(presents, {
    relationName: "list_presents"
  }),
}));

export const insertListsSchema = createInsertSchema(lists, {
  eventDate: z.coerce.date(),
});

export const pickedPresents = pgTable("pickedPresent", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  presentId: text("presentId")
    .notNull()
    .references(() => presents.id, { onDelete: "cascade" }),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const pickedPresentsRelations = relations(pickedPresents, ({ one }) => ({
  present: one(presents, {
    fields: [pickedPresents.presentId],
    references: [presents.id],
    relationName: "picked_present_ref"
  }),
  user: one(users, {
    fields: [pickedPresents.userId],
    references: [users.id],
    relationName: "picked_present_user"
  }),
}));

export const favoriteLists = pgTable("favoriteList", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  listId: text("listId")
    .notNull()
    .references(() => lists.id, { onDelete: "cascade" }),
});

export const favoriteListsRelations = relations(favoriteLists, ({ one }) => ({
  user: one(users, {
    fields: [favoriteLists.userId],
    references: [users.id],
    relationName: "favorite_list_user"
  }),
  list: one(lists, {
    fields: [favoriteLists.listId],
    references: [lists.id],
    relationName: "favorite_list_ref"
  }),
}));