import { z } from "zod";

// Coerce incoming JSON values (strings) into the expected types so
// server-side validation accepts form-submitted JSON payloads.
export const userInputSchema = z.object({
  userId: z.string().uuid({ message: "Invalid user ID" }),
  activityTypeId: z.string().uuid({ message: "Invalid activity type ID" }),
  // Accept numeric strings and coerce them to numbers
  amount: z.coerce.number().positive("Amount must be positive"),
  // Accept ISO date strings and coerce to Date
  activityDate: z.coerce.date(),
  notes: z.string().optional(),
});

export type UserInputFormValues = z.infer<typeof userInputSchema>;
