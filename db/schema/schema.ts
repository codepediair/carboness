import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  decimal,
  real,
  timestamp,
} from 'drizzle-orm/pg-core';

import { user } from '@/db/schema/auth-schema'
import { desc } from 'drizzle-orm';

export const calulation_categories = pgTable('calculation_categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
});

export const emission_source = pgTable('emission_source', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id')
  .notNull()
  .references(() => calulation_categories.id),
  name : varchar('name', { length: 255 }).notNull(),
  type: varchar('type', {  length: 255 }).notNull(),
  description: text('description'),
})

export const emission_factor = pgTable('emission_factor', {
  id: serial('id').primaryKey(),
  sourceId: integer('source_id')
  .notNull()
  .references(() => emission_source.id),
  unit: varchar('unit', { length: 100 }).notNull(),
  co2Factor: real('co2_factor'),
  ch4Factor: real('ch4_factor'),
  n2oFactor: real('n2o_factor'),
  reference: varchar('reference', { length: 255 }),
  year: integer('year'),
})

export const activity_data = pgTable('activity_data', {
  id: serial('id').primaryKey(),
  sourceId: integer('source_id')
  .notNull()
  .references(() => emission_source.id),
  quantity: real('quantity'),
  costCurrency: varchar('cost_currency', { length: 100 }),
  createAt : timestamp("create_at")
  .$defaultFn(() => /* @__PURE__@ */ new Date())
  .notNull(),
  description: text('description'),
})

export const emission_calculation = pgTable('emission_calculation', {
  id: serial('id').primaryKey(),
  activityId: integer('activity_id')
  .notNull()
  .references(() => activity_data.id),
  factorId: integer('factor_id')
  .notNull()
  .references(() => emission_factor.id),
  totalEmission: decimal('total_emission').notNull(),
})
