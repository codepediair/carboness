import { pgTable, text, timestamp, integer, numeric, pgEnum, uuid } from "drizzle-orm/pg-core";
import { user } from "@/db/schema/auth-schema"
import { relations } from "drizzle-orm";

// ---- Enums ----
export const unitEnum = pgEnum("unit", ["m3", "liter", "gallon", "kg", "ton"]);
export const scopeEnum = pgEnum("scope", ["directly", "indirectly", "inChain"]);

// ---- Category Table ----
export const category = pgTable("category", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull(),
});

// ---- SubCategory Table ----
export const subCategory = pgTable("sub_category", {
  id: uuid("id").defaultRandom().primaryKey(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => category.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// ---- Emission Factor Table ----
export const emissionFactor = pgTable("emission_factor", {
  id: uuid("id").defaultRandom().primaryKey(),
  subCategoryId: uuid("sub_category_id")
    .notNull()
    .references(() => subCategory.id, { onDelete: "cascade" }),
  gasType: text("gas_type").notNull(), // CO2, CH4, N2O
  value: numeric("value", { precision: 12, scale: 6 }).notNull(),
  unit: text("unit").notNull(),
  source: text("source"),
  year: integer("year"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ---- User Input Table ----
export const userInput = pgTable("user_input", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  subCategoryId: uuid("sub_category_id")
    .notNull()
    .references(() => subCategory.id, { onDelete: "cascade" }),
  amount: numeric("quantity").notNull(),
  unit: unitEnum("unit").notNull(),
  scope: scopeEnum("scope").notNull(),
  date: timestamp("date").notNull(),
  note: text("note"), // for metadata
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull(),
});

export const userInputRelations = relations(userInput, ({ one, many }) => ({
  subCategory: one(subCategory, {
    fields: [userInput.subCategoryId],
    references: [subCategory.id],
  }),
  calculations: many(calculation),
}));

export const calculation = pgTable("calculation", {
  id: uuid("id").defaultRandom().primaryKey(),
  inputId: uuid("input_id")
    .notNull()
    .references(() => userInput.id, { onDelete: "cascade" }),
  emissionFactorId: uuid("emission_factor_id")
    .notNull()
    .references(() => emissionFactor.id, { onDelete: "cascade" }),
  co2e: numeric("co2e").notNull(),
  calculationDate: timestamp("calculation_date").notNull(),
});

export const calculationRelations = relations(calculation, ({ one }) => ({
  userInput: one(userInput, {
    fields: [calculation.inputId],
    references: [userInput.id],
  }),
  emissionFactor: one(emissionFactor, {
    fields: [calculation.emissionFactorId],
    references: [emissionFactor.id],
  }),
}));

export const report = pgTable("report", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  generatedDate: timestamp("generated_date").notNull(),
  filePath: text("file_path"),
});