import { z } from 'zod'

const optionalString = z.preprocess((value) => (value === '' ? undefined : value), z.string().optional())
const optionalSecret = z.preprocess(
  (value) => (value === '' ? undefined : value),
  z.string().min(32).optional(),
)

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().url().refine((url) => url.startsWith('postgres://') || url.startsWith('postgresql://'), {
    message: 'DATABASE_URL must use the postgres:// or postgresql:// protocol',
  }),
  PAYLOAD_SECRET: z.string().min(32),
  NEXT_PUBLIC_SERVER_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_SITE_NAME: z.string().default('Global Starter'),
  BLOB_READ_WRITE_TOKEN: optionalString,
  RESEND_API_KEY: optionalString,
  EMAIL_FROM_ADDRESS: z.string().email().default('onboarding@resend.dev'),
  EMAIL_FROM_NAME: z.string().default('Global Starter'),
  CONTACT_TO_EMAIL: z.preprocess((value) => (value === '' ? undefined : value), z.string().email().optional()),
  CRON_SECRET: optionalSecret,
  PREVIEW_SECRET: z.string().min(32),
}).superRefine((values, context) => {
  if (values.NODE_ENV === 'production' && !values.NEXT_PUBLIC_SERVER_URL.startsWith('https://')) {
    context.addIssue({
      code: 'custom',
      path: ['NEXT_PUBLIC_SERVER_URL'],
      message: 'NEXT_PUBLIC_SERVER_URL must use HTTPS in production',
    })
  }
})

export const env = envSchema.parse(process.env)
