import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
  boolean,
  pgEnum,
  text,
} from 'drizzle-orm/pg-core';

import { user } from '@/db/schema/auth-schema'

export const unitEnum = pgEnum('unit', ["m3", "liter", "galon"]);
export const scopeEnum = pgEnum('scope', ["directly", "undirectly", "inChain"]);


export const activity_data = pgTable('activity_data', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  amount: integer('amount').notNull(),
  unit: unitEnum(),
  scope: scopeEnum(),
  smallDescription: varchar('small_description', { length: 255 }).default(""),
  slug: varchar('slug', { length: 255 }).unique(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  userId: text('user_id').references(() => user.id, {onDelete: 'cascade'}).notNull(),
});


