import { z } from 'zod'

const envSchema = z.object({
  DISCORD_WEBHOOK_URL: z.string().url().optional(),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_TO: z.string().email().optional(),
})

export const env = envSchema.parse({
  DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  EMAIL_TO: process.env.EMAIL_TO,
})

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
} 