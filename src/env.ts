import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  PAYLOAD_SECRET: z.string().min(32),
  NEXT_PUBLIC_SERVER_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_SITE_NAME: z.string().default('Global Starter'),
  BLOB_READ_WRITE_TOKEN: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM_ADDRESS: z.string().email().default('onboarding@resend.dev'),
  EMAIL_FROM_NAME: z.string().default('Global Starter'),
  CONTACT_TO_EMAIL: z.string().email().optional(),
  CRON_SECRET: z.string().optional(),
  PREVIEW_SECRET: z.string().min(16),
})

export const env = envSchema.parse(process.env)
