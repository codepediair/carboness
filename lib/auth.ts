import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"; // your drizzle instance
import { env } from "@/env";
import { account, session, user, verification } from "@/db/schema/auth-schema";


export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: { user, session, account, verification }
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    async sendResetPassword(data, request) {
      // Send an email to the user with a link to reset their password
    },
  },
});