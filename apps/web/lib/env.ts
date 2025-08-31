import z from "zod";

export const envSchema = z.object({
  NEXT_PUBLIC_APPWRITE_ENDPOINT: z.string().url(),
  NEXT_PUBLIC_APPWRITE_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_APPWRITE_PROJECT_NAME: z.string().min(1)
});

export const env = envSchema.parse(process.env);
