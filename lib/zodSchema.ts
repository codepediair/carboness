import { z } from "zod";

// 🔹 Enum
export const unitEnum = z.enum(["kWh", "Liter", "Ton-kw", "tCO2e"]);

// 🔹 Categories
export const categorySchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().nullable().optional(),
});

// 🔹 SubCategories
export const subCategorySchema = z.object({
  id: z.string().uuid(),
  categoryId: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().nullable().optional(),
});

// 🔹 Emission Sources
export const emissionSourceSchema = z.object({
  id: z.string().uuid(),
  subCategoryId: z.string().uuid(),
  title: z.string().min(1),
});

// 🔹 Emission Source Tags
export const emissionSourceTagSchema = z.object({
  sourceId: z.string().uuid(),
  tag: z.string().min(1),
});

// 🔹 Activity Types
export const activityTypeSchema = z.object({
  id: z.string().uuid(),
  sourceId: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  unit: unitEnum,
  emissionFactor: z.number().nonnegative().default(0),
  emissionFactorSource: z.string().nullable().optional(),
  emissionFactorYear: z.number().int().nullable().optional(),
});

// 🔹 Emission Inputs
export const emissionInputSchema = z.object({
  id: z.string().uuid(),
  activityId: z.string().uuid(),
  userId: z.string(), // اگر در auth-schema uuid باشه، اینجا هم uuid بذار
  inputValue: z.number().default(0),
  inputDate: z.coerce.date().default(() => new Date()),
  notes: z.string().nullable().optional(),
  attachments: z.string().default(""),
  createdAt: z.coerce.date().default(() => new Date()),
  updatedAt: z.coerce.date().default(() => new Date()),
});

// 🔹 Emission Outputs
export const emissionOutputSchema = z.object({
  id: z.string().uuid(),
  inputId: z.string().uuid(),
  calculatedEmission: z.number().nullable().optional(),
  calculationMethod: z.string().nullable().optional(),
  verified: z.boolean().default(false),
  createdAt: z.coerce.date().default(() => new Date()),
  updatedAt: z.coerce.date().default(() => new Date()),
});
