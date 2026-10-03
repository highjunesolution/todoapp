import { z } from "zod"

export const todoBodySchema = z.object({
  title: z
    .string()
    .min(2, "Title is required")
    .max(50, "Title cannot be more than 50 charectors"),
  description: z
    .string()
    .max(100, "Description cannot be more than 100 charectors")
    .optional()
    .nullable(),
  isCompleted: z.boolean().optional(),
});