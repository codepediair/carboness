import { pgTable, text, timestamp, integer, numeric, uuid, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "@/db/schema/auth-schema";

// ---- Core Hierarchy ----
export const scope = pgTable("scope", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(), // Scope 1, 2, 3
  slug: text("slug").notNull().unique(),
  description: text("description"),
  position: integer("position").default(0),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const category = pgTable("category", {
  id: uuid("id").defaultRandom().primaryKey(),
  scopeId: uuid("scope_id").notNull().references(() => scope.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  position: integer("position").default(0),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const subCategory = pgTable("sub_category", {
  id: uuid("id").defaultRandom().primaryKey(),
  categoryId: uuid("category_id").notNull().references(() => category.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  requiresFuelType: boolean("requires_fuel_type").default(false),
  requiresTransportDetails: boolean("requires_transport_details").default(false),
  requiresMaterialDetails: boolean("requires_material_details").default(false),
  position: integer("position").default(0),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const activityType = pgTable("activity_type", {
  id: uuid("id").defaultRandom().primaryKey(),
  subCategoryId: uuid("sub_category_id").notNull().references(() => subCategory.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  defaultUnit: text("default_unit").notNull(), // e.g. kWh, ton, km
  position: integer("position").default(0),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ---- Lookup Tables ----
export const fuelType = pgTable("fuel_type", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const transportType = pgTable("transport_type", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const vehicleType = pgTable("vehicle_type", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const wasteType = pgTable("waste_type", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

// ---- Details ----
export const transportDetails = pgTable("transport_details", {
  id: uuid("id").defaultRandom().primaryKey(),
  transportTypeId: uuid("transport_type_id").references(() => transportType.id),
  vehicleTypeId: uuid("vehicle_type_id").references(() => vehicleType.id),
  distance: numeric("distance", { precision: 12, scale: 2 }), // km
  cargoWeight: numeric("cargo_weight", { precision: 12, scale: 2 }), // ton
  fuelConsumed: numeric("fuel_consumed", { precision: 12, scale: 2 }),
  fuelUnit: text("fuel_unit"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const materialDetails = pgTable("material_details", {
  id: uuid("id").defaultRandom().primaryKey(),
  materialName: text("material_name").notNull(),
  materialType: text("material_type"), // raw, semi_finished, finished, packaging
  supplierName: text("supplier_name"),
  recyclingRate: numeric("recycling_rate", { precision: 5, scale: 2 }),
  supplierEmissionData: boolean("supplier_emission_data").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const wasteDetails = pgTable("waste_details", {
  id: uuid("id").defaultRandom().primaryKey(),
  wasteTypeId: uuid("waste_type_id").references(() => wasteType.id),
  wasteCode: text("waste_code"),
  disposalMethod: text("disposal_method"),
  weight: numeric("weight", { precision: 12, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ---- Emission Factors ----
export const emissionFactor = pgTable("emission_factor", {
  id: uuid("id").defaultRandom().primaryKey(),
  activityTypeId: uuid("activity_type_id").notNull().references(() => activityType.id, { onDelete: "cascade" }),
  fuelTypeId: uuid("fuel_type_id").references(() => fuelType.id),
  transportTypeId: uuid("transport_type_id").references(() => transportType.id),
  vehicleTypeId: uuid("vehicle_type_id").references(() => vehicleType.id),
  gasType: text("gas_type").notNull(), // CO2, CH4, N2O
  value: numeric("value", { precision: 12, scale: 6 }).notNull(),
  unit: text("unit").notNull(), // e.g. kgCO2e/kWh
  source: text("source").notNull(),
  year: integer("year"),
  region: text("region"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ---- User Input ----
export const userInput = pgTable("user_input", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  activityTypeId: uuid("activity_type_id").notNull().references(() => activityType.id, { onDelete: "cascade" }),
  amount: numeric("amount", { precision: 15, scale: 4 }).notNull(),
  unit: text("unit").notNull(),
  fuelTypeId: uuid("fuel_type_id").references(() => fuelType.id),
  transportDetailsId: uuid("transport_details_id").references(() => transportDetails.id, { onDelete: "set null" }),
  materialDetailsId: uuid("material_details_id").references(() => materialDetails.id, { onDelete: "set null" }),
  wasteDetailsId: uuid("waste_details_id").references(() => wasteDetails.id, { onDelete: "set null" }),
  calculatedEmission: numeric("calculated_emission", { precision: 15, scale: 4 }),
  emissionFactorUsed: numeric("emission_factor_used", { precision: 12, scale: 6 }),
  periodStart: timestamp("period_start"),
  periodEnd: timestamp("period_end"),
  note: text("note"),
  dataSource: text("data_source").default("manual"),
  isVerified: boolean("is_verified").default(false),
  isDeleted: boolean("is_deleted").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});