import { pgTable, text, timestamp, integer, numeric, pgEnum, uuid, boolean } from "drizzle-orm/pg-core";
import { user } from "@/db/schema/auth-schema"
import { relations } from "drizzle-orm"

// ---- Enums ----
export const scopeEnum = pgEnum("scope", ["scope1", "scope2", "scope3"]);
export const unitEnum = pgEnum("unit", ["m3", "liter", "gallon", "kg", "ton", "kWh", "MWh", "km", "ton_km", "person_km", "hour", "item"]);
export const fuelTypeEnum = pgEnum("fuel_type", ["natural_gas", "diesel", "gasoline", "coal", "biomass", "lpg", "electricity", "other"]);
export const transportTypeEnum = pgEnum("transport_type", ["road", "rail", "marine", "air", "pipeline", "combined"]);
export const vehicleTypeEnum = pgEnum("vehicle_type", ["passenger_car", "light_truck", "heavy_truck", "bus", "motorcycle", "construction", "agricultural", "forklift", "locomotive", "ship", "aircraft"]);
export const wasteTypeEnum = pgEnum("waste_type", ["municipal", "packaging", "hazardous", "organic", "industrial", "wastewater"]);

// ---- Scope Table ----
export const scope = pgTable("scope", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(), // Scope1, Scope2, Scope3
  slug: text("slug").notNull().unique(),
  description: text("description"),
  position: integer('position').default(0),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// ---- Category Table ----
export const category = pgTable("category", {
  id: uuid("id").defaultRandom().primaryKey(),
  scopeId: uuid("scope_id")
    .notNull()
    .references(() => scope.id, { onDelete: "cascade" }),
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
  requiresFuelType: boolean("requires_fuel_type").default(false),
  requiresTransportDetails: boolean("requires_transport_details").default(false),
  requiresMaterialDetails: boolean("requires_material_details").default(false),
  position: integer('position').default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const activityType = pgTable("activity_type", {
  id: uuid("id").defaultRandom().primaryKey(),
  subCategoryId: uuid("sub_category_id")
    .notNull()
    .references(() => subCategory.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  defaultUnit: unitEnum("default_unit").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  position: integer('position').default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// ---- جداول تخصصی برای انواع داده‌ها ----
export const transportDetails = pgTable("transport_details", {
  id: uuid("id").defaultRandom().primaryKey(),
  transportType: transportTypeEnum("transport_type").notNull(),
  vehicleType: vehicleTypeEnum("vehicle_type"),
  distance: numeric("distance", { precision: 12, scale: 2 }), // km
  cargoWeight: numeric("cargo_weight", { precision: 12, scale: 2 }), // ton
  fuelConsumed: numeric("fuel_consumed", { precision: 12, scale: 2 }),
  fuelUnit: unitEnum("fuel_unit"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const materialDetails = pgTable("material_details", {
  id: uuid("id").defaultRandom().primaryKey(),
  materialName: text("material_name").notNull(),
  materialType: text("material_type"), // raw, semi_finished, finished, packaging
  supplierName: text("supplier_name"),
  recyclingRate: numeric("recycling_rate", { precision: 5, scale: 2 }), // percentage
  supplierEmissionData: boolean("supplier_emission_data").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const wasteDetails = pgTable("waste_details", {
  id: uuid("id").defaultRandom().primaryKey(),
  wasteType: wasteTypeEnum("waste_type").notNull(),
  wasteCode: text("waste_code"), // e.g., "20 03 01"
  disposalMethod: text("disposal_method"), // recycling, landfill, incineration
  weight: numeric("weight", { precision: 12, scale: 2 }), // kg or ton
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// ---- Emission Factor Tables ----
export const emissionFactor = pgTable("emission_factor", {
  id: uuid("id").defaultRandom().primaryKey(),
  activityTypeId: uuid("activity_type_id")
    .notNull()
    .references(() => activityType.id, { onDelete: "cascade" }),
  fuelType: fuelTypeEnum("fuel_type"),
  transportType: transportTypeEnum("transport_type"),
  vehicleType: vehicleTypeEnum("vehicle_type"),
  gasType: text("gas_type").notNull(), // CO2, CH4, N2O
  value: numeric("value", { precision: 12, scale: 6 }).notNull(),
  unit: text("unit").notNull(), // e.g., kgCO2e/kWh, kgCO2e/ton-km
  source: text("source").notNull(), // IPCC, DEFRA, country-specific
  year: integer("year"),
  region: text("region"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ---- User Input Table ----
export const userInput = pgTable("user_input", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  activityTypeId: uuid("activity_type_id")
    .notNull()
    .references(() => activityType.id, { onDelete: "cascade" }),
  
  // داده‌های اصلی
  amount: numeric('amount', { precision: 15, scale: 4 }).notNull(),
  unit: unitEnum().notNull(),
  fuelType: fuelTypeEnum("fuel_type"),
  
  // داده‌های تخصصی (اختیاری)
  transportDetailsId: uuid("transport_details_id")
    .references(() => transportDetails.id, { onDelete: "set null" }),
  materialDetailsId: uuid("material_details_id")
    .references(() => materialDetails.id, { onDelete: "set null" }),
  wasteDetailsId: uuid("waste_details_id")
    .references(() => wasteDetails.id, { onDelete: "set null" }),
  
  // نتایج محاسباتی
  calculatedEmission: numeric('calculated_emission', { precision: 15, scale: 4 }), // kgCO2e
  emissionFactorUsed: numeric('emission_factor_used', { precision: 12, scale: 6 }),
  
  // متادیتا
  periodStart: timestamp("period_start"),
  periodEnd: timestamp("period_end"),
  note: text('note'),
  dataSource: text("data_source").default("manual"), // manual, csv_import, api
  isVerified: boolean("is_verified").default(false),
  isDeleted: boolean("is_deleted").default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ---- Relations ----
export const scopeRelations = relations(scope, ({ many }) => ({
  categories: many(category),
}));

export const categoryRelations = relations(category, ({ one, many }) => ({
  scope: one(scope, {
    fields: [category.scopeId],
    references: [scope.id],
  }),
  subCategories: many(subCategory),
}));

export const subCategoryRelations = relations(subCategory, ({ one, many }) => ({
  category: one(category, {
    fields: [subCategory.categoryId],
    references: [category.id],
  }),
  activityTypes: many(activityType),
}));

export const activityTypeRelations = relations(activityType, ({ one, many }) => ({
  subCategory: one(subCategory, {
    fields: [activityType.subCategoryId],
    references: [subCategory.id],
  }),
  emissionFactors: many(emissionFactor),
  userInputs: many(userInput),
}));

export const emissionFactorRelations = relations(emissionFactor, ({ one }) => ({
  activityType: one(activityType, {
    fields: [emissionFactor.activityTypeId],
    references: [activityType.id],
  }),
}));

export const userInputRelations = relations(userInput, ({ one }) => ({
  activityType: one(activityType, {
    fields: [userInput.activityTypeId],
    references: [activityType.id],
  }),
  user: one(user, {
    fields: [userInput.userId],
    references: [user.id],
  }),
  transportDetails: one(transportDetails, {
    fields: [userInput.transportDetailsId],
    references: [transportDetails.id],
  }),
  materialDetails: one(materialDetails, {
    fields: [userInput.materialDetailsId],
    references: [materialDetails.id],
  }),
  wasteDetails: one(wasteDetails, {
    fields: [userInput.wasteDetailsId],
    references: [wasteDetails.id],
  }),
}));

export const transportDetailsRelations = relations(transportDetails, ({ one }) => ({
  userInput: one(userInput),
}));

export const materialDetailsRelations = relations(materialDetails, ({ one }) => ({
  userInput: one(userInput),
}));

export const wasteDetailsRelations = relations(wasteDetails, ({ one }) => ({
  userInput: one(userInput),
}));
