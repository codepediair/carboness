import { z } from "zod";

// --- Enums ---
export const unitEnumValues = ["m3", "liter", "gallon", "kg", "ton", "kWh", "MWh", "km", "ton_km", "person_km", "hour", "item"] as const;
export const scopeEnumValues = ["scope1", "scope2", "scope3"] as const;
export const fuelTypeEnumValues = ["natural_gas", "diesel", "gasoline", "coal", "biomass", "lpg", "electricity", "other"] as const;
export const transportTypeEnumValues = ["road", "rail", "marine", "air", "pipeline", "combined"] as const;
export const vehicleTypeEnumValues = ["passenger_car", "light_truck", "heavy_truck", "bus", "motorcycle", "construction", "agricultural", "forklift", "locomotive", "ship", "aircraft"] as const;
export const wasteTypeEnumValues = ["municipal", "packaging", "hazardous", "organic", "industrial", "wastewater"] as const;

// --- Scope ---
export const scopeSchema = z.object({
  name: z.string().min(1, "Scope name is required").max(100),
  description: z.string().max(500).optional(),
  slug: z.string().min(1, "Slug is required").max(100),
  isActive: z.boolean().default(true),
  position: z.number().int().default(0)
});

export type ScopeSchemaType = z.infer<typeof scopeSchema>;

// --- Category ---
export const categorySchema = z.object({
  scopeId: z.string().uuid("Invalid scope ID"),
  name: z.string().min(1, "Category name is required").max(100),
  description: z.string().max(500).optional(),
  slug: z.string().min(1, "Slug is required").max(100),
  isActive: z.boolean().default(true),
  position: z.number().int().default(0)
});

export type CategorySchemaType = z.infer<typeof categorySchema>;

// --- SubCategory ---
export const subCategorySchema = z.object({
  categoryId: z.string().uuid("Invalid category ID"),
  name: z.string().min(1, "Sub-category name is required").max(100),
  description: z.string().max(500).optional(),
  slug: z.string().min(1, "Slug is required").max(100),
  requiresFuelType: z.boolean().default(false),
  requiresTransportDetails: z.boolean().default(false),
  requiresMaterialDetails: z.boolean().default(false),
  isActive: z.boolean().default(true),
  position: z.number().int().default(0)
});

export type SubCategorySchemaType = z.infer<typeof subCategorySchema>;

// --- Activity Type ---
export const activityTypeSchema = z.object({
  subCategoryId: z.string().uuid("Invalid sub-category ID"),
  name: z.string().min(1, "Activity type name is required").max(100),
  description: z.string().max(500).optional(),
  slug: z.string().min(1, "Slug is required").max(100),
  defaultUnit: z.enum(unitEnumValues),
  isActive: z.boolean().default(true),
  position: z.number().int().default(0)
});

export type ActivityTypeSchemaType = z.infer<typeof activityTypeSchema>;

// --- Emission Factor ---
export const emissionFactorSchema = z.object({
  activityTypeId: z.string().uuid({ message: "Invalid activity type ID" }),
  fuelType: z.enum(fuelTypeEnumValues).optional(),
  transportType: z.enum(transportTypeEnumValues).optional(),
  vehicleType: z.enum(vehicleTypeEnumValues).optional(),
  gasType: z.string()
    .min(1, { message: "Gas type is required" })
    .max(50, { message: "Gas type must be at most 50 characters" }),
  value: z.coerce.number()
    .positive({ message: "Value must be greater than 0" })
    .max(1_000_000, { message: "Value is too large" }),
  unit: z.string()
    .min(1, { message: "Unit is required" })
    .max(50, { message: "Unit must be at most 50 characters" }),
  source: z.string()
    .min(1, { message: "Source is required" })
    .max(200, { message: "Source must be at most 200 characters" }),
  year: z.number()
    .int({ message: "Year must be an integer" })
    .min(1900, { message: "Year must be after 1900" })
    .max(new Date().getFullYear(), { message: "Year cannot be in the future" })
    .optional(),
  region: z.string().max(100).optional(),
  isActive: z.boolean().default(true)
});

export type EmissionFactorSchemaType = z.infer<typeof emissionFactorSchema>;

// --- Transport Details ---
export const transportDetailsSchema = z.object({
  transportType: z.enum(transportTypeEnumValues),
  vehicleType: z.enum(vehicleTypeEnumValues).optional(),
  distance: z.number().positive("Distance must be positive").optional(),
  cargoWeight: z.number().positive("Cargo weight must be positive").optional(),
  fuelConsumed: z.number().positive("Fuel consumed must be positive").optional(),
  fuelUnit: z.enum(unitEnumValues).optional()
});

export type TransportDetailsSchemaType = z.infer<typeof transportDetailsSchema>;

// --- Material Details ---
export const materialDetailsSchema = z.object({
  materialName: z.string().min(1, "Material name is required").max(100),
  materialType: z.enum(["raw", "semi_finished", "finished", "packaging"]).optional(),
  supplierName: z.string().max(100).optional(),
  recyclingRate: z.number().min(0).max(100).optional(),
  supplierEmissionData: z.boolean().default(false)
});

export type MaterialDetailsSchemaType = z.infer<typeof materialDetailsSchema>;

// --- User Input ---
export const userInputSchema = z.object({
  activityTypeId: z.string().uuid({ message: "Invalid activity type ID" }),
  amount: z.number().positive("Amount must be positive"),
  unit: z.enum(unitEnumValues),
  fuelType: z.enum(fuelTypeEnumValues).optional(),
  transportDetails: transportDetailsSchema.optional(),
  materialDetails: materialDetailsSchema.optional(),
  periodStart: z.date().optional(),
  periodEnd: z.date().optional(),
  note: z.string().max(500).optional(),
  dataSource: z.enum(["manual", "csv_import", "api"]).default("manual")
});

export type UserInputSchemaType = z.infer<typeof userInputSchema>;

// --- Utility Types برای استفاده در سراسر پروژه ---
export type UnitType = typeof unitEnumValues[number];
export type ScopeType = typeof scopeEnumValues[number];
export type FuelType = typeof fuelTypeEnumValues[number];
export type TransportType = typeof transportTypeEnumValues[number];
export type VehicleType = typeof vehicleTypeEnumValues[number];
export type WasteType = typeof wasteTypeEnumValues[number];
