import {
  boolean,
  date,
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
// enums

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").default(""),
});

export const subCategories = pgTable("sub_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  categoryId: uuid("category_id")
    .references(() => categories.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  description: text("description").default(""),
});

export const emissionSources = pgTable("emission_sources", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  subCategoryId: uuid("sub_category_id")
    .references(() => subCategories.id, { onDelete: "cascade" })
    .notNull(),
});

export const activityTypes = pgTable("activity_types", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").default(""),
  unit: text("unit").default(""),
  emissionFactor: numeric("emission_factor", {
    precision: 12,
    scale: 4,
    mode: "number",
  })
    .notNull()
    .default(0.0),
  emissionSourceId: uuid("emission_source_id")
    .references(() => emissionSources.id, { onDelete: "cascade" })
    .notNull(),
});

export const userInput = pgTable("user_input", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").references(() => user.id),
  activityTypeId: uuid("activity_type_id").references(() => activityTypes.id),
  amount: numeric("amount", {
    precision: 14,
    scale: 4,
    mode: "number",
  }).notNull(),
  activityDate: timestamp("activity_date").notNull(),
  notes: text("notes").default(""),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ),
});
