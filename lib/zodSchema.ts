import { z } from "zod";

// --- Enums ---
export const unitEnumValues = [
  "m3", "liter", "gallon", "kg", "ton",
  "kWh", "MWh", "km", "ton_km", "person_km",
  "hour", "item"
] as const;

export const scopeEnumValues = ["scope1", "scope2", "scope3"] as const;

export const fuelTypeEnumValues = [
  "natural_gas", "diesel", "gasoline", "coal",
  "biomass", "lpg", "electricity", "other"
] as const;

export const transportTypeEnumValues = [
  "road", "rail", "marine", "air", "pipeline", "combined"
] as const;

export const vehicleTypeEnumValues = [
  "passenger_car", "light_truck", "heavy_truck", "bus",
  "motorcycle", "construction", "agricultural", "forklift",
  "locomotive", "ship", "aircraft"
] as const;

export const wasteTypeEnumValues = [
  "municipal", "packaging", "hazardous", "organic",
  "industrial", "wastewater"
] as const;

// --- Scope ---
export const scopeSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  slug: z.string().min(1).max(100),
  isActive: z.boolean().default(true),
  position: z.number().int().default(0),
});
export type ScopeSchemaType = z.infer<typeof scopeSchema>;

// --- Category ---
export const categorySchema = z.object({
  scopeId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  slug: z.string().min(1).max(100),
  isActive: z.boolean().default(true),
  position: z.number().int().default(0),
});
export type CategorySchemaType = z.infer<typeof categorySchema>;

// --- SubCategory ---
export const subCategorySchema = z.object({
  categoryId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  slug: z.string().min(1).max(100),
  requiresFuelType: z.boolean().default(false),
  requiresTransportDetails: z.boolean().default(false),
  requiresMaterialDetails: z.boolean().default(false),
  isActive: z.boolean().default(true),
  position: z.number().int().default(0),
});
export type SubCategorySchemaType = z.infer<typeof subCategorySchema>;

// --- Activity Type ---
export const activityTypeSchema = z.object({
  subCategoryId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  slug: z.string().min(1).max(100),
  defaultUnit: z.enum(unitEnumValues),
  isActive: z.boolean().default(true),
  position: z.number().int().default(0),
});
export type ActivityTypeSchemaType = z.infer<typeof activityTypeSchema>;

// --- Emission Factor ---
export const emissionFactorSchema = z.object({
  activityTypeId: z.string().uuid(),
  fuelType: z.enum(fuelTypeEnumValues).optional(),
  transportType: z.enum(transportTypeEnumValues).optional(),
  vehicleType: z.enum(vehicleTypeEnumValues).optional(),
  gasType: z.string().min(1).max(50),
  value: z.coerce.number().positive().max(1_000_000),
  unit: z.enum(unitEnumValues), // 🔥 تغییر داده شد
  source: z.string().min(1).max(200),
  year: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
  region: z.string().max(100).optional(),
  isActive: z.boolean().default(true),
});
export type EmissionFactorSchemaType = z.infer<typeof emissionFactorSchema>;

// --- Transport Details ---
export const transportDetailsSchema = z.object({
  transportType: z.enum(transportTypeEnumValues),
  vehicleType: z.enum(vehicleTypeEnumValues).optional(),
  distance: z.number().positive().optional(),
  cargoWeight: z.number().positive().optional(),
  fuelConsumed: z.number().positive().optional(),
  fuelUnit: z.enum(unitEnumValues).optional(),
});
export type TransportDetailsSchemaType = z.infer<typeof transportDetailsSchema>;

// --- Material Details ---
export const materialDetailsSchema = z.object({
  materialName: z.string().min(1).max(100),
  materialType: z.enum(["raw", "semi_finished", "finished", "packaging"]).optional(),
  supplierName: z.string().max(100).optional(),
  recyclingRate: z.number().min(0).max(1).optional(), // 🔥 تغییر به 0–1
  supplierEmissionData: z.boolean().default(false),
});
export type MaterialDetailsSchemaType = z.infer<typeof materialDetailsSchema>;

// --- User Input ---
export const userInputSchema = z.object({
  subCategoryId: z.string().uuid({ message: "Invalid sub-category ID" }),
  amount: z.number().positive(),
  unit: z.enum(unitEnumValues),
  scope: z.enum(scopeEnumValues),
  recycledRatio: z.number().min(0).max(1).nullable().optional(),
  isCertifiedGreen: z.boolean().default(false),
  supplierClaim: z.string().optional(),
  calculatedCO2e: z.number().nullable().optional(),
  note: z.string().optional(),
  dataSource: z.enum(["manual", "csv_import", "api"]).default("manual"),
  isDeleted: z.boolean().default(false),
});

export type UserInputSchemaType = z.infer<typeof userInputSchema>;

// --- Utility Types ---
export type UnitType = typeof unitEnumValues[number];
export type ScopeType = typeof scopeEnumValues[number];
export type FuelType = typeof fuelTypeEnumValues[number];
export type TransportType = typeof transportTypeEnumValues[number];
export type VehicleType = typeof vehicleTypeEnumValues[number];
export type WasteType = typeof wasteTypeEnumValues[number];
