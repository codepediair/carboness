import { z } from 'zod'

// set as const if it required
export const unitEnum = ["m3", "liter", "galon"];
export const scopeEnum = ["directly", "undirectly", "inChain"]

export const activityDataSchema = z.object({
  title: z.string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" }),
  amount: z.number()
    .min(1, { message: "Amount must be at least 1 characters long" }),
  unit: z.enum(unitEnum),
  scope: z.enum(scopeEnum),
  smallDescription: z.string()
    .min(3, { message: "description must be at least 3 characters long" })
    .max(200, { message: "description must be at most 100 characters long" }),
  slug: z.string()
    .min(3, { message: "slug must be at least 3 characters long" })
})

export type activityDataSchemaType = z.infer<typeof activityDataSchema>