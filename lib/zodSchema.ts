import { z } from "zod";

// --- Enums ---
export const unitEnumValues = ["m3", "liter", "gallon", "kg", "ton"] as const;
export const scopeEnumValues = ["directly", "indirectly", "inChain"] as const;

// --- Category ---
export const categorySchema = z.object({
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
  isActive: z.boolean().default(true),
  position: z.number().int().default(0)
});

export type SubCategorySchemaType = z.infer<typeof subCategorySchema>;

// --- Emission Factor ---
export const emissionFactorSchema = z.object({
  subCategoryId: z.string().uuid({ message: "Invalid sub-category ID" }),

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
    .max(200, { message: "Source must be at most 200 characters" })
    .optional(),

  year: z.number()
    .int({ message: "Year must be an integer" })
    .min(1900, { message: "Year must be after 1900" })
    .max(new Date().getFullYear(), { message: "Year cannot be in the future" })
    .optional(),
});

export type EmissionFactorSchemaType = z.infer<typeof emissionFactorSchema>;


// --- User Input ---
export const userInputSchema = z.object({
  subCategoryId: z.string().uuid({ message: "Invalid sub-category ID" }),
  amount: z.number(),
  unit: z.enum(unitEnumValues, { message: "Invalid unit" }),
  scope: z.enum(scopeEnumValues, { message: "Invalid scope" }),
  note: z.string().max(500, { message: "Note must be at most 500 characters" }).optional(),
  source: z.string().max(100),
  isDeleted: z.boolean()
});
export type UserInputSchemaType = z.infer<typeof userInputSchema>;
