import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"; // your drizzle instance
import { env } from "@/env";
import { account, session, user, verification } from "@/db/schema";
import { emailOTP } from "better-auth/plugins"
import { resend } from "./resend";


export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: { user, session, account, verification }
  }),
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_SECRET
    }
  },

  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: 'carboness <onboarding@resend.dev>',
          to: [email],
          subject: 'carboness - verify your email',
          html: `<p>Your OTP is <strong>${otp}</strong></p>`,
        })
      }
    }),
  ]
});