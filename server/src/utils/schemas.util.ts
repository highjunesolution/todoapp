import { z } from "zod";

export const todoParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const todoBodySchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title cannot be more than 50 charectors"),
  description: z
    .string()
    .max(100, "Description cannot be more than 100 charectors")
    .optional()
    .nullable(),
  isCompleted: z.boolean().optional(),
});
export type TodoBodyInput = z.infer<typeof todoBodySchema>;

export const todoBodyUpdateSchema = todoBodySchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required"
  });
export type TodoBodyUpdateInput = z.infer<typeof todoBodyUpdateSchema>;
