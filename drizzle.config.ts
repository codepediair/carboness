import { defineConfig } from 'drizzle-kit';
import { env } from './env';

export default defineConfig({
  out: './drizzle',
  schema: ['./db/schema.ts', './db/auth-schema'],
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
