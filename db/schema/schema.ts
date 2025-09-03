import { pgTable, text, timestamp, boolean, integer, decimal, real, jsonb, numeric } from "drizzle-orm/pg-core";
import { user } from "@/db/schema/auth-schema"

// 1. Categories and SubCategories
export const category = pgTable("category", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull(),
});
export const subCategory = pgTable("sub_category", {
  id: text("id").primaryKey(),
  categoryId: text("category_id")
    .notNull()
    .references(() => category.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull(),
});

// 2. Emission Factors
export const emissionFactor = pgTable("emission_factor", {
  id: text("id").primaryKey(),
  subCategoryId: text("sub_category_id")
    .notNull()
    .references(() => subCategory.id, { onDelete: "cascade" }),
  gasType: text("gas_type").notNull(), // CO2, CH4, N2O
  value: numeric("value").notNull(),
  unit: text("unit").notNull(),
  source: text("source"),
  year: integer("year"),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull(),
});

// 3. User Inputs
export const userInput = pgTable("user_input", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  subCategoryId: text("sub_category_id")
    .notNull()
    .references(() => subCategory.id, { onDelete: "cascade" }),
  quantity: numeric("quantity").notNull(),
  unit: text("unit").notNull(),
  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull(),
});


// 4. Calculation Results
export const calculation = pgTable("calculation", {
  id: text("id").primaryKey(),
  inputId: text("input_id")
    .notNull()
    .references(() => userInput.id, { onDelete: "cascade" }),
  emissionFactorId: text("emission_factor_id")
    .notNull()
    .references(() => emissionFactor.id, { onDelete: "cascade" }),
  co2e: numeric("co2e").notNull(),
  calculationDate: timestamp("calculation_date").notNull(),
});

// 5. Reports for publishing and save
export const report = pgTable("report", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  generatedDate: timestamp("generated_date").notNull(),
  filePath: text("file_path"),
});