import { z } from "zod";

export const userInputSchema = z.object({
  userId: z.string().uuid({ message: "Invalid user ID" }),
  activityTypeId: z.string().uuid({ message: "Invalid activity type ID" }),
  amount: z
    .number({ message: "Amount must be a number" })
    .positive("Amount must be positive"),
  activityDate: z.date({ message: "Activity date is required" }),
  notes: z.string().optional(),
});

export type UserInputFormValues = z.infer<typeof userInputSchema>;
