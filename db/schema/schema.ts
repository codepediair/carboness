import {
  pgTable,
  text,
  uuid,
  integer,
  numeric,
  boolean,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "@/db/schema/auth-schema";

// ---- Enums ----
export const unitEnum = pgEnum("unit", [
  "kg", "ton", "m3", "liter", "kWh", "MWh", "km", "ton-km"
]);

export const scopeEnum = pgEnum("scope", [
  "scope1", // doğrudan
  "scope2", // enerji kaynaklı dolaylı
  "scope3"  // diğer dolaylı
]);

// ---- Category Table ----
export const category = pgTable("category", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  position: integer("position").default(0),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ---- SubCategory ----
export const subCategory = pgTable("sub_category", {
  id: uuid("id").defaultRandom().primaryKey(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => category.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  position: integer("position").default(0),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ---- Emission Factor ----
export const emissionFactor = pgTable("emission_factor", {
  id: uuid("id").defaultRandom().primaryKey(),
  subCategoryId: uuid("sub_category_id")
    .notNull()
    .references(() => subCategory.id, { onDelete: "cascade" }),
  gas: text("gas").notNull(), // CO2, CH4, N2O
  value: numeric("value", { precision: 12, scale: 6 }).notNull(),
  unit: text("unit").notNull(), // kgCO2e/kWh, kgCO2e/ton-km
  source: text("source"), // IPCC, DEFRA, TÜİK...
  year: integer("year"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ---- User Input ----
export const userInput = pgTable("user_input", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  subCategoryId: uuid("sub_category_id")
    .notNull()
    .references(() => subCategory.id, { onDelete: "cascade" }),
  amount: numeric("amount", { precision: 14, scale: 4 }).notNull(),
  unit: unitEnum().notNull(),
  scope: scopeEnum().notNull(),
  note: text("note"),
  recycledRatio: numeric("recycled_ratio"), // 0–1
  isCertifiedGreen: boolean("is_certified_green").default(false),
  supplierClaim: text("supplier_claim"),
  calculatedCO2e: numeric("calculated_co2e", { precision: 14, scale: 6 }),
  source: text("source").default("manual"),
  isDeleted: boolean("is_deleted").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ---- Relations ----
export const categoryRelations = relations(category, ({ many }) => ({
  subCategories: many(subCategory),
}));

export const subCategoryRelations = relations(subCategory, ({ one, many }) => ({
  category: one(category, {
    fields: [subCategory.categoryId],
    references: [category.id],
  }),
  emissionFactors: many(emissionFactor),
  userInputs: many(userInput),
}));

export const emissionFactorRelations = relations(emissionFactor, ({ one }) => ({
  subCategory: one(subCategory, {
    fields: [emissionFactor.subCategoryId],
    references: [subCategory.id],
  }),
}));

export const userInputRelations = relations(userInput, ({ one }) => ({
  subCategory: one(subCategory, {
    fields: [userInput.subCategoryId],
    references: [subCategory.id],
  }),
  user: one(user, {
    fields: [userInput.userId],
    references: [user.id],
  }),
}));