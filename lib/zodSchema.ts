import { z } from "zod";

// --- Enums ---
export const unitEnum = ["m3", "liter", "gallon", "kg", "ton"] as const;
export const scopeEnum = ["directly", "indirectly", "inChain"] as const;

// --- Category ---
export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
});

export type CategorySchemaType = z.infer<typeof categorySchema>;

// --- SubCategory ---
export const subCategorySchema = z.object({
  categoryId: z.string().uuid("Invalid category ID"),
  name: z.string().min(1, "Sub-category name is required"),
  description: z.string().optional(),
});

export type SubCategorySchemaType = z.infer<typeof subCategorySchema>;

// --- Emission Factor ---
export const emissionFactorSchema = z.object({
  subCategoryId: z.string().uuid("Invalid sub-category ID"),
  gasType: z.string().min(1, "Gas type is required"), // e.g., CO2, CH4, N2O
  value: z.coerce.number().positive("Value must be greater than 0"),
  unit: z.string().min(1, "Unit is required"),
  source: z.string().optional(),
  year: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
});

export type EmissionFactorSchemaType = z.infer<typeof emissionFactorSchema>;

// --- User Input ---
export const userInputSchema = z.object({
  subCategoryId: z.string().uuid("Invalid sub-category ID"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  unit: z.enum(unitEnum, { message: "Invalid unit" }),
  scope: z.enum(scopeEnum, { message: "Invalid scope" }),
  date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  note: z.string().max(500, "Note must be at most 500 characters").optional(),
});

export type UserInputSchemaType = z.infer<typeof userInputSchema>;

// --- Calculation ---
export const calculationSchema = z.object({
  inputId: z.string().uuid("Invalid input ID"),
  emissionFactorId: z.string().uuid("Invalid emission factor ID"),
  co2e: z.coerce.number().nonnegative("CO2e must be >= 0"),
  calculationDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

export type CalculationSchemaType = z.infer<typeof calculationSchema>;

// --- Report ---
export const reportSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  title: z.string().min(1, "Report title is required"),
  generatedDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  filePath: z.string().optional(),
});

export type ReportSchemaType = z.infer<typeof reportSchema>;
