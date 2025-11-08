import { z } from "zod";

// 🔹 Enum
export const unitEnum = z.enum(["kWh", "Liter", "Ton-kw", "tCO2e"]);

// 🔹 Categories
export const categorySchema = z.object({
  id: z.uuid(),
  title: z.string().min(1),
  description: z.string().nullable().optional(),
});

// 🔹 SubCategories
export const subCategorySchema = z.object({
  id: z.uuid(),
  categoryId: z.uuid(),
  title: z.string().min(1),
  description: z.string().nullable().optional(),
});

// 🔹 Emission Sources
export const emissionSourceSchema = z.object({
  id: z.uuid(),
  subCategoryId: z.uuid(),
  title: z.string().min(1),
});

// 🔹 Emission Source Tags
export const emissionSourceTagSchema = z.object({
  sourceId: z.uuid(),
  tag: z.string().min(1),
});

// 🔹 Activity Types
export const activityTypeSchema = z.object({
  id: z.uuid(),
  sourceId: z.uuid(),
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  unit: unitEnum,
  emissionFactor: z.number().nonnegative().default(0),
  emissionFactorSource: z.string().nullable().optional(),
  emissionFactorYear: z.number().int().nullable().optional(),
});

// 🔹 Emission Inputs
export const emissionInputSchema = z.object({
  id: z.uuid(),
  activityId: z.uuid(),
  userId: z.string(), // اگر در auth-schema uuid باشه، اینجا هم uuid بذار
  inputValue: z.number().default(0),
  inputDate: z.coerce.date().default(() => new Date()),
  notes: z.string().nullable().optional(),
  attachments: z.string().optional(),
  createdAt: z.coerce.date().default(() => new Date()),
  updatedAt: z.coerce.date().default(() => new Date()),
});

// 🔹 Emission Outputs
export const emissionOutputSchema = z.object({
  id: z.uuid(),
  inputId: z.uuid(),
  calculatedEmission: z.number().nullable().optional(),
  calculationMethod: z.string().nullable().optional(),
  verified: z.boolean().default(false),
  createdAt: z.coerce.date().default(() => new Date()),
  updatedAt: z.coerce.date().default(() => new Date()),
});
