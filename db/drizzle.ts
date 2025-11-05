import { env } from "@/env";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema/schema";
import * as authSchema from "./schema/auth-schema";

export const db = drizzle(env.DATABASE_URL, {
  schema: {
    ...schema,
    ...authSchema,
  },
});