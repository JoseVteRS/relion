import { z } from "zod";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { tiers, users } from "@/db/schema";
import JWT from "next-auth/jwt";
const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

declare module "next-auth/jwt" {
  interface JWT {
    id: string | undefined;
    tierId: string | undefined;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string | undefined;
    tierId: string | undefined;
  }
}

declare module "next-auth" {
  interface User {
    tierId: string | undefined;
  }
}

export default {
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = credentialsSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;
        const query = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        const user = query[0];

        if (!user || !user.password) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return null;
        }

        return { ...user, tierId: user.tierId || "" };
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && user?.id) {
        // User is available during sign-in
        token.id = user.id;
        const [userTier] = await db
          .select()
          .from(users)
          .where(eq(users.id, user.id));
        token.tierId = userTier.tierId || "";
      }
      return token;
    },
    session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
        session.user.tierId = token.tierId || "";
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      if (user.id) {
        const freeTier = await db
          .select()
          .from(tiers)
          .where(eq(tiers.name, "FREE"))
          .limit(1);
        if (freeTier.length > 0) {
          await db
            .update(users)
            .set({ tierId: freeTier[0].id })
            .where(eq(users.id, user.id));
        }
      }
    },
  },
} satisfies NextAuthConfig;
