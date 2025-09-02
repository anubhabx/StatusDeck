import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(8000),
  DATABASE_URL: z.string().url(),
  APPWRITE_ENDPOINT: z.string().url(),
  APPWRITE_PROJECT_ID: z.string().min(1),
  APPWRITE_API_KEY: z.string().min(1)
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.format());
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
