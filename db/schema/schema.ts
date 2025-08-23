import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  decimal,
  date,
} from 'drizzle-orm/pg-core';

import { user } from '@/db/schema/auth-schema'

export const categories = pgTable('categories', {
  category_id: serial('category_id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
});

export const subcategories = pgTable('subcategories', {
  subcategory_id: serial('subcategory_id').primaryKey(),
  category_id: integer('category_id')
    .notNull()
    .references(() => categories.category_id),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
});

export const activities = pgTable('activities', {
  activity_id: serial('activity_id').primaryKey(),
  subcategory_id: integer('subcategory_id')
    .notNull()
    .references(() => subcategories.subcategory_id),
  name: varchar('name', { length: 255 }).notNull(),
  unit: varchar('unit', { length: 50 }).notNull(), // e.g. 'liter', 'm3', 'kWh', 'ton'
});

export const emission_factors = pgTable('emission_factors', {
  ef_id: serial('ef_id').primaryKey(),
  source_ref: varchar('source_ref', { length: 100 }).notNull(), // IPCC, DEFRA, TEİAŞ
  activity_id: integer('activity_id')
    .references(() => activities.activity_id),
  gas_type: varchar('gas_type', { length: 10 }).notNull(), // 'CO2', 'CH4', 'N2O', 'tCO2e'
  value: decimal('value', { precision: 12, scale: 6 }).notNull(),
  unit_of_factor: varchar('unit_of_factor', { length: 50 }).notNull(), 
  // e.g. 'kg CO2e/liter', 'kg/kWh'
});

export const emission_records = pgTable('emission_records', {
  record_id: serial('record_id').primaryKey(),
  activity_id: integer('activity_id')
    .notNull()
    .references(() => activities.activity_id),
  ef_id: integer('ef_id')
    .notNull()
    .references(() => emission_factors.ef_id),
  quantity: decimal('quantity', { precision: 14, scale: 4 }).notNull(),
  record_date: date('record_date').notNull(),
  computed_emission: decimal('computed_emission', { precision: 14, scale: 4 }),
  notes: text('notes'),

  // join to users
  user_id: text('user_id')
  .notNull()
  .references(() => user.id)
});

export const formula_templates = pgTable('formula_templates', {
  formula_id: serial('formula_id').primaryKey(),
  category_id: integer('category_id')
    .notNull()
    .references(() => categories.category_id),
  template: text('template').notNull(),  // e.g. '{Q} * {EF} / 1000'
  description: text('description'),
});
