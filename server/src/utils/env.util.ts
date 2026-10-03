import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().max(65_555),
  DB_URL: z.string().min(1)
});

export const env = envSchema.parse({
  PORT: process.env.PORT,
  DB_URL: process.env.DIRECT_URL
});
