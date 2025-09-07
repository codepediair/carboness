import { pgTable, text, timestamp, integer, numeric, pgEnum, uuid, boolean } from "drizzle-orm/pg-core";
import { user } from "@/db/schema/auth-schema"
import { relations } from "drizzle-orm"

// ---- Enums ----
export const unitEnum = pgEnum("unit", ["m3", "liter", "gallon", "kg", "ton"]);
export const scopeEnum = pgEnum("scope", ["directly", "indirectly", "inChain"]);

// ---- Category Table ----
export const category = pgTable("category", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  isActive: boolean("is_active").default(true).notNull(),
  position: integer('position').default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ---- SubCategory Table ----
export const subCategory = pgTable("sub_category", {
  id: uuid("id").defaultRandom().primaryKey(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => category.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  isActive: boolean("is_active").default(true).notNull(),
  position: integer('position').default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// ---- Emission Factor Tables ----
export const emissionFactor = pgTable("emission_factor", {
  id: uuid("id").defaultRandom().primaryKey(),
  subCategoryId: uuid("sub_category_id")
    .notNull()
    .references(() => subCategory.id, { onDelete: "cascade" }),
  gasType: text("gas_type").notNull(), // exam: CO2, CH4, N2O
  value: numeric("value", { precision: 12, scale: 6 }).notNull(), // value of emission factor
  unit: text("unit").notNull(), // exam: kgCO2e/kWh یا kgCO2e/ton-km
  source: text("source"), // Emission factor source (IPCC, DEFRA, ...)
  year: integer("year"), // year of this Emission
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ---- User Input Table ----
export const userInput = pgTable("user_input", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  subCategoryId: uuid("sub_category_id")
  .notNull()
  .references(() => subCategory.id, { onDelete: "cascade"}),
  amount: numeric('amount').notNull(),
  unit: unitEnum().notNull().default("m3"),
  scope: scopeEnum().notNull().default("directly"),
  note: text('note'),
  source : text("source").default("manual"),
  isDeleted: boolean("is_deleted").default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
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
