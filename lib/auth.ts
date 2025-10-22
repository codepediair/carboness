import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"; // your drizzle instance
import { env } from "@/env";
import { account, session, user, verification } from "@/db/schema/auth-schema";
import { emailOTP } from "better-auth/plugins"
import { resend } from "./resend";


export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: { user, session, account, verification }
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false
  },
});