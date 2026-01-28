import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const schema = z.object({
  PORT: z.string().default("3000"),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
});

export const config = schema.parse(process.env);