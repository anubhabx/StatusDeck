import { z } from "zod";

export const envConfig = {
  NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  NEXT_PUBLIC_APPWRITE_PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
};

const envSchema = z.object({
  NEXT_PUBLIC_APPWRITE_ENDPOINT: z.string().url(),
  NEXT_PUBLIC_APPWRITE_PROJECT_ID: z.string().min(1),
});

export const env = envSchema.parse(envConfig);
