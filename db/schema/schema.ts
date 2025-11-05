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
import { relations } from "drizzle-orm";
// enums
export const unitEnum = pgEnum("unit", ["kWh", "Liter", "Ton-kw", "tCO2e"]);

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey(),
  title: text("title"),
  description: text("description"),
});

export const subCategories = pgTable("sub_categories", {
  id: uuid("id").primaryKey(),
  categoryId: uuid("category_id").references(() => categories.id),
  title: text("title"),
  description: text("description"),
});

export const emissionSources = pgTable("emission_sources", {
  id: uuid("id").primaryKey(),
  title: text("title"),
  subCategoryId: uuid("sub_category_id").references(() => subCategories.id),
});

export const emissionSourceTags = pgTable("emission_source_tags", {
  sourceId: uuid("source_id").references(() => emissionSources.id),
  tag: text("tag").notNull(), //for example "energy", "transport", "product", "removal"
});

export const activityTypes = pgTable("activity_types", {
  id: uuid("id").primaryKey(),
  sourceId: uuid("source_id").references(() => emissionSources.id),
  title: text("title"),
  description: text("description"),
  unit: unitEnum().notNull(),
  emissionFactor: numeric("emission_factor", {
    precision: 12,
    scale: 4,
  }).default("0.0"),
  emissionFactorSource: text("emission_factor_source"),
  emissionFactorYear: integer("emission_factor_year"),
});

export const emissionInputs = pgTable("emission_inputs", {
  id: uuid("id").primaryKey(),
  activityId: uuid("activity_id").references(() => activityTypes.id),
  userId: text("user_id").references(() => user.id),
  inputValue: numeric("input_value", { precision: 12, scale: 4 }).default(
    "0.0",
  ),
  inputDate: date("input_date").defaultNow(),
  notes: text("notes"),
  attachments: text("attachments").default(""),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const emissionOutputs = pgTable("emission_outputs", {
  id: uuid("id").primaryKey(),
  inputId: uuid("input_id").references(() => emissionInputs.id),
  calculatedEmission: numeric("calculated_emission", {
    precision: 12,
    scale: 4,
  }),
  calculationMethod: text("calculation_method"),
  verified: boolean("verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ---- Relations (for Drizzle query builder `with` support) ----
export const categoriesRelations = relations(categories, ({ many }) => ({
  subCategories: many(subCategories),
}));

export const subCategoriesRelations = relations(subCategories, ({ one, many }) => ({
  category: one(categories, {
    fields: [subCategories.categoryId],
    references: [categories.id],
  }),
  emissionSources: many(emissionSources),
}));

export const emissionSourcesRelations = relations(emissionSources, ({ one, many }) => ({
  subCategory: one(subCategories, {
    fields: [emissionSources.subCategoryId],
    references: [subCategories.id],
  }),
  activityTypes: many(activityTypes),
}));

export const activityTypesRelations = relations(activityTypes, ({ one, many }) => ({
  emissionSource: one(emissionSources, {
    fields: [activityTypes.sourceId],
    references: [emissionSources.id],
  }),
  emissionInputs: many(emissionInputs),
}));

export const emissionInputsRelations = relations(emissionInputs, ({ one, many }) => ({
  activityType: one(activityTypes, {
    fields: [emissionInputs.activityId],
    references: [activityTypes.id],
  }),
  emissionOutputs: many(emissionOutputs),
}));

export const emissionOutputsRelations = relations(emissionOutputs, ({ one }) => ({
  input: one(emissionInputs, {
    fields: [emissionOutputs.inputId],
    references: [emissionInputs.id],
  }),
}));
